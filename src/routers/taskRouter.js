import { URL } from "node:url"
import taskController from "../controllers/taskController.js";
import { respond } from "../helpers/senders.js";

async function taskRouter(req, res){

    const url = new URL(req.url, 'http://localhost:3000');

    const params = Object.fromEntries(url.searchParams.entries());
    
    switch(req.method){
        case "GET":
            return await taskController.find(params, res);
            
        case "POST":
            return await taskController.insert(req, res);

        case "PUT":
            return await taskController.update(params, req, res);

        case "DELETE":
            return await taskController.delete(params, res)
        
        default:
            return respond(res, 405, "Unsupported or Unallowed method")
    }
}

export default taskRouter