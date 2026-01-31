import userModel from "../models/userModel.js"
import controller from "./controller.js";
import { validateSchema } from "../helpers/validateSchema.js"
import { parseBody } from "../helpers/parseBody.js";
import { respond } from "../helpers/senders.js";
import { cleanPollution } from "../guardians/cleanPollution.js";

export default class userController extends controller{

    static async insert(req, res){
        try {
            const data = await parseBody(req);
            let result;

            if(Array.isArray(data)){
                data.forEach(user => validateSchema(user, "user"));
                result = await userModel.insert(data);
            }else{
                if(validateSchema(data, "user")){
                    result = await userModel.insert(data);
                }
            }

            if(result.insertedCount <= 0){
                respond(res, 400, "Nothing was Inserted");
                return;
            }

           respond(res, 201, "User Added");
           return; 

        } catch (error) {
            respond(res, 500, error.message);
            return;
        }
    }

    static async find(filter, res){
        try {
            cleanPollution(filter);
            const secretOption = {}
            if(!filter["showPsw"] && filter["showPsw"] != true){
                secretOption["password"] = 0;
            }
            delete filter["showPsw"]
            
            const results = await userModel.find(filter, secretOption);
            if((Array.isArray(results) && results.length === 0) || !results){
                respond(res, 404, "User(s) not Found");
                return;
            }

            respond(res, 200, results);
        } catch (error) {
            respond(res, 500, error.message);
            return;
        }
    }

    static async update(filter, req, res){
        try {
            cleanPollution(filter);
            const updateData = parseBody(req);

            const result = await userModel.update(filter, updateData);
            if(result.modifiedCount === 0){
                respond(res, 400, "Nothing was Updated");
                return;
            }

            return respond(res, 201, "Updated Successfuly");
        } catch (error) {
            return respond(res, 500, error.message)
        }
    }

    static async delete(filter, res){
        try {
            cleanPollution(filter);

            const result = await userModel.delete(filter);
            if(result.deletedCount === 0) return respond(res, 400, "Nothing was deleted");

            return respond(res, 204, "User deleted")
        } catch (error) {
            return respond(res, 500, error.message)
        }
    }
}