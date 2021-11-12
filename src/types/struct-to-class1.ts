// eslint-disable-next-line @typescript-eslint/no-namespace
namespace struct_class {
  enum PrimitiveTypeId {
    UINT64 = 4,
    UTF8 = 4608,
  }

  const tdef = {
    id: { val: 0, pt: PrimitiveTypeId.UINT64, opt: 'r' },
    title: { val: 'aa' as string, pt: PrimitiveTypeId.UTF8, opt: 0 },
  };

  type FldDef = { val: any; pt: PrimitiveTypeId; opt: string | number };

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

  type RequiredFields<B extends Record<string, FldDef>> = RemoveNever<{
    [K in keyof B]: B[K]['opt'] extends string ? B[K]['val'] : never;
  }>;
  // test
  type C11_t = RequiredFields<typeof tdef>;

  type OptionalFields<B extends Record<string, FldDef>> = OptionalUndefined<{
    [K in keyof B]: B[K]['opt'] extends number ? B[K]['val'] : never;
  }>;
  // test
  type C22_t = OptionalFields<typeof tdef>;

  type RemoveIntersection<T> = { [K in keyof T]: T[K] };
  type ConvertStructToTypes<T extends Record<string, FldDef>> =
    RemoveIntersection<RequiredFields<T> & OptionalFields<T>>;

  // test
  type TdefInterface = ConvertStructToTypes<typeof tdef>;
}
