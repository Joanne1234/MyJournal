function getHeader() {
    return({
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjVmMTkxMTUxMGViN2IzNTBiYzQzNzkiLCJpYXQiOjE2MDAwODczMTYsImV4cCI6MTYwMDA5MDAxNn0.bzEIln-bN7Rx4Vz489s11T3EEOSCmFxgqRTZ7UOetS0"
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