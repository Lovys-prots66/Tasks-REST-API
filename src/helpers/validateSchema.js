import { schemas } from "../config/schemas.js";

function validateSchema(data) {
    const required = Object.entries(schemas.data).filter(([key, value]) => value === "required");
    const nullable = Object.entries(schemas.data).filter(([key, value]) => value != "required");

    for(const [key] of required){
        if(!(key in data)){
            throw new Error(`Missing required field: ${key}`);
        }
    }
    
    // provide nullable fields with default values if don't exist
    for(const [key, value] of nullable){
        if(!(key in data)){
            data[key] = value;
        }
    }

    for(const key in data){
        if(!schemas.data.hasOwnProperty(key)){
            throw new Error(`Unexpected field: ${key}`);
        }
    }

    return true;
}

export { validateSchema };