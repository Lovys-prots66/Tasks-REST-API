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
                    bsonType: "object",
                    required: ["title", "userId"],
                    properties: {
                        title: {
                            bsonType: "string"
                        },
                        description: {
                            bsonType: "string"
                        },
                        completed: {
                            bsonType: "bool"
                        },
                        category: {
                            bsonType: "array",
                            items: {
                                bsonType: "string"
                            }
                        },
                        dueDate: {
                            bsonType: "date"
                        },
                        createdAt: {
                            bsonType: "date"
                        },
                        updatedAt: {
                            bsonType: "date"
                        },
                        userId: {
                            bsonType: "objectId"
                        }
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
                            bsonType: "string",
                            description: "The user name to be displayed in their profile"
                        },
                        email: {
                            bsonType: "string",
                        },
                        password: {
                            bsonType: "string",
                            description: "The hashed password of the user"
                        }
                    }
                }
            }
        }
    }
}