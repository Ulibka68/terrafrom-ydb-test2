// @ts-nocheck1

import { declareType, TypedData, Ydb } from 'ydb-sdk';

// const Type = Ydb.Type;
const TypePrim = Ydb.Type.PrimitiveTypeId;
export const TMDB_TABLE = 'tmdb'; // имя таблицы

type NonFunctionKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends Function ? never : K;
}[keyof T];

type ITableFromClass<T extends object> = { [K in NonFunctionKeys<T>]: T[K] };

export class Tmdb extends TypedData {
  @declareType({ typeId: TypePrim.UINT64 })
  // @ts-ignore
  public id: number;
  @declareType({ typeId: TypePrim.UTF8 })
  public title?: string;
  @declareType({ typeId: TypePrim.JSON })
  public genre_ids?: string;
  @declareType({ typeId: TypePrim.DATE })
  public release_date?: Date;

  constructor(data: Record<string, any>) {
    super(data);
  }

  static create(
    id: number,
    title?: string,
    genre_ids?: string,
    release_date?: Date
  ): Tmdb {
    return new this({
      id,
      title,
      genre_ids,
      release_date,
    });
  }
}
