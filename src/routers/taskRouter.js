import { URL } from "node:url"
import taskModel from "../models/taskModel.js";
import { parseBody } from "../helpers/parseBody.js";
import taskController from "../controllers/taskController.js";

async function taskRouter(req, res){

    const url = new URL(req.url, 'http://localhost:3000');

    const params = Object.fromEntries(url.searchParams.entries());

    console.log(params);

    switch(req.method){
        case "GET":

            const result = await taskController.find(params);
            res.end(JSON.stringify(result))
            
            break

        case "POST":

            const inserted = taskController.insert(req)
            res.end(JSON.stringify(inserted));
            break

        case "PUT":
            res.end(JSON.stringify(await taskController.update(params, req)))
            break

        case "DELETE":
            res.end(JSON.stringify(await taskController.delete(params)))
            break;
        
        default:
            throw new Error("Invalid or Unsupported Method");
    }
}

export default taskRouter