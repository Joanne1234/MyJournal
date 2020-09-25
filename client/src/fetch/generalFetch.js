import { 
    getPOSTParams, 
    getGETParams, 
    getPATCHParams, 
    getDELETEParams,
    getRefreshParams
} from './params'

async function makeNewPost(url, post) {
    // get list of items
    let res = null;
    try {
        res = await fetch(url, getPOSTParams(post))
        res = await res.json()
        return res
    } catch (err) {
        console.log("POST Error:", err);
        return err
    }
}

async function getObject(url) {
    // get items
    let res = null;
    try {
        res = await fetch(url, getGETParams())
        res = await res.json()
        return res
    } catch (err) {
        console.log("GET Error:", err);
    }
}

async function patch(url, toPatch) {
    // update specific field (field given in url)
    let res = null;
    try {
        res = await fetch(url, getPATCHParams(toPatch))
        res = await res.json()
        return res
    } catch (err) {
        console.log("PATCH Error:", err);
    }
}

async function deleteObject(url) {
    // delete object
    let res = null;
    try {
        res = await fetch(url, getDELETEParams())
        res = await res.json()
        return res
    } catch (err) {
        console.log("DELETE Error:", err);
    }
}

async function getNewToken(url) {
    // get list of items
    let res = null;
    try {
        await fetch(url, getRefreshParams())
        res = await res.json()
        return res
    } catch (err) {
        console.log("GET Error:", err);
        return err
    }
}

export { 
    makeNewPost, 
    getObject, 
    patch, 
    deleteObject,
    getNewToken
}