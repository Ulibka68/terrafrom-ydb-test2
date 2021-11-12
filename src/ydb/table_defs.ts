// @ts-nocheck1

import 'reflect-metadata';
import {
  declareType,
  declareTypePrim,
  declareTypeNull,
  TypedData,
  Ydb,
  ITableFromClass,
  typeMetadataKey,
} from 'ydb-sdk';
import { databaseName } from './ydb-functions';

const TypePrim = Ydb.Type.PrimitiveTypeId;
export const TMDB_TABLE = 'tmdb'; // имя таблицы

type ITMdb = ITableFromClass<Tmdb>;

export class Tmdb extends TypedData {
  // @declareTypePrim(TypePrim.UINT64)
  // @ts-ignore
  public id: number;

  // @declareTypeNull(TypePrim.UTF8)
  public title?: string;

  @declareTypeNull(TypePrim.JSON)
  public genre_ids?: string;

  @declareTypeNull(TypePrim.DATE)
  public release_date?: Date;

  constructor(data: Record<string, any>) {
    super(data);

    /*Reflect.ownKeys(data).forEach((key) => {
      this[key as string] = data[key as string];
    });
*/
    console.log(this.title);
  }

  static create(inp: ITMdb) {
    return new Tmdb(inp);
  }
}

(function initTmdb() {
  const tmp = Tmdb.create({ id: 0, title: 'title' });
  Reflect.defineMetadata(
    typeMetadataKey,
    { typeId: TypePrim.UINT64 },
    tmp,
    'id'
  );
  Reflect.defineMetadata(
    typeMetadataKey,
    { optionalType: { item: { typeId: TypePrim.UTF8 } } },
    tmp,
    'title'
  );

  tmp.generateYQLUpsert(TMDB_TABLE, databaseName);
  const type = tmp.getType('title');
  console.log(type); // { optionalType: { item: { typeId: 4608 } } }

  // console.log(Tmdb.YQLUpsert);
})();
