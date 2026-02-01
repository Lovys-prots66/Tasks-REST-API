import { connectDB } from "../database/connection.js";
import { dbConfig } from "../config/db.js";
import model from "./model.js";

class taskModel extends model{

    static collection = async () => {

        const connection = await connectDB();
        return connection.collection(dbConfig.taskCollection.name);
        
    }

    static async insert(tasks) {
        try {
            let inserted;

            if(Array.isArray(tasks)){
                inserted = await (await this.collection()).insertMany(tasks);
                return inserted;
            }

            return await (await this.collection()).insertOne(tasks);
        } catch (error) {
            throw error;
        }
    }

    static async count(filter){
        try {

            const count = await (await this.collection()).countDocuments(filter);
            return count;

        } catch (error) {
            throw error;
        }
    }

    static async find(filter = {}) {
        try {
            const found = (await this.collection()).find(filter);
            return found.toArray();
        } catch (error) {
            throw error;
        }
    }

    static async update(filter, data) {
        try {
            
            return (await this.collection()).updateOne(filter, {$set: {...data, updatedAt: (new Date()).toDateString()}});
            
        } catch (error) {
            throw error;
        }
    }

    static async delete(filter) {
        try {
            return (await this.collection()).deleteOne(filter);
        } catch (error) {
            throw error;
        }
    }
}

export default taskModel;