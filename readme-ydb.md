# Создание базы 
Создайте serverless базу YDB согласно документации (используя terraform)

# Формирование ключа для доступа к YDB
В корневой директории необходимо сформировать ключ для доступа к базе.
Ключ будет сформирован в файле sa.json

Запустите команду: (если Вы под windows - то лучше запускать из wsl)
```
yc iam key create \
--folder-id <идентификатор каталога> \
--service-account-name <имя сервисного аккаунта> \
--output service_account_key_file.json
```

### yc
Про установку и настройку yc прочитайте тут:

https://cloud.yandex.ru/docs/cli/quickstart

## Создание конфигурационного файла 
Создайте файл env.local в корневой директории.  
Скопируйте туда строку:  
YDB_SERVICE_ACCOUNT_KEY_FILE_CREDENTIALS=service_account_key_file.json  
(готовый пример файла уже приведен в данном проекте)

# Настройка подключения к базе данных
Перейдите в консоль YDB, создайте базу данных и сверху справа будет кнопка "подключиться".
Нажмите на нее и заполните в файле env.local поля:  
DOCUMENT_API_ENDPOINT и  
DATABASENAME

# Улучшение старой системы описания таблиц

Добавил два декоратора для описания обязательных и опциональных полей:  
declareTypePrim,  
declareTypeNull  

Добавил generic класс ITableFromClass для получения типа-интерфейса для испольования в методе create 
type ITMdb = ITableFromClass<Tmdb>;

Пример можно посмотреть в файле table_defs.ts

# Новая структура формирования описания таблиц 


---
# ========================================
# Создайте файл 

В документации:
https://cloud.yandex.ru/docs/ydb/ydb-sdk/
Дается три понятия: драйвер, клиент, сессия

# Устнавливаем подключение к Serverless YDB
Отвечаю про node.js sdk. Сначала создается драйвер, он инициализирует DiscoveryService, который дисковерит эндпойнты и связывает с каждый эндпойнтом фабрику сессий. Далее в рамках драйвера создаются tableClient и schemeClient, основная причина их разделения - это разные пулы сессий. У каждого пула свой список используемых и свободных сессий, свои min/max-лимиты. При порождении новой сессии в рамках пула (сессия порождается, если все имеющиеся сессии заняты, но мы еще не вышли за пределы max-лимита на данный пул) по очереди обходятся все известные эндойнты (которые нам вернул DiscoveryService), т.е. запрос 1 на порождение сессии получит ее из эндпойнта1, а запрос 2 получит новую сессию из эндпойнта 2 - это простейший механизм балансировки сессий.










# Таймауты 
// Indicates that client is no longer interested in the result of operation after the specified duration
// starting from the time operation arrives at the server.
// Server will try to stop the execution of operation and if no result is currently available the operation
// will receive TIMEOUT status code, which will be sent back to client if it was waiting for the operation result.
// Timeout of operation does not tell anything about its result, it might be completed successfully
// or cancelled on server.
google.protobuf.Duration operation_timeout = 2;

    // Server will try to cancel the operation after the specified duration starting from the time
    // the operation arrives at server.
    // In case of successful cancellation operation will receive CANCELLED status code, which will be
    // sent back to client if it was waiting for the operation result.
    // In case when cancellation isn't possible, no action will be performed.
    google.protobuf.Duration cancel_after = 3;

Проверка прилинкованных пакетов
npm ls -g --depth=0 --link=true
npm ls --depth=0 --link=true