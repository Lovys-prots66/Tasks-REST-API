import { connectDB } from "../database/connection.js";
import { dbConfig } from "../config/db.js";

class taskModel{

    static collection = async () => {

        const connection = await connectDB();
        return connection.collection(dbConfig.collectionName);
        
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
            throw new Error(error.message);
        }
    }

    static async count(filter){
        try {

            const count = await (await this.collection()).countDocuments(filter);
            return count;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async find(filter) {
        try {
            const found = (await this.collection()).find(filter);
            return found.toArray();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async update(filter, data) {
        try {
            let updated;
            
            if(Array.isArray(filter)){
                updated = (await this.collection()).updateMany(filter, {$set: data});
                return updated;
            }

            return updated = (await this.collection()).updateOne(filter, {$set: data});
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async delete(filter) {
        try {
            return (await this.collection()).deleteOne(filter);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default taskModel;