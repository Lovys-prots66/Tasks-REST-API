import { schemas } from "../config/schemas.js";

function validateTaskSchema(task) {{
    const required = Object.entries(schemas.task).filter(([key, value]) => value === "required");
    const nullable = Object.entries(schemas.task).filter(([key, value]) => value != "required");

    for(const [key] of required){
        if(!(key in task)){
            throw new Error(`Missing required field: ${key}`);
        }
    }
    
    // provide nullable fields with default values if don't exist
    for(const [key, value] of nullable){
        if(!(key in task)){
            task[key] = value;
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