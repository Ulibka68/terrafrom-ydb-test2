import { TMDB_TABLE, Tmdb } from './table_defs';
import { databaseName, SYNTAX_V1 } from './config';
import { Logger, Session, withRetries } from 'ydb-sdk';

/*
PRAGMA

AutoCommit	Автоматически выполнять COMMIT после каждого запроса.

TablePathPrefix
    Добавить указанный префикс к путям таблиц внутри кластеров.
    Работает по принципу объединения путей в файловой системе: поддерживает ссылки на родительский каталог .. и не требует добавления / справа.

    Пример
    PRAGMA TablePathPrefix = "home/yql"; SELECT * FROM test;

    Префикс не добавляется, если имя таблицы указано как абсолютный путь (начинается с /).
*/

export async function importTmdb(session: Session, logger: Logger) {
  const query = `
${SYNTAX_V1}
PRAGMA TablePathPrefix("${databaseName}");

DECLARE $id as Uint64;
DECLARE $adult as Bool;
DECLARE $backdrop_path as Utf8;
DECLARE $popularity as float;
DECLARE $release_date as DateTime;
DECLARE $title as Utf8;
DECLARE $video as bool;
DECLARE $vote_average as float;
DECLARE $vote_coun as uint32;

UPSERT INTO  ${TMDB_TABLE}
    (
        id,
        adult,
        backdrop_path,
        popularity,
        release_date,
        title,
        video,
        vote_average,
        vote_count
        )
VALUES (
        $id,
        $adult,
        $backdrop_path,
        $popularity,
        $release_date,
        $title,
        $video,
        $vote_average,
        $vote_count
 );

`;

  const tmdb_record = Tmdb.create(
    false,
    'backdrop_path',
    [1],
    452,
    'ru',
    'title',
    '',
    1,
    'poster_path',
    new Date(),
    'title',
    false,
    1,
    1
  );

  async function fillTable() {
    logger.info('Inserting data to tables, preparing query...');
    const preparedQuery = await session.prepareQuery(query);
    logger.info('Query has been prepared, executing...');
    console.log(
      "series.getTypedValue('seriesId'),",
      tmdb_record.getTypedValue('id')
    );
    console.log(
      "series.getTypedValue('title')",
      tmdb_record.getTypedValue('title')
    );
    await session.executeQuery(preparedQuery, {
      $id: tmdb_record.getTypedValue('id'),
      $adult: tmdb_record.getTypedValue('adult'),
      $backdrop_path: tmdb_record.getTypedValue('backdrop_path'),
      $popularity: tmdb_record.getTypedValue('popularity'),
      $release_date: tmdb_record.getTypedValue('release_date'),
      $title: tmdb_record.getTypedValue('title'),
      $video: tmdb_record.getTypedValue('video'),
      $vote_average: tmdb_record.getTypedValue('vote_average'),
      $vote_count: tmdb_record.getTypedValue('vote_count'),
    });
  }
  await withRetries(fillTable);
}
