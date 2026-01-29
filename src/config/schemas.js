export const schemas = {
    task : {
        title: "required",
        description : "",
        category: "",
        due_date: (new Date()).toDateString(),
        completed: false,
        created_at: (new Date()).toDateString(),
        updated_at: new Date().toDateString(),
        user_id: "required"
    },

    user : {
        username: "required",
        email: "required",
        password: "required"
    }
}