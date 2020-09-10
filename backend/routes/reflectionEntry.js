const express = require("express")
const router = express.Router();
const verify = require("./verify");
const ReflectionEntry = require("../models/ReflectionEntry");
const User = require("../models/User");
const functions = require('./helper');
const Mood = require("../models/Mood");

// On reflection page
router.get("/",  verify, async (req, res) => {
    // get all reflection entries
    console.log("getting reflection entries")
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const reflections = currentUser.reflectionEntries
        res.json(reflections);
    } catch(err) {
        res.json({message: err});
    }
});

// looking at a specific reflection entry
router.get('/:reflectionId', verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const reflections = currentUser.reflectionEntries
        const specificReflection = functions.getObject(req.params.reflectionId, reflections)
        res.json(specificReflection);
    } catch (err) {
        res.json({message: err});
    }
});


// add new reflection entry
router.post("/", verify, async (req, res) => {
    try {
        console.log("finding user:", req.user._id)
        const currentUser = await User.findOne({ _id: req.user._id });
        console.log(currentUser)
        // create new reflection entry
        const moodBefore = new Mood({
            scale: req.body.post.scaleBefore
        })
        const moodDuring = new Mood({
            scale: req.body.post.scaleDuring
        })
        const moodAfter = new Mood({
            scale: req.body.post.scaleAfter
        })
        console.log(moodBefore)
        console.log(moodDuring)
        console.log(moodAfter)
        console.log(req.body)
        const newReflection = new ReflectionEntry({
            event: req.body.post.event,
            description: req.body.post.description,
            feelings: {
                before: moodBefore,
                during: moodDuring,
                after: moodAfter
            },
            learnt: req.body.post.learnt
        });
        // extra points if more detailed reflection is provided 
        if (req.body.post.extended === true) {
            newReflection.evaluation = true
            newReflection.evaluation = req.body.post.evaluation
            newReflection.analysis = req.body.post.analysis
            newReflection.conclusion = req.body.post.conclusion
            newReflection.actionPlan = req.body.post.actionPlan
            newReflection.points = newReflection.points*2
        }
        console.log(newReflection)
        console.log("here")
        // save new reflection to database
        currentUser.reflectionEntries.push(newReflection)
        currentUser.mood.push(moodBefore)
        currentUser.mood.push(moodDuring)
        currentUser.mood.push(moodAfter)
        currentUser.save()
        console.log(currentUser)
        res.json(newReflection);
    } catch(err) {
        res.json({message: err});
    }
});

// delete reflection
router.delete('/:reflectionId', verify, async (req, res) => {
    try{
        const currentUser = await User.findOne({ _id: req.user._id });
        const reflections = currentUser.reflectionEntries
        // find reflection and remove from list of reflections
        const specificReflection = functions.getObject(req.params.reflectionId, reflections)
        reflections.pull(specificReflection)
        currentUser.save()
        res.json(reflections);
    } catch(err) {
        res.json({message: err});
    }
})

// update reflection
router.patch('/:reflectionId', verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const reflections = currentUser.reflectionEntries
        const specificReflection = functions.getObject(req.params.reflectionId, reflections)
        console.log(specificReflection)
        if (specificReflection === null) {
            res.json("Reflection Entry not found")
        } 
        // update information
        if (req.body.post) {
            console.log("to update:")
            specificReflection.event = req.body.post.event
            specificReflection.description = req.body.post.description
            const moodBefore = new Mood({
                scale: req.body.post.scaleBefore
            })
            const moodDuring = new Mood({
                scale: req.body.post.scaleDuring
            })
            const moodAfter = new Mood({
                scale: req.body.post.scaleAfter
            })
            specificReflection.feelings = {
                    before: moodBefore,
                    during: moodDuring,
                    after: moodAfter
            }
            specificReflection.learnt = req.body.post.learnt
            console.log("here")
            // extra points if more detailed reflection is provided 
            if (req.body.post.extended) {
                specificReflection.evaluation = req.body.post.evaluation
                specificReflection.analysis = req.body.post.analysis
                specificReflection.conclusion = req.body.post.conclusion
                specificReflection.actionPlan = req.body.post.actionPlan
                if (specificReflection.extended == false) {
                    specificReflection.extended = true
                    specificReflection.points = 2*specificReflection.points
                }
            }
        }
        console.log(specificReflection)
        currentUser.save()
        res.json(specificReflection);
    } catch(err) {
        res.json({message: err});
    }
});

module.exports = router;
