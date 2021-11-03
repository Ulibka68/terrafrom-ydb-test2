
resource "yandex_ydb_database_serverless" "ydb_database" {
  name      = local.database_name
  folder_id = local.folder_id
}

output "ydb_database_document_api_endpoint" {
  value = yandex_ydb_database_serverless.ydb_database.document_api_endpoint
}

output "ydb_database_path" {
  value = yandex_ydb_database_serverless.ydb_database.database_path
}


locals {
  ydb_database_document_api_endpoint = yandex_ydb_database_serverless.ydb_database.document_api_endpoint
  ydb_database_path = yandex_ydb_database_serverless.ydb_database.database_path
}

