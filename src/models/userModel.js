import { connectDB } from "../database/connection.js";
import { dbConfig } from "../config/db.js";
import { hashPsw } from "../helpers/hashPassword.js";
import model from "./model.js";

class userModel extends model{

    static collection = async () => {

        const connection = await connectDB();
        return connection.collection(dbConfig.userCollection.name);
        
    }

    static async insert(users) {
        try {
            if(Array.isArray(users)){
                users.map(user => hashPsw(user.password))
                return await (await this.collection()).insertMany(users);
            }

            users["password"] = hashPsw(users["password"])
            return await (await this.collection()).insertOne(users);
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
            
            return (await this.collection()).updateOne(filter, {$set: data});

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

export default userModel;