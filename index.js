import http from "node:http"
import taskRouter from "./src/routers/taskRouter.js";

const server = http.createServer(async (req, res) => {
    return await taskRouter(req, res);
})

server.listen(3000, "localhost", () => {
    console.log('http://localhost:3000/tasks');
})