import { config } from 'dotenv';
config({ path: 'env.local' });

import {
  driver,
  initYDBdriver,
  describeTable,
  logger,
  databaseName,
} from './ydb/ydb-functions';

import { Episodes, Season } from './ydb/table-definitions';
import { getEpisodesData, getSeasonsData } from './ydb/table-data';

/*console.log('+++++++++++++++++++ YQLCreateTable');
console.log(Episodes.refMetaData.YQLCreateTable);
// console.log('+++++++++++++++++++');
// console.log(Episodes.refMetaData.fieldsDescriptions);
console.log('+++++++++++++++++++ YQLUpsert');
console.log(Episodes.refMetaData.YQLUpsert);
console.log('+++++++++++++++++++ YQLUpsertSeries');
console.log(Episodes.refMetaData.YQLUpsertSeries);
console.log('+++++++++++++++++++');*/

(async function run() {
  await initYDBdriver(); // если не удалось инициализация - то внутри идет process.exit

  await driver.tableClient.withSession(async (session) => {
    await Episodes.dropDBTable(session, logger);
    await Episodes.createDBTable(session, logger);
    await Episodes.replaceSeriesToDB(session, logger, getEpisodesData());
  });

  await driver.tableClient.withSession(async (session) => {
    await Season.dropDBTable(session, logger);
    await Season.createDBTable(session, logger);
    await Season.replaceSeriesToDB(session, logger, getSeasonsData());
  });

  await driver.destroy();
})();

// const text = await run();
