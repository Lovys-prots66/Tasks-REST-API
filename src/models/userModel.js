import { ObjectId } from "mongodb";

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
                users = await Promise.all(
                    users.map(async user =>({ 
                        ...user,
                        password: await hashPsw(user.password)
                    }))
                )
                return await (await this.collection()).insertMany(users);
            }

            users["password"] = await hashPsw(users["password"]);
            return (await this.collection()).insertOne(users);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async count(filter){
        try {

            const count = await (await this.collection()).countDocuments(filter);
            return count;

        } catch (error) {
            throw new Error(error);
        }
    }

    static async find(filter, options = {}) {
        try {
            if(filter["_id"]){
                filter["_id"] = new ObjectId(filter["_id"]);
            }
            
            const collection = await this.collection();
            return collection.find(filter, {projection : options});
        } catch (error) {
            throw new Error(error);
        }
    }

    static async update(filter, data) {
        try {
            
            return (await this.collection()).updateOne(filter, {$set: data});

        } catch (error) {
            throw new Error(error);
        }
    }

    static async delete(filter) {
        try {
            return (await this.collection()).deleteOne(filter);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default userModel;