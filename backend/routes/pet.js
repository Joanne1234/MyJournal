const express = require("express")
const router = express.Router();
const {verify} = require("./verify");
const User = require("../models/User");
const {
    getPetInfo, 
    getTotalPoints, 
    checkLevelUp,
    updatePetHealth,
    petBasicRevive,
    petFullRevive
} = require('./helper');

// On pet page
router.get("/",  verify, async (req, res) => {
    // get all pet info etc.
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const pet = currentUser.petInfo
        const petInfo = getPetInfo(pet)
        res.json(petInfo);
    } catch(err) {
        res.json({message: err});
    }
});

// feed pet
router.post("/", verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const pet = currentUser.petInfo
        updatePetHealth(pet)
        // check valid amount of food (can't be more than user's points)
        // get amount of 'food' to feed
        var food = req.body.post.food
        const totalPoints = getTotalPoints(currentUser)
        if (food + pet.overallFoodIntake > totalPoints) {
            food = totalPoints - pet.overallFoodIntake
            if (food < 0) {
                food = 0
            }
        }
        pet.overallFoodIntake += food
        // cap health bar at 120
        pet.health += food
        if (pet.health > 120) {
            pet.health = 120
        }
        // check if pet has enough 'food' to level up
        while (checkLevelUp(pet.overallFoodIntake, pet.level)) {
            pet.level += 1;
        }
        // update last fed field
        pet.lastFed = Date.now()
        // feed pet and save
        const petInfo = getPetInfo(pet)
        currentUser.save()
        res.json(petInfo);
    } catch(err) {
        res.json({message: err});
    }
});

// feed pet
router.post("/revive", verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const pet = currentUser.petInfo
        console.log(pet)
        var petInfo = null
        if (req.body.post) {
            if (req.body.post.revive == true) {
                petInfo = petFullRevive(pet)
            } else {
                currentUser.deletedPoints += pet.overallFoodIntake
                petInfo = petBasicRevive(pet)
            }
        } 
        currentUser.save()
        res.json(petInfo);
    } catch(err) {
        res.json({message: err});
    }
});

module.exports = router;
