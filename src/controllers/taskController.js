import taskModel from "../models/taskModel.js"
import { validateSchema } from "../helpers/validateSchema.js"
import { parseBody } from "../helpers/parseBody.js";


export default class taskController{

    static async insert(req, res){
        try {
            const data = await parseBody(req);
            validateSchema(data, "taskSchema");
            const result = await taskModel.insert(data);
            res.end(JSON.stringify(result));
        } catch (error) {
            throw new Error(error.message);
        }
    }

}