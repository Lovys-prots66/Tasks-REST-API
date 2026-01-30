import { MongoClient } from "mongodb";
import fs from "node:fs/promises"

import { dbConfig } from "../config/db.js";
import userModel from "../models/userModel.js";
import taskModel from "../models/taskModel.js";

const client = new MongoClient(dbConfig.dbUrl);

export async function connectDB() {
    
    const readJSON = async (path) => {
        try {
            const raw = await fs.readFile(path)
            const data = JSON.parse(raw);
            return data;
        } catch (error) {
            throw new Error("Error reading json: " + error.message);
        }
    }
    
    try {
        const con = await client.connect();
        const dbo = con.db(dbConfig.dbName);
        const collections = dbo.listCollections().toArray();

        if(!(await collections).includes(dbConfig.userCollection.name)){
            dbo.createCollection(dbConfig.userCollection.name, dbConfig.userCollection.schema)

            const dummyUsers = await readJSON("./src/database/dummyUsers.json")
            await userModel.insert(JSON.parse(dummyUsers));
        }
        
        if(!(await collections).includes(dbConfig.taskCollection.name)){
            dbo.createCollection(dbConfig.taskCollection.name, dbConfig.taskCollection.schema);
            
            const dummyTasks = await readJSON("./src/database/dummyTasks.json")
            await userModel.insert(JSON.parse(dummyTasks));
        }


        return dbo;
        
    } catch (error) {
        throw new Error("Database connection failed: " + error.message);
    }
}