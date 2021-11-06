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
  @declareTypePrim(TypePrim.UINT64)
  // @ts-ignore
  public id: number;

  @declareTypeNull(TypePrim.UTF8)
  public title?: string;

  @declareTypeNull(TypePrim.JSON)
  public genre_ids?: string;
  @declareTypeNull(TypePrim.DATE)
  public release_date?: Date;

  @declareTypeNull(TypePrim.BOOL)
  public adult?: Boolean;
  @declareTypeNull(TypePrim.UTF8)
  public backdrop_path?: string;
  @declareTypeNull(TypePrim.UTF8)
  public original_language?: string;
  @declareTypeNull(TypePrim.UTF8)
  public original_title?: string;
  @declareTypeNull(TypePrim.UTF8)
  public overview?: string;
  @declareTypeNull(TypePrim.FLOAT)
  public popularity?: number;
  @declareTypeNull(TypePrim.UTF8)
  public poster_path?: string;
  @declareTypeNull(TypePrim.BOOL)
  public video?: Boolean;
  @declareTypeNull(TypePrim.FLOAT)
  public vote_average?: number;
  @declareTypeNull(TypePrim.UINT32)
  public vote_count?: number;

  constructor(data: Record<string, any>) {
    super(data);
  }

  static create(inp: ITMdb) {
    return new Tmdb(inp);
  }
}
