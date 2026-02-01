import taskController from "../controllers/taskController.js";
import { respond } from "../helpers/senders.js";
import { securityHeaders } from "../guardians/securityHeaders.js";
import { cleanPollution } from "../guardians/cleanPollution.js";

async function taskRouter(req, res, url){

    cleanPollution(req);
    securityHeaders(res);
    
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