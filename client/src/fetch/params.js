function getHeader() {
    return({
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjYwOThmZmU1Zjg4ZWU2YmMzNjc1NjAiLCJpYXQiOjE2MDAxNzgxMjgsImV4cCI6MTYwMDE4MDgyOH0.0Ew4aXxY4G4bOftriLUV7M0aD_6YxrIMG2KXtDgG6wY"
    })
}

function getRefreshHeader() {
    return({
        Accept: "application/json",
        "Content-Type": "application/json",
        "refresh-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjVmMTkxMTUxMGViN2IzNTBiYzQzNzkiLCJpYXQiOjE2MDAxNzEyNTksImV4cCI6MTYwMDE3Mzk1OX0.y2GuK3jI8RoQGkqy9GuGm7KUij6ilnKOaxLdFlppt_8"
    })
}

function getRefreshParams() {
    return({
        "method": "GET",
        "headers": getRefreshHeader()
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
    getRefreshParams
}