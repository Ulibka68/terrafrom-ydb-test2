// @ts-nocheck1

import { declareType, TypedData, Ydb } from 'ydb-sdk';

// const Type = Ydb.Type;
const TypePrim = Ydb.Type.PrimitiveTypeId;
export const TMDB_TABLE = 'tmdb'; // имя таблицы

type NonFunctionKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends Function ? never : K;
}[keyof T];

type ITableFromClass<T extends object> = { [K in NonFunctionKeys<T>]: T[K] };

interface ITmdb {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export class Tmdb extends TypedData {
  @declareType({ typeId: TypePrim.BOOL })
  public adult: boolean;
  @declareType({ typeId: TypePrim.UTF8 })
  public backdrop_path: string;
  @declareType({ typeId: TypePrim.JSON })
  public genre_ids: Array<number>;
  @declareType({ typeId: TypePrim.UINT64 })
  public id: number;
  @declareType({ typeId: TypePrim.UTF8 })
  public original_language: string;
  @declareType({ typeId: TypePrim.UTF8 })
  public original_title: string;
  @declareType({ typeId: TypePrim.UTF8 })
  public overview: string;
  @declareType({ typeId: TypePrim.FLOAT })
  public popularity: number;
  @declareType({ typeId: TypePrim.UTF8 })
  public poster_path: string;
  @declareType({ typeId: TypePrim.UTF8 })
  public release_date: Date;
  @declareType({ typeId: TypePrim.DATE })
  public title: string;
  @declareType({ typeId: TypePrim.BOOL })
  public video: boolean;
  @declareType({ typeId: TypePrim.FLOAT })
  public vote_average: number;
  @declareType({ typeId: TypePrim.UINT32 })
  public vote_count: number;

  constructor(data: ITmdb) {
    super(data);

    this.adult = data.adult;
    this.backdrop_path = data.backdrop_path;
    this.genre_ids = data.genre_ids;
    this.id = data.id;
    this.original_language = data.original_language;
    this.original_title = data.original_title;
    this.overview = data.overview;
    this.popularity = data.popularity;
    this.poster_path = data.poster_path;
    this.release_date = data.release_date;
    this.title = data.title;
    this.video = data.video;
    this.vote_average = data.vote_average;
    this.vote_count = data.vote_count;
  }

  static create(
    adult: boolean,
    backdrop_path: string,
    genre_ids: Array<number>,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: Date,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
  ): Tmdb {
    return new this({
      adult,
      backdrop_path,
      genre_ids,
      id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      video,
      vote_average,
      vote_count,
    });
  }
}

export class Tmdb2 extends TypedData {
  // @ts-ignore
  @declareType({ typeId: TypePrim.BOOL }) public adult: boolean;
  // @ts-ignore
  @declareType({ typeId: TypePrim.UTF8 }) public backdrop_path: string;
  // @ts-ignore
  @declareType({ typeId: TypePrim.JSON }) public genre_ids: Array<number>;
  // @ts-ignore
  @declareType({ typeId: TypePrim.UINT64 }) public id: number;
  // @ts-ignore
  @declareType({ typeId: TypePrim.UTF8 }) public original_language: string;
  // @ts-ignore
  @declareType({ typeId: TypePrim.UTF8 }) public original_title: string;
  // @ts-ignore
  @declareType({ typeId: TypePrim.UTF8 }) public overview: string;
  // @ts-ignore
  @declareType({ typeId: TypePrim.FLOAT }) public popularity: number;
  // @ts-ignore
  @declareType({ typeId: TypePrim.UTF8 }) public poster_path: string;
  // @ts-ignore
  @declareType({ typeId: TypePrim.UTF8 }) public release_date: Date;
  // @ts-ignore
  @declareType({ typeId: TypePrim.DATE }) public title: string;
  // @ts-ignore
  @declareType({ typeId: TypePrim.BOOL }) public video: boolean;
  // @ts-ignore
  @declareType({ typeId: TypePrim.FLOAT }) public vote_average: number;
  // @ts-ignore
  @declareType({ typeId: TypePrim.UINT32 }) public vote_count: number;

  constructor(data: Record<string, any>) {
    super(data);
    console.log(Reflect.ownKeys(this));
  }

  static create(
    adult: boolean,
    backdrop_path: string,
    genre_ids: Array<number>,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: Date,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
  ): Tmdb2 {
    return new this({
      adult,
      backdrop_path,
      genre_ids,
      id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      video,
      vote_average,
      vote_count,
    });
  }
}

export type I2Tmdb = ITableFromClass<Tmdb2>;

const a = Tmdb2.create(
  true,
  'backdrop_path',
  [1],
  22,
  'ru',
  'title1',
  '',
  1,
  'poster_path',
  new Date(),
  'title',
  true,
  1,
  1
);
console.log(a.adult);
