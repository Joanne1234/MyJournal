function getObject(objectId, objects) {
    for (num in objects) {
        if (objectId == objects[num]._id) {
            return objects[num]
        }
    }
    return null
}


function getPoints(objects) {
    points = 0
    for (num in objects) {
        points += objects[num].points
    }
    return points
}

module.exports = {getObject, getPoints};
