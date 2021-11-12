// eslint-disable-next-line @typescript-eslint/no-namespace
namespace mike1 {
  type OptionalType = 'OptionalType';
  type RequiredType = 'RequiredType';

  type FldArray = {
    id: [number, OptionalType];
    title: [string, RequiredType];
  };

  type Base = OptionalType | RequiredType;
  type DropNever<T> = Omit<
    T,
    { [K in keyof T]: T[K] extends never ? K : never }[keyof T]
  >;
  type ConvertBase<T, V extends Base> = DropNever<{
    [K in keyof T]: T[K] extends [infer R1, V] ? R1 : never;
  }>;

  type RequiredPart<T> = ConvertBase<T, RequiredType>;
  type PartialPart<T> = Partial<ConvertBase<T, OptionalType>>;
  type IntellisenceFix<T> = { [K in keyof T]: T[K] };

  type Convert<T> = PartialPart<T> & RequiredPart<T>;
  type Test = IntellisenceFix<Convert<FldArray>>;
  const test1: Test = { title: '123' };
  const test2: Test = { title: '123', id: 5 };

  // error
  // const test3: Test = { title: 123 };
}
