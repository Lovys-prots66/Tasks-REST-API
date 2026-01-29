import { env, loadEnvFile } from "node:process"

loadEnvFile('.env')

export const dbConfig = {
    dbName: env.DB_NAME.toString(),
    dbUrl: env.DB_URL.toString(),
    taskCollection: {
        name: env.COLLECTION_NAME_ONE.toString(),
        schema: {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: [],
                    propreties: {
                        
                    }
                }
            }
        }
    },
    userCollection: {
        name: env.COLLECTION_NAME_TWO.toString(),
        schema: {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: [],
                    propreties: {
                        
                    }
                }
            }
        }
    }
}