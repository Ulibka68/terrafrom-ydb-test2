locals {
  cloud_id                    = "b1gib03pgvqrrfvhl3kb"
  folder_id                   = "b1gku2m6mn7tb2d3ib91"
  zone                        = "ru-central1-a"
  service_account_name_prefix = "srv-acc-pref"
  database_name               = "test2"

  import_function_name = "import-function"
  import_trigger_name  = "import-trigger"
}


output "locals" {
  value = {
    folder_id : local.folder_id,
    cloud_id : local.cloud_id,
    database_name : local.database_name,
  }
}
