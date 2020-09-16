const express = require("express")
const router = express.Router();
const {verify} = require("./verify");
const User = require("../models/User");
const functions = require('./helper');
const Mood = require("../models/Mood");
const myValidSchemas = require("../validation");
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
    // basic field validation
    const { error } = myValidSchemas.MoodValidation.validate(req.body.post);
    if (error) return res.status(400).send({msg: error.details[0].message});
    
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        // create new mood entry
        const newMood = new Mood({
            scale: req.body.post.mood,
            comments: req.body.post.comments
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
    // basic field validation
    const { error } = myValidSchemas.Validation.validate(req.body.post);
    if (error) return res.status(400).send({msg: error.details[0].message});
    try {
        // find mood instance
        const currentUser = await User.findOne({ _id: req.user._id });
        const moods = currentUser.mood
        const specificMood = functions.getObject(req.params.moodId, moods)
        if (specificMood === null) {
            res.json("Mood Entry not found")
        } 
        // update information and save
        if (req.body.post.mood) {
            specificMood.scale = req.body.post.mood
            specificMood.comments = req.body.post.comments
        }
        currentUser.save()
        res.json(specificMood);
    } catch(err) {
        res.json({message: err});
    }
});

module.exports = router;
