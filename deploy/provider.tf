terraform {
  required_providers {
    yandex = {
      source = "yandex-cloud/yandex"
    }
  }
}

provider "yandex" {
  service_account_key_file="../service_account_key_file.json"
  cloud_id  = local.cloud_id
  folder_id = local.folder_id
  zone      = local.zone
}
