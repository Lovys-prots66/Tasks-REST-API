import { schemas } from "../config/schemas.js";

function validateTaskSchema(task) {{
    const required = Object.entries(schemas.task).filter(([key, value]) => value === "required");

    for(const [key] of required){
        if(!(key in task)){
            throw new Error(`Missing required field: ${key}`);
        }
    }

    for(const key in task){
        if(!schemas.task.hasOwnProperty(key)){
            throw new Error(`Unexpected field: ${key}`);
        }
    }

    return true;
}}

export { validateTaskSchema };