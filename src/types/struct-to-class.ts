// test
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace struct0 {
  enum PrimitiveTypeId {
    UINT64 = 4,
    UTF8 = 4608,
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
  type C2_nou = { [K in keyof C2]: Exclude<C2[K], undefined> };

  type RemoveIntersection<T> = { [K in keyof T]: T[K] };
  type C3 = RemoveIntersection<C1 & C2>;
}
