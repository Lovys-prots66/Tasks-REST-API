import taskModel from "../models/taskModel.js"
import { validateTaskSchema } from "../helpers/validateSchema.js"
import { parseBody } from "../helpers/parseBody.js";
import { respond } from "../helpers/senders.js";

export default class taskController{

    static async insert(req, res){
        try {
            const data = await parseBody(req);
            let result;

            if(Array.isArray(data)){
                data.forEach(task => validateTaskSchema(task));
                result = await taskModel.insert(data);
            }else{
                result = await taskModel.insert(data);
            }

            if(result.insertedCount <= 0){
                respond(res, 400, "Nothing was Inserted");
                return;
            }

           respond(res, 201, "Task Added");
           return; 

        } catch (error) {
            respond(res, 500, error.message);
            return;
        }
    }

    static async find(filter, res){
        try {
            const results = await taskModel.find(filter);
            if((Array.isArray(results) && results.length === 0) || !results){
                respond(res, 404, "Task(s) not Found");
                return;
            }

            respond(res, 200, results);
        } catch (error) {
            respond(res, 500, error.message);
            return;
        }
    }

    static async update(filter, req){
        try {
            const updateData = parseBody(req);

            return await taskModel.update(filter, updateData);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async delete(filter){
        try {
            return await taskModel.delete(filter);
        } catch (error) {
            throw new Error(error)
        }
    }
}