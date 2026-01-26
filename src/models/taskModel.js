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
                inserted = (await this.collection()).insertMany(tasks);
                return inserted;
            }

            return inserted = (await this.collection()).insertOne(tasks);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async find(criteria) {
        try {
            const found = (await this.collection()).find(criteria);
            return found;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async update(criteria) {
        try {
            let updated;
            
            if(Array.isArray(criteria)){
                updated = (await this.collection()).updateMany(criteria);

            }

            return updated = (await this.collection()).updateOne(criteria);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async delete(criteria) {
        try {
            let deleted;
            
            if(Array.isArray(criteria)){
                deleted = (await this.collection()).updateMany(criteria);

            }

            return deleted = (await this.collection()).updateOne(criteria);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default taskModel;