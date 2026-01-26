import { MongoClient } from "mongodb";
import { dbConfig } from "../config/db.js";

const client = new MongoClient(dbConfig.dbUrl);

export async function connectDB() {
    try {
        const con = await client.connect();
        return con.db(dbConfig.dbName);
    } catch (error) {
        throw new Error("Database connection failed: " + error.message);
    }
}