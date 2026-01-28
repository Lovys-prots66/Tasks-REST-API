import { env, loadEnvFile } from "node:process"

loadEnvFile('.env')

export const dbConfig = {
    dbName: env.DB_NAME.toString(),
    dbUrl: env.DB_URL.toString(),
    taskCollectionName: env.COLLECTION_NAME_ONE.toString(),
    userCollectionName: env.COLLECTION_NAME_TWO.toString()
}