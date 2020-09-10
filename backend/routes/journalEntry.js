const express = require("express")
const router = express.Router();
const verify = require("./verify");
const JournalEntry = require("../models/JournalEntry");
const User = require("../models/User");
const functions = require('./helper');
const Mood = require("../models/Mood");

// On journal entry page
router.get("/",  verify, async (req, res) => {
    // get all journal entries
    console.log("getting journal entries")
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const journals = currentUser.journalEntries
        res.json(journals);
    } catch(err) {
        res.json({message: err});
    }
});

// looking at a specific journal entry
router.get('/:journalId', verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const journals = currentUser.journalEntries
        const specificJournal = functions.getObject(req.params.journalId, journals)
        res.json(specificJournal);
    } catch (err) {
        res.json({message: err});
    }
});


// add new journal entry
router.post("/", verify, async (req, res) => {
    try {
        console.log("finding user:", req.user._id)
        const currentUser = await User.findOne({ _id: req.user._id });
        console.log(currentUser)
        // create new journal entry
        const mood = new Mood({
            scale: req.body.post.scale
        })
        console.log(mood)
        console.log(req.body)
        const newJournal = new JournalEntry({
            title: req.body.post.title,
            entry: req.body.post.entry,
            positives: req.body.post.positives,
            mood: mood
        });
        console.log("here")
        // save new journal to database
        currentUser.journalEntries.push(newJournal)
        currentUser.mood.push(mood)
        currentUser.save()
        console.log(currentUser)
        res.json(newJournal);
    } catch(err) {
        res.json({message: err});
    }
});

// delete journal
router.delete('/:journalId', verify, async (req, res) => {
    try{
        const currentUser = await User.findOne({ _id: req.user._id });
        const journals = currentUser.journalEntries
        // find journal and remove from list of journals
        const specificJournal = functions.getObject(req.params.journalId, journals)
        journals.pull(specificJournal)
        currentUser.save()
        res.json(journals);
    } catch(err) {
        res.json({message: err});
    }
})

// update journal
router.patch('/:journalId', verify, async (req, res) => {
    try{
        const currentUser = await User.findOne({ _id: req.user._id });
        const journals = currentUser.journalEntries
        const specificJournal = functions.getObject(req.params.journalId, journals)
        if (specificJournal === null) {
            res.json("Journal Entry not found")
        } 
        // update information
        if (req.body.post) {
            mood = new Mood({scale: req.body.post.scale})
            specificJournal.title = req.body.post.title
            specificJournal.entry = req.body.post.entry,
            specificJournal.positives = req.body.post.positives,
            specificJournal.mood = mood
        }
        currentUser.save()
        res.json(specificJournal);
    } catch(err) {
        res.json({message: err});
    }
});

module.exports = router;
