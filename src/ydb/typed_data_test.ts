import { Session, Logger, withRetries, TypedData } from 'ydb-sdk';
import { Series } from './table_defs';

export async function bulkInsert(
  session: Session,
  logger: Logger,
  tableName: string
) {
  const rowsBulk: Array<TypedData> = [];
  rowsBulk.push(new Series({ seriesId: 400, title: 'Серия Bulk 400' }));
  rowsBulk.push(new Series({ seriesId: 401, title: 'Серия Bulk 401' }));
  rowsBulk.push(new Series({ seriesId: 402, title: 'Серия Bulk 402' }));

  async function bulkUpsertTable() {
    const res = await session.bulkUpsert(tableName, rowsBulk);
    console.log(res);
  }
  await withRetries(bulkUpsertTable);
}

// const a = TypedData.asTypedCollection([series]);
// const request: Ydb.Table.IBulkUpsertRequest = {};

/*
// static asTypedCollection(collection: TypedData[]) {

// rows?: (Ydb.ITypedValue|null);


interface ITypedValue {
  type?: Ydb.IType | null;

  value?: Ydb.IValue | null;
}

// Represents a TypedValue.
class TypedValue implements ITypedValue {}


 * Constructs a new BulkUpsertRequest.
 * @memberof Ydb.Table
 * @classdesc Represents a BulkUpsertRequest.
 * @implements IBulkUpsertRequest
 * @constructor
 * @param {Ydb.Table.IBulkUpsertRequest=} [properties] Properties to set

function BulkUpsertRequest(properties) {
  if (properties)
    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
      if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
}


*/
