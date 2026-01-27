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

    static async count(criteria){
        try {

            const count = await (await this.collection()).countDocuments(criteria);
            return count;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async find(criteria) {
        try {
            const found = (await this.collection()).find(criteria);
            return found.toArray();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async update(criteria, data) {
        try {
            let updated;
            
            if(Array.isArray(criteria)){
                updated = (await this.collection()).updateMany(criteria, {$set: data});
                return updated;
            }

            return updated = (await this.collection()).updateOne(criteria, {$set: data});
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async delete(criteria) {
        try {
            let deleted;
            
            if(Array.isArray(criteria)){
                deleted = (await this.collection()).deleteMany(criteria);
                return deleted;
            }

            return deleted = (await this.collection()).deleteOne(criteria);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default taskModel;