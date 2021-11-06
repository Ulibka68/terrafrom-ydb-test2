// @ts-nocheck1

import { type } from 'os';
import { declareType, TypedData, Ydb } from 'ydb-sdk';
import { databaseName } from './config';

// const Type = Ydb.Type;
const TypePrim = Ydb.Type.PrimitiveTypeId;
export const TMDB_TABLE = 'tmdb'; // имя таблицы

type NonFunctionKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends Function ? never : K;
}[keyof T];

type ITableFromClass<T extends object> = { [K in NonFunctionKeys<T>]: T[K] };
type ITMdb = ITableFromClass<Tmdb>;

/*

export function declareType(type: IType) {

     //   function metadata(metadataKey: any, metadataValue: any)
     // const typeMetadataKey = Symbol('type');
    return Reflect.metadata(typeMetadataKey, type);
}
 */

export function declareTypePrim(typePrim: Ydb.Type.PrimitiveTypeId) {
  const type: Ydb.IType = { typeId: typePrim };
  return declareType(type);
}
export function declareTypeNull(typePrim: Ydb.Type.PrimitiveTypeId) {
  const type: Ydb.IType = { optionalType: { item: { typeId: typePrim } } };
  return declareType(type);
}

export class Tmdb extends TypedData {
  @declareTypePrim(TypePrim.UINT64)
  // @ts-ignore
  public id: number;

  @declareTypeNull(TypePrim.UTF8)
  public title?: string = undefined;

  @declareTypeNull(TypePrim.JSON)
  public genre_ids?: string = undefined;
  @declareTypeNull(TypePrim.DATE)
  public release_date?: Date = undefined;

  @declareTypeNull(TypePrim.BOOL)
  public adult?: Boolean = undefined;
  @declareTypeNull(TypePrim.UTF8)
  public backdrop_path?: string = undefined;
  @declareTypeNull(TypePrim.UTF8)
  public original_language?: string = undefined;
  @declareTypeNull(TypePrim.UTF8)
  public original_title?: string = undefined;
  @declareTypeNull(TypePrim.UTF8)
  public overview?: string = undefined;
  @declareTypeNull(TypePrim.FLOAT)
  public popularity?: number = undefined;
  @declareTypeNull(TypePrim.UTF8)
  public poster_path?: string = undefined;
  @declareTypeNull(TypePrim.BOOL)
  public video?: Boolean = undefined;
  @declareTypeNull(TypePrim.FLOAT)
  public vote_average?: number = undefined;
  @declareTypeNull(TypePrim.UINT32)
  public vote_count?: number = undefined;

  public YQLUpsert: string;

  constructor(data: Record<string, any>) {
    super(data);
    this.YQLUpsert = this.generateYQLUpsert(TMDB_TABLE);
  }

  static create(inp: ITMdb) {
    return new Tmdb(inp);
  }

  generateYQLUpsert(tableName: string) {
    let rst = `PRAGMA TablePathPrefix("${databaseName}");`;

    const typeKeys = {};
    for (const itm of Object.entries(Ydb.Type.PrimitiveTypeId)) {
      // @ts-ignore
      typeKeys[itm[1]] = itm[0];
    }

    const tpo = this.getRowType().structType.members.map((itm) => {
      const res = { name: itm.name, typeId: 0, optional: false, typeName: '' };
      if (itm.type.typeId) {
        res.typeId = itm.type.typeId;
      } else {
        res.typeId = itm.type!.optionalType!.item!.typeId as number;
        res.optional = true;
      }

      // @ts-ignore
      res.typeName = typeKeys[res.typeId];
      return res;
    });

    tpo.forEach((itm) => {
      rst += `\nDECLARE $${itm.name} as ${itm.typeName}${
        itm.optional ? '?' : ''
      };`;
    });
    rst += '\n\nUPSERT INTO ${tableName} (';
    tpo.forEach((itm) => {
      rst += `\n   ${itm.name},`;
    });
    rst = rst.substring(0, rst.length - 1);
    rst += '\n)VALUES (';
    tpo.forEach((itm) => {
      rst += `\n   $${itm.name},`;
    });
    rst = rst.substring(0, rst.length - 1);
    rst += '\n);';

    return rst;

    const query = `

UPSERT INTO  ${TMDB_TABLE}
    (
        id,
        title,
        genre_ids,
        release_date,
   

        )
VALUES (
        $id,
        $title,
        $genre_ids,
        $release_date,
   
 );

`;
  }
} // Tmdb
