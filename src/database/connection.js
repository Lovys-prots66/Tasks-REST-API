import { MongoClient } from "mongodb";
import { dbConfig } from "../config/db.js";

const client = new MongoClient(dbConfig.dbUrl);

export async function connectDB() {
    try {
        const con = await client.connect();
        const dbo = con.db(dbConfig.dbName);
        const collections = dbo.listCollections().toArray();

        if(!(await collections).includes(dbConfig.taskCollection.name)){
            dbo.createCollection(dbConfig.taskCollection.name, dbConfig.taskCollection.schema)
        }

        if(!(await collections).includes(dbConfig.userCollection.name)){
            dbo.createCollection(dbConfig.userCollection.name, dbConfig.userCollection.schema)
        }

        return dbo;
        
    } catch (error) {
        throw new Error("Database connection failed: " + error.message);
    }
}