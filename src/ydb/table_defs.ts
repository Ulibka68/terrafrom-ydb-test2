import {
  Column,
  declareType,
  Logger,
  Session,
  TableDescription,
  TypedData,
  Ydb,
} from 'ydb-sdk';

const Type = Ydb.Type;

export const SERIES_TABLE = 'series';

export interface ISeries {
  seriesId: number;
  title: string;
}

export class Series extends TypedData {
  @declareType({ typeId: Type.PrimitiveTypeId.UINT64 })
  public seriesId: number;

  @declareType({ typeId: Type.PrimitiveTypeId.UTF8 })
  public title: string;

  constructor(data: ISeries) {
    super(data);
    this.seriesId = data.seriesId;
    this.title = data.title;
  }

  static create(seriesId: number, title: string): Series {
    return new this({ seriesId, title });
  }
}

export async function createTables(session: Session, logger: Logger) {
  logger.info('Dropping old tables...');
  await session.dropTable(SERIES_TABLE);

  logger.info('Creating tables...');
  await session.createTable(
    SERIES_TABLE,
    new TableDescription()
      .withColumns(
        new Column(
          'series_id',
          Type.create({
            optionalType: {
              item: {
                typeId: Ydb.Type.PrimitiveTypeId.UINT64,
              },
            },
          })
        ),

        new Column(
          'title',
          Type.create({
            optionalType: { item: { typeId: Ydb.Type.PrimitiveTypeId.UTF8 } },
          })
        )
        // Типом колонки могут быть только примитивные значения
        /*  new Column(
          'title-list',
          Type.create({
            optionalType: {
              item: {
                listType: new Ydb.ListType({
                  item: {
                    typeId: Ydb.Type.PrimitiveTypeId.UTF8,
                  },
                }),
              },
            },
          })
        )*/
      )
      .withPrimaryKey('series_id')
  );
}
