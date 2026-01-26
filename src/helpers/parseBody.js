function parseBody(req){
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        })

        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : '')
            } catch (error) {
                reject(error.message);
            }
        })

        req.on("error", (err) => reject(err.message))
    })
}

export { parseBody }