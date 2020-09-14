function getHeader() {
    return({
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjVmMTkxMTUxMGViN2IzNTBiYzQzNzkiLCJpYXQiOjE2MDAwNzA2NjYsImV4cCI6MTYwMDA3MzM2Nn0.TF85MKWYdNH0tXc9GpnhFUv8KwMi7Vlba3ZL1nplF8I"
    })
}

function getGETParams() {
    return({
        "method": "GET",
        "headers": getHeader()
    })
}

function getPOSTParams(post) {
    return({
        "method": "POST",
        "headers": getHeader(),
        "body": JSON.stringify({
            "post": post
        })
    })
}

function getPATCHParams(patch) {
    return({
        "method": "PATCH",
        "headers": getHeader(),
        "body": JSON.stringify({
            "post": patch
        })
    })
}

function getDELETEParams() {
    return({
        "method": "DELETE",
        "headers": getHeader()
    })
}


export { 
    getGETParams, 
    getPOSTParams, 
    getPATCHParams, 
    getDELETEParams, 
}