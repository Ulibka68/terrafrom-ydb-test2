import { Ydb } from 'ydb-sdk';

export type NonNeverKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends never ? never : K;
}[keyof T];

// тест
// type T1 = {
//   a: number;
//   b: never;
//   c: string;
// };
// type O2 = NonNeverKeys<T1>;
// выход
// type O2_r = 'a' | 'c';

export type NonUndefinedKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends undefined ? never : K;
}[keyof T];

export type RemoveNever<T extends object> = { [K in NonNeverKeys<T>]: T[K] };

// тест
// type O3 = RemoveNever<T1>;
// выход
// type O3_r = {
//   a: number;
//   c: string;
// };

export type OptionalUndefined<T extends object> = {
  [K in NonUndefinedKeys<T>]+?: T[K];
};

export type RemoveIntersection<T> = { [K in keyof T]: T[K] };

type RequiredFields<B extends Record<string, FieldsDefinition>> = RemoveNever<{
  [K in keyof B]: B[K]['opt'] extends string ? B[K]['val'] : never;
}>;

type OptionalFields<B extends Record<string, FieldsDefinition>> =
  OptionalUndefined<{
    [K in keyof B]: B[K]['opt'] extends number ? B[K]['val'] : never;
  }>;

export interface FieldsDefinition {
  val: any;
  pt: Ydb.Type.PrimitiveTypeId;
  opt: string | number;
}

export type TableDefinition = Record<string, FieldsDefinition>;

/*
  На вход получает тип , образуемый из объекта JS

  const tdef = {
    id: { val: 0, pt: Pt.UINT64, opt: 'r' },
    title: { val: 'title', pt: Pt.UTF8, opt: 0 },
    genre_ids: { val: 'json', pt: Pt.JSON, opt: 0 },
    release_date: { val: new Date(), pt: Pt.DATE, opt: 0 },
  };

  type ITdef = ConvertStructToTypes<typeof tdef>;

  На выходе получаем :
  {
    id : number;
    title? : string; // опциональный параметр
    genre_ids? : string;
    release_date? : Date;
  }

  Новые записи можно создавать передавая только обязательные параметры
  const rec = new Tdef({ id: 25 });

 */
export type ConvertStructToTypes<T extends Record<string, FieldsDefinition>> =
  RemoveIntersection<RequiredFields<T> & OptionalFields<T>>;
