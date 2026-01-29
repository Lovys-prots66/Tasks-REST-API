import http from "node:http"
import router from "./src/routers/router.js";
import { respond } from "./src/helpers/senders.js";

const server = http.createServer(async (req, res) => {
    // return await router();
    const url = new URL(req.url, 'http://localhost:3000');
    
    const endpoint = url.toString();
    if(endpoint === 'http://localhost:3000/tasks'){
        const taskController = await import('./src/controllers/taskController.js');
        const taskRouter = router(url, taskController.default);
        return await taskRouter(req, res)
    }else if(endpoint === 'http://localhost:3000/users'){
        const userController = await import('./src/controllers/userController.js');
        const userRouter = router(url, userController.default);
        return await userRouter(req, res)
    }else{
        return respond(res, 400, "Unknown endpoint")
    }

})

server.listen(3000, "localhost", () => {
    console.log('http://localhost:3000/tasks');
    console.log('http://localhost:3000/users');
})
