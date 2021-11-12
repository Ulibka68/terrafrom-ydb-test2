import 'reflect-metadata';
import { Ydb, TypedData, typeMetadataKey } from 'ydb-sdk';
import {
  ConvertStructToTypes,
  TableDefinition,
  FieldsDefinition,
} from './utils-types';
import { databaseName } from '../ydb/config';

const Pt = Ydb.Type.PrimitiveTypeId;

const tdef = {
  id: { val: 0, pt: Pt.UINT64, opt: 'r' },
  title: { val: 'title', pt: Pt.UTF8, opt: 0 },
  genre_ids: { val: 'json', pt: Pt.JSON, opt: 0 },
  release_date: { val: new Date(), pt: Pt.DATE, opt: 0 },
};
// type TdefKeys = keyof typeof tdef;

type ITdef = ConvertStructToTypes<typeof tdef>;

class Tdef extends TypedData {
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

  constructor(data: ITdef) {
    super(data);
    this.generateMetadata(tdef as TableDefinition);
  }
}

// const rec = new Tdef({ id: 25 });
const rec = new Tdef(Tdef.generateInitialData(tdef as TableDefinition));
// console.log('struct-to-class2');
// console.log(rec);
// console.log(rec.getType('title'));

rec.generateYQLUpsert('TMDB_TABLE', databaseName);
// console.log(Tdef.YQLUpsert);
