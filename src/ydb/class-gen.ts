// import { Ydb, typeMetadataKey, TypedData, declareType } from 'ydb-sdk';
import { Ydb } from 'ydb-sdk';
// const Type = Ydb.Type;

// series.getTypedValue('seriesId'), { type: { typeId: 4 }, value: { uint64Value: 20 } }
// series.getTypedValue('title') { type: { typeId: 4608 }, value: { textValue: 'Серия 20' } }

/*


getValue(propertyKey: string): IValue {
  const type = this.getType(propertyKey);
  return typeToValue(type, this[propertyKey]);
}

getTypedValue(propertyKey: string): ITypedValue {
  return {
    type: this.getType(propertyKey),
    value: this.getValue(propertyKey)
  };
}
*/

const PT = Ydb.Type.PrimitiveTypeId; // PrimitiveType

const primitiveTypeToValue = {
  [PT.BOOL]: 'boolValue',
  [PT.INT8]: 'int32Value',
  [PT.UINT8]: 'uint32Value',
  [PT.INT16]: 'int32Value',
  [PT.UINT16]: 'uint32Value',
  [PT.INT32]: 'int32Value',
  [PT.UINT32]: 'uint32Value',
  [PT.INT64]: 'int64Value',
  [PT.UINT64]: 'uint64Value',
  [PT.FLOAT]: 'floatValue',
  [PT.DOUBLE]: 'doubleValue',
  [PT.STRING]: 'bytesValue',
  [PT.UTF8]: 'textValue',
  [PT.YSON]: 'bytesValue',
  [PT.JSON]: 'textValue',
  [PT.UUID]: 'textValue',
  [PT.JSON_DOCUMENT]: 'textValue',
  [PT.DATE]: 'uint32Value',
  [PT.DATETIME]: 'uint32Value',
  [PT.TIMESTAMP]: 'uint64Value',
  [PT.INTERVAL]: 'uint64Value',
  [PT.TZ_DATE]: 'textValue',
  [PT.TZ_DATETIME]: 'textValue',
  [PT.TZ_TIMESTAMP]: 'textValue',
} as const;

type PrimitiveYDBTypes = keyof typeof primitiveTypeToValue;

function preparePrimitiveValue(
  typeId: PrimitiveYDBTypes,
  value: number | Date
) {
  switch (parseInt(typeId as unknown as string)) {
    case PT.DATE:
      return Number(value) / 3600 / 1000 / 24;
    case PT.DATETIME:
      return Number(value) / 1000;
    case PT.TIMESTAMP:
      return Number(value) * 1000;
    case PT.TZ_DATE:
      return (value as Date).toDateString();
    case PT.TZ_DATETIME:
    case PT.TZ_TIMESTAMP:
      return (value as Date).toISOString();
    default:
      return value;
  }
}

export function getTypedValue(
  typeId: PrimitiveYDBTypes,
  // typeId: Ydb.Type.PrimitiveTypeId,
  val: any
) {
  return {
    type: { typeId },
    value: { [primitiveTypeToValue[typeId]]: val },
  };
}
// series.getTypedValue('seriesId'), { type: { typeId: 4 }, value: { uint64Value: 20 } }
