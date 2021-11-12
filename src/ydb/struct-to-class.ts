import 'reflect-metadata';
import { Ydb, TypedData, typeMetadataKey } from 'ydb-sdk';
import { ConvertStructToTypes, TableDefinition } from '../types/utils-types';
import { databaseName } from './ydb-functions';

export const TMDB_TABLE = 'tmdb'; // имя таблицы
const Pt = Ydb.Type.PrimitiveTypeId;

const tdef = {
  id: { val: 0, pt: Pt.UINT64, opt: 'r' },
  title: { val: 'title', pt: Pt.UTF8, opt: 0 },
  genre_ids: { val: 'json', pt: Pt.JSON, opt: 0 },
  release_date: { val: new Date(), pt: Pt.DATE, opt: 0 },
  popularity: { val: 0, pt: Pt.UINT32, opt: 0 },
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
  }

  constructor(data: ITdef) {
    super(data);
    this.generateMetadata(tdef as TableDefinition);
  }
}

Tdef.initClassOnce();
