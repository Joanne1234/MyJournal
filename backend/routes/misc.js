const express = require("express")
const router = express.Router();
const { verify } = require("./verify");
const User = require("../models/User");
const MISC = require("../models/MISC");
const { getObject } = require("./helper");

// On misc page
router.get("/",  verify, async (req, res) => {
    // get all misc rewards
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const miscs = currentUser.misc
        res.json(miscs);
    } catch(err) {
        res.json({message: err});
    }
});

// looking at a specific misc entry
router.get('/:miscId', verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const miscs = currentUser.misc
        const specificMisc = getObject(req.params.miscId, miscs)
        res.json(specificMisc);
    } catch (err) {
        res.json({message: err});
    }
});


// add new misc entry
router.post("/", verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        // create new misc entry
        const newMisc = new MISC({
            title: req.body.post.title,
            points: req.body.post.points,
        });
        currentUser.misc.push(newMisc)
        currentUser.save()
        res.json(newMisc);
    } catch(err) {
        res.json({message: err});
    }
});

// delete misc
router.delete('/:miscId', verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const miscs = currentUser.misc
        // find misc and remove from list of misc
        const specificMisc = getObject(req.params.miscId, miscs)
        miscs.pull(specificMisc)
        currentUser.deletedPoints += specificMisc.points
        currentUser.save()
        res.json(miscs);
    } catch(err) {
        res.json({message: err});
    }
})

module.exports = router;
