function respond(res, code = 200, message = "No Message Provided"){
    return res.writeHead(code, {
        'Content-Type': "application/json",
    })
    .end(JSON.stringify(message));
}

export { respond }