import { config } from 'dotenv';
config({ path: 'env.local' });

// import { Driver, Logger, Session, Ydb } from 'ydb-sdk';
import { Session } from 'ydb-sdk';
import {
  driver,
  initYDBdriver,
  describeTable,
  logger,
} from './ydb/ydb-functions';
import { fillTmdbWithData } from './ydb/fill_tmdb_with_data';
import { fillFromStruct } from './ydb/fill_struct_data';

(async function run() {
  await initYDBdriver(); // если не удалось инициализация - то внутри идет process.exit

  await driver.tableClient.withSession(async (session) => {
    // проверим прошла ли инициализация драйвера
    /*  console.log('+=+=+=+= describeTable START');
    await describeTable(session, 'series', logger);
    console.log('+=+=+=+= describeTable END');

    console.log('->->->-> fillTablesWithData START');
    await fillTmdbWithData(session, logger);
    console.log('->->->-> fillTablesWithData END');*/

    console.log('->->->-> fillFromStruct START');
    await fillFromStruct(session, logger);
    console.log('->->->-> fillFromStruct END');
  });

  await driver.destroy();
})();

// const text = await run();
