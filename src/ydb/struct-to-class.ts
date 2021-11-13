import 'reflect-metadata';
import {
  Ydb,
  TypedData,
  typeMetadataKey,
  primitiveTypeIdToName,
} from 'ydb-sdk';
import { ConvertStructToTypes, TableDefinition } from '../types/utils-types';
import { databaseName } from './ydb-functions';

export const TMDB_TABLE = 'tmdb'; // имя таблицы
const Pt = Ydb.Type.PrimitiveTypeId;

const tdef = {
  id: { val: 0, pt: Pt.UINT64, opt: 'r', pk: true },
  title: { val: 'title', pt: Pt.UTF8, opt: 0 },
  genre_ids: { val: 'json', pt: Pt.JSON, opt: 0 },
  release_date: { val: new Date(), pt: Pt.DATE, opt: 0 },
  adult: { val: false, pt: Pt.BOOL, opt: 0 },
  backdrop_path: { val: 'bp', pt: Pt.UTF8, opt: 0 },
  original_language: { val: 'en', pt: Pt.UTF8, opt: 0 },
  original_title: { val: 'Free Guy', pt: Pt.UTF8, opt: 0 },
  overview: {
    val: 'У сотрудника крупного банка всё идёт по накатанной',
    pt: Pt.UTF8,
    opt: 0,
  },
  popularity: { val: 1, pt: Pt.FLOAT, opt: 0 },
  poster_path: { val: '/qJZ3UeKA', pt: Pt.UTF8, opt: 0 },
  video: { val: false, pt: Pt.BOOL, opt: 0 },
  vote_average: { val: 1, pt: Pt.FLOAT, opt: 0 },
  vote_count: { val: 1, pt: Pt.UINT32, opt: 0 },
};

export type ITdef = ConvertStructToTypes<typeof tdef>;

export class Tdef extends TypedData {
  generateMetadata(tableDef: TableDefinition) {
    Reflect.ownKeys(tableDef).forEach((key) => {
      let metadataValue: any = {};
      key = key as string;

      if (tableDef[key].opt === 'r') {
        metadataValue = { typeId: tableDef[key].pt };
      } else
        metadataValue = {
          optionalType: { item: { typeId: tableDef[key].pt } },
        };

      Reflect.defineMetadata(typeMetadataKey, metadataValue, this, key);
    });
  }

  static generateInitialData(tableDef: TableDefinition) {
    const resultObj: any = {};
    Reflect.ownKeys(tableDef).forEach((key) => {
      key = key as string;
      resultObj[key] = tableDef[key].val;
    });
    return resultObj;
  }

  static initClassOnce() {
    const rec = new Tdef(Tdef.generateInitialData(tdef as TableDefinition));
    rec.generateYQLUpsert(TMDB_TABLE, databaseName);
    console.log(Tdef.generateYQLcreateTable(TMDB_TABLE, databaseName, tdef));
  }

  constructor(data: ITdef) {
    super(data);
    this.generateMetadata(tdef as TableDefinition);
  }

  static generateYQLcreateTable(
    tableName: string,
    databaseName: string,
    tableDef: TableDefinition
  ) {
    let rst = `PRAGMA TablePathPrefix("${databaseName}");\n`;
    let rst_primary = `\n    PRIMARY KEY (`;
    let first_primary = true;

    const typeKeys = primitiveTypeIdToName;

    const tpo = TypedData.fieldsDescriptions;

    rst += `CREATE TABLE ${tableName} (`;
    Reflect.ownKeys(tableDef).forEach((key) => {
      key = key as string;
      rst += `\n    ${key} ${primitiveTypeIdToName[tableDef[key].pt]},`;
      if (tableDef[key].pk) {
        if (!first_primary) {
          rst_primary += ',';
        }
        first_primary = false;
        rst_primary += key;
      }
    });
    rst_primary += ')';
    rst += rst_primary + '\n)';
    return rst;
  } // generateYQLcreateTable
}

Tdef.initClassOnce();
