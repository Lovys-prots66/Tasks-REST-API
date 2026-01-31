import http from "node:http"
import router from "./src/routers/router.js";
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
                const taskController = await import(`./src/controllers/taskController.js`);
                const taskRouter = router(url, taskController.default);
                return await taskRouter(req, res)
            }else if(endpoint.startsWith(`${baseUrl}/users`)){
                const userController = await import(`./src/controllers/userController.js`);
                const userRouter = router(url, userController.default);
                return await userRouter(req, res)
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