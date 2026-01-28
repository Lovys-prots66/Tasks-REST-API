import { URL } from "node:url"
import taskController from "../controllers/taskController.js";

async function taskRouter(req, res){

    const url = new URL(req.url, 'http://localhost:3000');

    const params = Object.fromEntries(url.searchParams.entries());
    
    switch(req.method){
        case "GET":

            const result = await taskController.find(params, res);
            res.end(JSON.stringify(result))
            
            break

        case "POST":
            return await taskController.insert(req, res);

        case "PUT":
            return await taskController.update(params, req);

        case "DELETE":
            res.end(JSON.stringify(await taskController.delete(params)))
            break;
        
        default:
            throw new Error("Invalid or Unsupported Method");
    }
}

export default taskRouter