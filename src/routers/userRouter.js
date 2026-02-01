import userController from "../controllers/userController.js";
import { respond } from "../helpers/senders.js";
import { securityHeaders } from "../guardians/securityHeaders.js";
import { cleanPollution } from "../guardians/cleanPollution.js";

async function userRouter(req, res, url){

    cleanPollution(req);
    securityHeaders(res);
    
    let endpoint = url.toString();
    const params = Object.fromEntries(url.searchParams.entries());
    
    switch(req.method){
        case "GET":
            if(endpoint.endsWith("/tasks")){
                const refined = endpoint.toString().split('/').toSpliced(4, 1);
                const newUrl = new URL(refined.join("/"));
                const params = {userId : newUrl.searchParams.get("_id")}
                return await userController.findUserTasks(params, res);
            }
            return await userController.find(params, res);
            
        case "POST":
            return await userController.insert(req, res);

        case "PUT":
            return await userController.update(params, req, res);

        case "DELETE":
            return await userController.delete(params, res)
        
        default:
            return respond(res, 405, "Unsupported or Unallowed method")
    }


}

export default userRouter