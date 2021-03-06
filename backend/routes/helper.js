// find object in array of objects given object id
function getObject(objectId, objects) {
    for (num in objects) {
        if (objectId == objects[num]._id) {
            return objects[num]
        }
    }
    return null
}

// get total points given a list of objects with attribute points
function getPoints(objects) {
    points = 0
    for (num in objects) {
        points += objects[num].points
    }
    return points
}

// filter unnecessary user information and return
function getUserInfo (user) {
    const remainingPoints = getRemainingPoints(user)
    const userInfo = {
        name: user.name,
        email: user.email,
        journalEntries: user.journalEntries,
        reflectionEntries: user.reflectionEntries,
        mood: user.mood,
        misc: user.misc,
        pet: getPetInfo(user.petInfo),
        remainingPoints: remainingPoints
    }
    return userInfo
}

// find difference in days between 2 dates
function differenceInDays(day1, day2) {
    const date1 = new Date (day1)
    const date2 = new Date (day2)
    return Math.round(Math.abs(date1 - date2) / (1000 * 3600 * 24))
}

// calculate all points given user
function getTotalPoints(user) {
    var points = 0
    if (user) {
        points += getPoints(user.journalEntries)
        points += getPoints(user.reflectionEntries)
        points += user.deletedPoints
        points += getPoints(user.mood)
        points += getPoints(user.misc)
    }
   return points
}

// calculate points left (earned but not fed to pet)
function getRemainingPoints(user) {
    const total = getTotalPoints(user);
    const pet = user.petInfo
    const userFedToPet = pet.overallFoodIntake
    const remaining = total - userFedToPet
    return remaining
}

// filter unnecessary pet information and return extra information
function getPetInfo(pet) {
    const foodRequiredToLevelUp = checkFoodLeft(pet.overallFoodIntake, pet.level)
    const petHealth = updatePetHealth(pet)
    if (petHealth) {
        return petHealth
    }
    const petInfo = {
        name: pet.name,
        level: pet.level,
        overallFoodIntake: pet.overallFoodIntake,
        foodRequiredToLevelUp: foodRequiredToLevelUp,
        health: pet.health,
        born: pet.dateCreated
    }
    return petInfo
}

function updatePetHealth (pet) {
    const dailyIntake = checkDailyIntake(pet.level)
    const health = pet.health
    const petHealth = health - dailyIntake*differenceInDays(pet.lastFed, Date.now())
   // update health of pet
    pet.health = petHealth
    if (pet.health <= 0) {
        pet.health = 0
        return petDie(pet)
    }
    return null
}

// if health reaches 0, pet will die/revert to level 0
function petDie (pet) {
    const petInfo = {
        name: pet.name,
        level: 0,
        overallFoodIntake: 0,
        foodRequiredToLevelUp: checkFoodLeft(0, 0),
        health: pet.health
    }
    return petInfo
}

// full revival of pet
function petFullRevive (pet) {
    pet.health = 10
    const petInfo = {
        name: pet.name,
        level: pet.level,
        overallFoodIntake: pet.overallFoodIntake,
        foodRequiredToLevelUp: checkFoodLeft(pet.overallFoodIntake, pet.level),
        health: pet.health
    }
    return petInfo
}
// basic revival of pet
function petBasicRevive (pet) {
    pet.level = 0
    pet.overallFoodIntake = 0
    pet.health = 5
    const petInfo = {
        name: pet.name,
        level: pet.level,
        overallFoodIntake: pet.overallFoodIntake,
        foodRequiredToLevelUp: checkFoodLeft(pet.overallFoodIntake, pet.level),
        health: pet.health
    }
    return petInfo
}

// level up system
// check if pet can level up yet depending on how much food they have
function checkLevelUp (petFoodIntake, currentLevel) {
    if (checkFoodLeft (petFoodIntake, currentLevel) <= 0) {
        return true
    }
    return false
}
// check how much more 'food' needed to level up
function checkFoodLeft (petFoodIntake, currentLevel) {
    const foodRequired = 10*currentLevel + Math.pow(currentLevel, 3)
    return foodRequired - petFoodIntake
}

// check daily intake required for the pet to live and be healthy
function checkDailyIntake (currentLevel) {
    return Math.round(currentLevel*0.5)
}

// wrapper function to expand 'mood' in journal entry
function getJournalInfo (journal, moods) {
    const mood = getObject(journal.mood, moods)
    const journalInfo = {
        title: journal.title,
        entry: journal. entry,
        positives: journal.positives,
        mood: mood,
        points: journal.points,
        dateCreated: journal.dateCreated,
        _id: journal._id
    }
    return journalInfo
}

// wrapper function to expand 'mood' in reflection entry
function getReflectionInfo (reflection, moods) {
    const moodBefore = getObject(reflection.feelings.before, moods)
    const moodDuring = getObject(reflection.feelings.during, moods)
    const moodAfter = getObject(reflection.feelings.after, moods)
    const reflectionInfo = {
        event: reflection.event,
        description: reflection. description,
        learnt: reflection.learnt,
        feelings: {
            moodBefore: moodBefore,
            moodDuring: moodDuring,
            moodAfter: moodAfter
        },
        evaluation: reflection.evaluation,
        analysis: reflection.analysis,
        conclusion: reflection.conclusion,
        actionPlan: reflection.actionPlan,
        points: reflection.points,
        dateCreated: reflection.dateCreated,
        _id: reflection._id
    }
    return reflectionInfo
}

module.exports = {
    getObject, 
    getPoints, 
    differenceInDays, 
    getTotalPoints, 
    getRemainingPoints,
    getPetInfo,
    checkLevelUp,
    getUserInfo,
    updatePetHealth,
    petBasicRevive,
    petFullRevive,
    getJournalInfo,
    getReflectionInfo
};
