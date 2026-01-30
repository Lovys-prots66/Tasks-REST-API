import { MongoClient } from "mongodb";
import fs from "node:fs/promises"

import { dbConfig } from "../config/db.js";
import userModel from "../models/userModel.js";
import taskModel from "../models/taskModel.js";

const client = new MongoClient(dbConfig.dbUrl);

export async function connectDB() {
    
    const readJSON = async (path) => {
        try {
            const raw = await fs.readFile(path, "utf-8")
            return JSON.parse(raw);
        } catch (error) {
            throw new Error("readJSON error: " + error.message);
        }
    }
    
    try {
        const con = await client.connect();
        const dbo = con.db(dbConfig.dbName);
        const collections = dbo.listCollections().toArray();
        const names = (await collections).map(col => col.name);

        if(!(names.includes(dbConfig.userCollection.name))){
            await dbo.createCollection(dbConfig.userCollection.name, dbConfig.userCollection.schema)

            const dummyUsers = await readJSON("./src/database/dummyUsers.json")
            console.log(dummyUsers);
            await userModel.insert(dummyUsers);
        }
        
        if(!(names.includes(dbConfig.taskCollection.name))){
            await dbo.createCollection(dbConfig.taskCollection.name, dbConfig.taskCollection.schema);
            
            const dummyTasks = await readJSON("./src/database/dummyTasks.json")
            const inserted = await taskModel.insert(dummyTasks);
            console.log(inserted);
        }


        return dbo;
        
    } catch (error) {
        throw new Error("Database connection failed: " + error.message);
    }
}