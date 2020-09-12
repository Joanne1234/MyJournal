const express = require("express")
const router = express.Router();
const {verify} = require("./verify");
const User = require("../models/User");
const functions = require('./helper');
const Mood = require("../models/Mood");

// On mood tracking page
router.get("/",  verify, async (req, res) => {
    // get all moods from all journal entries, reflections etc.
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const moods = currentUser.mood
        res.json(moods);
    } catch(err) {
        res.json({message: err});
    }
});

// looking at a specific mood entry
router.get('/:moodId', verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const moods = currentUser.mood
        const specificMood = functions.getObject(req.params.moodId, moods)
        res.json(specificMood);
    } catch (err) {
        res.json({message: err});
    }
});


// add new mood entry
router.post("/", verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        // create new mood entry
        const newMood = new Mood({
            scale: req.body.post.scale
        })
        // add to list and save
        currentUser.mood.push(newMood)
        currentUser.save()
        res.json(newMood);
    } catch(err) {
        res.json({message: err});
    }
});

// update mood
router.patch('/:moodId', verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const moods = currentUser.mood
        const specificMood = functions.getObject(req.params.moodId, moods)
        if (specificMood === null) {
            res.json("Mood Entry not found")
        } 
        // update information and save
        if (req.body.post.scale) {
            specificMood.scale = req.body.post.scale
        }
        currentUser.save()
        res.json(specificMood);
    } catch(err) {
        res.json({message: err});
    }
});

module.exports = router;
