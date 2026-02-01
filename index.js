import http from "node:http"
import { respond } from "./src/helpers/senders.js";
import { serverConfig } from "./src/config/server.js";
import { rateLimiter } from "./src/guardians/rateLimitter.js";

(function server(){
    const {host, port} = serverConfig;
    const baseUrl = `http://localhost:3000`;
    
    const ratelimit = rateLimiter({windowMs: 60000, maxReqs: 100})

    const server = http.createServer(async (req, res) => {
        
        const url = new URL(req.url, `${baseUrl}`);
        const endpoint = url.toString();

        ratelimit(req, res, async () => {
            
            if(endpoint.startsWith(`${baseUrl}/tasks`)){
                const taskRouter = await import(`./src/routers/taskRouter.js`);
                return await taskRouter.default(req, res, url)
            }else if(endpoint.startsWith(`${baseUrl}/users`)){
                const userRouter = await import(`./src/routers/userRouter.js`);
                return await userRouter.default(req, res, url)
            }else{
                return respond(res, 400, "Unknown endpoint")
            }
            
        })
        
    })
    
    
    server.listen(port, host, () => {
        console.log(`${baseUrl}/tasks`);
        console.log(`${baseUrl}/users`);
    })
})()