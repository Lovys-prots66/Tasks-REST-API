import { schemas } from "../config/schemas.js";
import crypto from "node:crypto"

function validateTaskSchema(task) {
    const required = Object.entries(schemas.task).filter(([key, value]) => value === "required");
    const nullable = Object.entries(schemas.task).filter(([key, value]) => value != "required");

    if(!task['_id']){
        task['_id'] = crypto.randomBytes(16).toString("hex");
    }

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
        if(key !== '_id' && !schemas.task.hasOwnProperty(key)){
            throw new Error(`Unexpected field: ${key}`);
        }
    }

    return true;
}

export { validateTaskSchema };