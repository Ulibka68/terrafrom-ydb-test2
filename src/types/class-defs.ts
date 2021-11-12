import {
  declareType,
  declareTypePrim,
  declareTypeNull,
  TypedData,
  Ydb,
  ITableFromClass,
} from 'ydb-sdk';

const TypePrim = Ydb.Type.PrimitiveTypeId;

class Cl1 {
  @declareTypePrim(TypePrim.UINT64)
  // @ts-ignore
  public id: number;

  @declareTypeNull(TypePrim.UTF8)
  public title?: string;

  @declareTypeNull(TypePrim.JSON)
  public genre_ids?: string;
}

enum PrimitiveTypeId {
  PRIMITIVE_TYPE_ID_UNSPECIFIED = 0,
  BOOL = 6,
  INT8 = 7,
  UINT8 = 5,
  INT16 = 8,
  UINT16 = 9,
  INT32 = 1,
  UINT32 = 2,
  INT64 = 3,
  UINT64 = 4,
  FLOAT = 33,
  DOUBLE = 32,
  DATE = 48,
  DATETIME = 49,
  TIMESTAMP = 50,
  INTERVAL = 51,
  TZ_DATE = 52,
  TZ_DATETIME = 53,
  TZ_TIMESTAMP = 54,
  STRING = 4097,
  UTF8 = 4608,
  YSON = 4609,
  JSON = 4610,
  UUID = 4611,
  JSON_DOCUMENT = 4612,
  DYNUMBER = 4866,
}

type FldDef = { val: any; pt: PrimitiveTypeId; opt?: boolean };

enum OptionalField {
  'required',
  'optional',
}

const tdef = {
  id: { val: 0, pt: PrimitiveTypeId.UINT64, opt: 'r' },
  title: { val: 'aa' as string, pt: PrimitiveTypeId.UTF8, opt: 0 },
};

type B = typeof tdef;
type A = keyof typeof tdef;

type B1 = B['title']['opt'];
type B2 = B['id']['opt'];

type C = { [K in A]: B[K]['val'] };

type NonNeverKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends never ? never : K;
}[keyof T];

type NonUndefinedKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends undefined ? never : K;
}[keyof T];

type RemoveNever<T extends object> = { [K in NonNeverKeys<T>]: T[K] };
type OptionalUndefined<T extends object> = {
  [K in NonUndefinedKeys<T>]+?: T[K];
};

type C1 = RemoveNever<{
  [K in A]: B[K]['opt'] extends string ? B[K]['val'] : never;
}>;
type C2 = OptionalUndefined<{
  [K in A]: B[K]['opt'] extends number ? B[K]['val'] : never;
}>;

type RemoveIntersection<T> = { [K in keyof T]: T[K] };
type C3 = RemoveIntersection<C1 & C2>;

interface Todo {
  title?: string | undefined;
  description: string;
  completed: boolean;
  createdAt: number;
}

type C2_nou = { [K in keyof Todo]: Exclude<Todo[K], undefined> };

type TypeToExclude = 'TypeToExclude';
type Exclude2<T, U> = T extends U ? TypeToExclude : T;
type T01 = Exclude2<string | undefined, undefined>;
type T02 = Exclude2<string | 'a', 'a'>;
