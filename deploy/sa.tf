
resource "yandex_iam_service_account" "sa_catalog_test2" {
  name        = "${local.service_account_name_prefix}-${local.folder_id}"
  description = "Service account "
}

output "sa_catalog_test2_id" {
  value = yandex_iam_service_account.sa_catalog_test2.id
}

locals {
  srv_acc_catalog_id = yandex_iam_service_account.sa_catalog_test2.id
}

/*
resource "yandex_iam_service_account_iam_binding" "ydb-admin" {
  service_account_id = local.srv_acc_catalog_id
  role               = "ydb.admin"

  members = [
    "serviceAccount:${local.srv_acc_catalog_id}",
  ]
}*/


resource "yandex_resourcemanager_folder_iam_binding" "ydb-admin" {
  folder_id = local.folder_id
  role = "ydb.admin"
  members = ["serviceAccount:${local.srv_acc_catalog_id}",]
}


resource "yandex_resourcemanager_folder_iam_binding" "container-registry-images-puller" {
  folder_id = local.folder_id
  role = "container-registry.images.puller"
  members = ["serviceAccount:${local.srv_acc_catalog_id}",]
}

resource "yandex_resourcemanager_folder_iam_binding" "serverless-containers-invoker" {
  folder_id = local.folder_id
  role = "serverless.containers.invoker"
  members = ["serviceAccount:${local.srv_acc_catalog_id}",]
}
resource "yandex_resourcemanager_folder_iam_binding" "serverless-functions-invoker" {
  folder_id = local.folder_id
  role = "serverless.functions.invoker"
  members = ["serviceAccount:${local.srv_acc_catalog_id}",]
}

resource "yandex_resourcemanager_folder_iam_binding" "storage-editor" {
  folder_id = local.folder_id
  role = "storage.editor"
  members = ["serviceAccount:${local.srv_acc_catalog_id}",]
}
