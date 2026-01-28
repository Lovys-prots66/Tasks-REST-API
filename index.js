import http from "node:http"
import router from "./src/routers/router.js";
import { respond } from "./src/helpers/senders.js";
import taskController from "./src/controllers/taskController.js";
import userController from "./src/controllers/userController.js";

const server = http.createServer(async (req, res) => {
    // return await router();
    const url = new URL(req.url, 'http://localhost:3000');
    
    const endpoint = url.toString();
    if(endpoint === 'http://localhost:3000/tasks'){
        const taskRouter = router(url, taskController);
        return await taskRouter(req, res)
    }else if(endpoint === 'http://localhost:3000/users'){
        const userRouter = router(url, userController);
        return await userRouter(req, res)
    }else{
        return respond(res, 400, "Unknown endpoint")
    }


    
    res.end(vari);
})

server.listen(3000, "localhost", () => {
    console.log('http://localhost:3000/tasks');
    console.log('http://localhost:3000/users');
})
