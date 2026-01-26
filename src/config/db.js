import { env, loadEnvFile } from "node:process"

loadEnvFile('.env')

export const dbConfig = {
    dbName: env.DB_NAME.toString(),
    dbUrl: env.DB_URL.toString(),
    collectionName: env.COLLECTION_NAME.toString()
}