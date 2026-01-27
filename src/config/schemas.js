import crypto from "node:crypto"

export const schemas = {
    task : {
        id: crypto.randomBytes(12).toString("hex"),
        title: "required",
        description : "",
        category: "",
        due_date: (new Date()).toDateString(),
        completed: 0,
        created_at: (new Date()).setDate((new Date() + 7).getDate()),
        updated_at: new Date().toDateString(),
        user_id: "required"
    }
}