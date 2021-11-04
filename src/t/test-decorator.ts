import { declareType, TypedData, Ydb } from 'ydb-sdk';
import _ from 'lodash';
import Type = Ydb.Type;

const identityConversion: NamesConversion = {
  jsToYdb: _.identity,
  ydbToJs: _.identity,
};

type StringFunction = (name?: string) => string;

export interface NamesConversion {
  ydbToJs: StringFunction;
  jsToYdb: StringFunction;
}
export interface TypedDataOptions {
  namesConversion?: NamesConversion;
}

export function withTypeOptions(options: TypedDataOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function <T extends Function>(
    constructor: T
  ): T & { __options: TypedDataOptions } {
    return _.merge(constructor, { __options: options });
  };
}

interface ISeries {
  series_id: number;
}
@withTypeOptions({
  namesConversion: identityConversion,
})
export class Series extends TypedData {
  @declareType({ typeId: Type.PrimitiveTypeId.UINT64 })
  public series_id!: number;

  static create(series_id: number): Series {
    return new this({ series_id });
  }

  constructor(data: ISeries) {
    super(data);
  }
}

export function getSeriesData() {
  return Series.asTypedCollection([Series.create(1), Series.create(2)]);
}
