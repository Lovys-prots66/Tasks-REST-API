import { MongoClient } from "mongodb";
import fs from "node:fs/promises"

import { dbConfig } from "../config/db.js";
import userModel from "../models/userModel.js";
import taskModel from "../models/taskModel.js";
import { readJSON } from "../helpers/readJson.js";
import { taskSeeder } from "./seeders.js";

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
            const inserted = await userModel.insert(dummyUsers);
            
            if(!(names.includes(dbConfig.taskCollection.name)) && inserted){
                await dbo.createCollection(dbConfig.taskCollection.name, dbConfig.taskCollection.schema);
                
                let cursor = await userModel.find({}, {_id: 1});
                cursor = cursor.skip(Math.round(Math.random() * 50)).limit(20)

                const userIds = []
                
                for await(const user of cursor){
                    userIds.push(user._id)
                }

                const dummyTasks = await taskSeeder(110, userIds);
                await taskModel.insert(dummyTasks);
            }
        }

        return dbo;
        
    } catch (error) {
        throw new Error("Database connection failed: " + error);
    }
}