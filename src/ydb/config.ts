import terraform_output from '../../deploy/terraform.json';

export const databaseName = terraform_output.outputs.ydb_database_path.value;
export const SYNTAX_V1 = '--!syntax_v1';
