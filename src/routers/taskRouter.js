import { URL } from "node:url"
import taskModel from "../models/taskModel.js";

async function taskRouter(req, res){

    const url = new URL(req.url, 'http://localhost:3000');

    if(url !== "http://localhost:3000/tasks"){
        throw new Error("Invalid Task API Route")
    }

    switch(req.method){
        case "GET":

            const result = taskModel(req.body);
            res.end(result)
            
            break

        default:
            throw new Error("Invalid or Unsupported Method");
    }
}

export default taskRouter