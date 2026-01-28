import taskModel from "../models/taskModel.js"
import { validateTaskSchema } from "../helpers/validateSchema.js"
import { parseBody } from "../helpers/parseBody.js";


export default class taskController{

    static async insert(req){
        try {
            const data = await parseBody(req);
            if(validateTaskSchema(data)){
                const result = await taskModel.insert(data);
                return result;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}