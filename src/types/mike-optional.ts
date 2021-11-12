type OptionalType = 'OptionalType';
type RequiredType = 'RequiredType';

type FldArray22 = {
  id: [number, OptionalType];
  title: [string, RequiredType];
};

// задача: по типу FldArray получить тип:
// type OutType = {id? : number; title : string}

type Convert<T> = {
  [K in keyof T]: T[K] extends [infer R1, OptionalType]
    ? R1 | undefined
    : T[K] extends [infer R2, RequiredType]
    ? R2
    : never;
};

type UndefinedProperties<T> = {
  [P in keyof T]: undefined extends T[P] ? P : never;
}[keyof T];
type OptionalPart<T> = Partial<Pick<T, UndefinedProperties<T>>>;
type RequiredPart<T> = Pick<T, Exclude<keyof T, UndefinedProperties<T>>>;
type ConvertToPartial<T> = OptionalPart<T> & RequiredPart<T>;
type IntellisenceFix<T> = { [K in keyof T]: T[K] };

type Test = IntellisenceFix<ConvertToPartial<Convert<FldArray22>>>;

/*
результат:

type Test = {
  id?: number | undefined;
  title: string;
}

 */
