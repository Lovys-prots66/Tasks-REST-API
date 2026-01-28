import crypto from "node:crypto"

export const schemas = {
    task : {
        title: "required",
        description : "",
        category: "",
        due_date: (new Date()).toDateString(),
        completed: 0,
        created_at: (new Date()).toDateString(),
        updated_at: new Date().toDateString(),
        user_id: "required"
    }
}