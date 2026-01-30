import { respond } from "../helpers/senders.js";
import { securityHeaders } from "../guardians/securityHeaders.js";

function router(url, controller){
    return async function(req, res){
        securityHeaders(res);

        const params = Object.fromEntries(url.searchParams.entries());
        
        switch(req.method){
            case "GET":
                return await controller.find(params, res);
                
            case "POST":
                return await controller.insert(req, res);
    
            case "PUT":
                return await controller.update(params, req, res);
    
            case "DELETE":
                return await controller.delete(params, res)
            
            default:
                return respond(res, 405, "Unsupported or Unallowed method")
        }

    }

}

export default router