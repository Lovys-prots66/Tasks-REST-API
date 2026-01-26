import { URL } from "node:url"
import taskModel from "../models/taskModel.js";
import { parseBody } from "../helpers/parseBody.js";

async function taskRouter(req, res){

    const url = new URL(req.url, 'http://localhost:3000');

    // if(url !== "http://localhost:3000/tasks"){
    //     throw new Error("Invalid Task API Route")
    // }

    switch(req.method){
        case "GET":

            const params = url.searchParams;
            const result = await taskModel.find(params);
            res.end(JSON.stringify(result))
            
            break

        case "POST":

            const data = await parseBody(req);
            res.end(JSON.stringify(await taskModel.insert(data)))
            
            break

        default:
            throw new Error("Invalid or Unsupported Method");
    }
}

export default taskRouter