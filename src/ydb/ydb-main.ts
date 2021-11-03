import { config } from 'dotenv';
config({ path: 'env.local' });

import { createTables, SERIES_TABLE, Series } from './table_defs';

console.log(process.env.YDB_SERVICE_ACCOUNT_KEY_FILE_CREDENTIALS);
console.log('====================');

import {
  Column,
  getLogger,
  Driver,
  getCredentialsFromEnv,
  Logger,
  Session,
  TableDescription,
  withRetries,
  Ydb

} from 'ydb-sdk';

import terraform_output from "../../deploy/terraform.json"


const logger = getLogger({ level: 'debug' });
const entryPoint = 'grpcs://ydb.serverless.yandexcloud.net:2135';
// const dbName = '/ru-central1/b1gib03pgvqrrfvhl3kb/etnnr4j3s2malltd5a4t';
const dbName = terraform_output.outputs.ydb_database_path.value;

async function describeTable(
  session: Session,
  tableName: string,
  logger: Logger
) {
  logger.info(`Describing table: ${tableName}`);
  const result = await session.describeTable(tableName);
  for (const column of result.columns) {
    logger.info(
      `Column name '${column.name}' has type ${JSON.stringify(column.type)}`
    );
  }
}

export const SYNTAX_V1 = '--!syntax_v1';

/*
PRAGMA

AutoCommit	Автоматически выполнять COMMIT после каждого запроса.

TablePathPrefix
    Добавить указанный префикс к путям таблиц внутри кластеров.
    Работает по принципу объединения путей в файловой системе: поддерживает ссылки на родительский каталог .. и не требует добавления / справа.

    Пример
    PRAGMA TablePathPrefix = "home/yql"; SELECT * FROM test;

    Префикс не добавляется, если имя таблицы указано как абсолютный путь (начинается с /).
*/
async function fillTablesWithData(
  tablePathPrefix: string,
  session: Session,
  logger: Logger
) {
  const query = `
${SYNTAX_V1}
PRAGMA TablePathPrefix("${tablePathPrefix}");

DECLARE $series_id AS Uint64;
DECLARE $title AS Utf8;

INSERT INTO ${SERIES_TABLE} (series_id,title)
VALUES ($series_id,$title)`;

  const series = new Series({ seriesId: 1, title: 'Серия 1' });

  async function fillTable() {
    logger.info('Inserting data to tables, preparing query...');
    const preparedQuery = await session.prepareQuery(query);
    logger.info('Query has been prepared, executing...');
    await session.executeQuery(preparedQuery, {
      $series_id: series.getTypedValue('seriesId'),
      $title: series.getTypedValue('title'),
    });
  }
  await withRetries(fillTable);
  series.seriesId = 2;
  series.title = 'Серия 2';
  await withRetries(fillTable);
}

async function fillTablesWithData2(
  tablePathPrefix: string,
  session: Session,
  logger: Logger
) {
  const query = `
${SYNTAX_V1}
PRAGMA TablePathPrefix("${tablePathPrefix}");

DECLARE $series_id AS Uint64;
DECLARE $title AS Utf8;

REPLACE INTO ${SERIES_TABLE} (series_id,title)
VALUES ($series_id,$title)`;

  const series = new Series({ seriesId: 20, title: 'Серия 20' });

  async function fillTable() {
    logger.info('Inserting data to tables, preparing query...');
    const preparedQuery = await session.prepareQuery(query);
    logger.info('Query has been prepared, executing...');
    console.log(
      "series.getTypedValue('seriesId'),",
      series.getTypedValue('seriesId')
    );
    console.log("series.getTypedValue('title')", series.getTypedValue('title'));
    await session.executeQuery(preparedQuery, {
      $series_id: series.getTypedValue('seriesId'),
      $title: series.getTypedValue('title'),
    });
  }
  await withRetries(fillTable);
  series.seriesId = 30;
  series.title = 'Серия 30';
  await withRetries(fillTable);
}

async function run() {
  const authService = getCredentialsFromEnv(entryPoint, dbName, logger);
  const driver = new Driver(entryPoint, dbName, authService);

  if (!(await driver.ready(10000))) {
    logger.fatal(`Driver has not become ready in 10 seconds!`);
    process.exit(1);
  }
  console.log('driver ready');
  // return;

  await driver.tableClient.withSession(async (session) => {
    // выполняем запросы в конкретной сессии
    console.log('=== createTables START');
    await createTables(session, logger);
    console.log('=== createTables END');
    console.log('+=+=+=+= describeTable START');
    await describeTable(session, 'series', logger);
    console.log('+=+=+=+= describeTable END');
    console.log('->->->-> fillTablesWithData START');
    await fillTablesWithData(dbName, session, logger);
    console.log('->->->-> fillTablesWithData END');
    await fillTablesWithData2(dbName, session, logger);

  });

  await driver.destroy();
}

run();
