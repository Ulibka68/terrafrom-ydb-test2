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
