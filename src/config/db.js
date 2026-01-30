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
                    required: ["title", "user_id"],
                    properties: {
                        title: {
                            type: "string",
                            description: "a short self-description"
                        },   
                        description: {
                            type: "string",
                            description: "a longer description of the task"
                        },
                        completed : {
                            type: "boolean",
                        },
                        category: {
                            type: ["string"],
                            description: "classification of the task"
                        },
                        due_date: {
                            bsonType: "date",
                            description: "deadline of the task"
                        },
                        createdAt: {
                            bsonType: "date"
                        },
                        updatedAt: {
                            bsonType: "date"
                        },
                        user_id: {
                            bsonType: "objectId",
                            description: "the id of the task owner"
                        },
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
                    required: ["name", "email", "password"],
                    properties: {
                        name: {
                            type: "string",
                            description: "The user name to be displayed in their profile"
                        },
                        email: {
                            type: "string",
                        },
                        password: {
                            type: "string",
                            description: "The hashed password of the user"
                        }
                    }
                }
            }
        }
    }
}