import { URL } from "node:url"
import taskModel from "../models/taskModel.js";
import { parseBody } from "../helpers/parseBody.js";

async function taskRouter(req, res){

    const url = new URL(req.url, 'http://localhost:3000');

    const params = Object.fromEntries(url.searchParams.entries());

    console.log(params);

    switch(req.method){
        case "GET":

            const result = await taskModel.find(params);
            res.end(JSON.stringify(result))
            
            break

        case "POST":

            const data = await parseBody(req);
            res.end(JSON.stringify(await taskModel.insert(data)))
            
            break

        case "PUT":
            const putData = await parseBody(req);
            res.end(JSON.stringify(await taskModel.update(params, putData)))
            break

        case "DELETE":
            res.end(JSON.stringify(await taskModel.delete(params)))
            break;
        
        default:
            throw new Error("Invalid or Unsupported Method");
    }
}

export default taskRouter