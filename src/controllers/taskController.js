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

    static async update(filter, req, res){
        try {
            const updateData = parseBody(req);

            const result = await taskModel.update(filter, updateData);
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
            const result = await taskModel.delete(filter);
            if(result.deletedCount === 0) return respond(res, 400, "Nothing was deleted");

            return respond(res, 200, "Task deleted")
        } catch (error) {
            return respond(res, 500, error.message)
        }
    }
}