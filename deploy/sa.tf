
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

resource "yandex_iam_service_account_iam_binding" "ydb-admin" {
  service_account_id = local.srv_acc_catalog_id
  role               = "ydb.admin"

  members = [
    "serviceAccount:${local.srv_acc_catalog_id}",
  ]
}

#yc resource-manager folder add-access-binding ${FOLDER_ID} --role ydb.admin --subject serviceAccount:${MOVIES_API_SA_ID}
#yc resource-manager folder add-access-binding ${FOLDER_ID} --role container-registry.images.puller --subject serviceAccount:${MOVIES_API_SA_ID}
#yc resource-manager folder add-access-binding ${FOLDER_ID} --role serverless.containers.invoker --subject serviceAccount:${MOVIES_API_SA_ID}
#yc resource-manager folder add-access-binding ${FOLDER_ID} --role serverless.functions.invoker --subject serviceAccount:${MOVIES_API_SA_ID}
#yc resource-manager folder add-access-binding ${FOLDER_ID} --role storage.editor --subject serviceAccount:${MOVIES_API_SA_ID}

