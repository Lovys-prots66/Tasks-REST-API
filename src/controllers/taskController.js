import taskModel from "../models/taskModel.js"
import { validateTaskSchema } from "../helpers/validateSchema.js"
import { parseBody } from "../helpers/parseBody.js";


export default class taskController{

    static async insert(req){
        try {
            const data = await parseBody(req);
            
            if(Array.isArray(data)){
                data.forEach(task => validateTaskSchema(task));
                return await taskModel.insert(data);
            }

            if(validateTaskSchema(data)){
                return await taskModel.insert(data);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async find(params){
        try {
            const results = await taskModel.find(params);
            return results;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}