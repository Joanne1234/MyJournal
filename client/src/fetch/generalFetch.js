import { 
    getPOSTParams, 
    getGETParams, 
    getPATCHParams, 
    getDELETEParams,
} from './params'

async function makeNewPost(url, post) {
    // get list of items
    let res = null;
    try {
        console.log(url, post)
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
        console.log("getting object", url)
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

export { 
    makeNewPost, 
    getObject, 
    patch, 
    deleteObject
}