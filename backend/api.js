var router = require('express').Router();

// Import routes
const authRoute = require("./routes/auth");
const journalRoute = require("./routes/journalEntry");
const reflectionRoute = require("./routes/reflectionEntry");
const moodRoute = require("./routes/mood");
const petRoute = require("./routes/pet");
const miscRoute = require("./routes/misc")


// Route middlewares
router.use("/api/user", authRoute);
router.use("/api/journal", journalRoute);
router.use("/api/reflection", reflectionRoute);
router.use("/api/moods", moodRoute);
router.use("/api/pet", petRoute);
router.use("/api/misc", miscRoute);

router.use(/^((?!\/api\/).)*$/, function(req, res) { 
    res.sendStatus(500).end();
});

module.exports = router;