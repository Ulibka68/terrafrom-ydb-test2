// @ts-nocheck1

import { type } from 'os';
import { declareType, TypedData, Ydb } from 'ydb-sdk';

// const Type = Ydb.Type;
const TypePrim = Ydb.Type.PrimitiveTypeId;
export const TMDB_TABLE = 'tmdb'; // имя таблицы

type NonFunctionKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends Function ? never : K;
}[keyof T];

type ITableFromClass<T extends object> = { [K in NonFunctionKeys<T>]: T[K] };
type ITMdb = ITableFromClass<Tmdb>;

export function declareTypePrim(typePrim: Ydb.Type.PrimitiveTypeId) {
  const type: Ydb.IType = { typeId: typePrim };
  return declareType(type);
}
export function declareTypeNull(typePrim: Ydb.Type.PrimitiveTypeId) {
  const type: Ydb.IType = { optionalType: { item: { typeId: typePrim } } };
  return declareType(type);
}

export class Tmdb extends TypedData {
  // @declareType({ typeId: TypePrim.UINT64 })
  @declareTypePrim(TypePrim.UINT64)
  // @ts-ignore
  public id: number;

  // @declareType({ typeId: TypePrim.UTF8 })
  // @declareType({ optionalType: { item: { typeId: TypePrim.UTF8 } } })
  @declareTypeNull(TypePrim.UTF8)
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

  static create1(a: ITMdb) {
    return new Tmdb(a);
  }

  /* getTypedValue(propertyKey: string): Ydb.ITypedValue {
    if (!this[propertyKey]) return { type: null, value: null };
    else
      return {
        type: this.getType(propertyKey),
        value: this.getValue(propertyKey),
      };
  }*/
}
