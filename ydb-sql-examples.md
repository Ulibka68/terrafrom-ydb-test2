admin
Oleg Bondar

владелец
Andrey Fomichev

https://cloud.yandex.ru/docs/ydb/yql/reference/syntax/delete#delete-on

$to_delete = (
SELECT Key, SubKey FROM my_table WHERE Value = "ToDelete"
);

SELECT * FROM my_table;

DELETE FROM my_table ON
SELECT * FROM $to_delete;
COMMIT;

Условие можно передать через FROM AS_TABLE($param);
DECLARE $param AS List<Struct<???>>

_______________________________________

$ids=Aslist(1,2);
select title from books
where id in $ids;

_______________________________________

UPDATE my_table
SET Value1 = YQL::ToString(Value2 + 1), Value2 = Value2 - 1
WHERE Key1 > 1;

_______________________________________
UPDATE my_table
SET Value1 = YQL::ToString(Value2 + 1), Value2 = Value2 - 1
WHERE Key1 > 1;

_______________________________________

FROM AS_TABLE
Обращение к именованным выражениям как к таблицам с помощью функции AS_TABLE.

$data = AsList(
AsStruct(1u AS Key, "v1" AS Value),
AsStruct(2u AS Key, "v2" AS Value),
AsStruct(3u AS Key, "v3" AS Value));

SELECT Key, Value FROM AS_TABLE($data);

________________________________________
$ids=AsList(101,102);
select * from books where id in $ids;

select author_id, aggregate_list(info)
from books
group by author_id;

А здесь он вернется как результат. Тип колонки column1 — List<Utf8>


_______________________________________
В YQL совершенно точно есть команда **ALTER TABLE**
Но в разделе Справочник YQL Синтаксис (ссылка ниже)
https://cloud.yandex.ru/docs/ydb/yql/reference/syntax/create_table

Отсутствует описание команды ALTER TABLE

Из примерров можно сделать вывод что ALTER TABLE все таки есть:
ALTER TABLE episodes ADD COLUMN viewers Uint64;
ALTER TABLE episodes DROP COLUMN viewers;



Просьба добавить в документацию в раздел Справочник YQL Синтаксис команды
ALTER TABLE
и команды создания/удаления вторичного индекса

https://cloud.yandex.ru/docs/ydb/oss/public/develop/concepts/secondary_indexes

ALTER TABLE `series` ADD INDEX `title_index` GLOBAL [SYNC|ASYNC] ON (`title`);
ALTER TABLE `series` DROP INDEX `title_index`;

---------------------
Как можно через SDK получить состояния операции построения вторичного индекса или отменить построение вторичного индекса?


