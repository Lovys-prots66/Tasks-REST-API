import { MongoClient } from "mongodb";
import fs from "node:fs/promises"

import { dbConfig } from "../config/db.js";
import userModel from "../models/userModel.js";
import taskModel from "../models/taskModel.js";
import { readJSON } from "../helpers/readJson.js";

const client = new MongoClient(dbConfig.dbUrl);

export async function connectDB() {
    
    // private function for returning js objects from json
    
    try {
        const con = await client.connect();
        const dbo = con.db(dbConfig.dbName);
        const collections = dbo.listCollections().toArray();
        const names = (await collections).map(col => col.name);

        // create collections if they don't exist, then seed them

        if(!(names.includes(dbConfig.userCollection.name))){
            await dbo.createCollection(dbConfig.userCollection.name, dbConfig.userCollection.schema)

            const dummyUsers = await readJSON("./src/database/dummyUsers.json")
            await userModel.insert(dummyUsers);
        }
        
        if(!(names.includes(dbConfig.taskCollection.name))){
            await dbo.createCollection(dbConfig.taskCollection.name, dbConfig.taskCollection.schema);
            
            const dummyTasks = await readJSON("./src/database/dummyTasks.json")
            await taskModel.insert(dummyTasks);
        }


        return dbo;
        
    } catch (error) {
        throw new Error("Database connection failed: " + error.message);
    }
}