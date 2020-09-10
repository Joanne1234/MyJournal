require('dotenv').config()

const router = require("express").Router();
const User = require("../models/User");
const myValidSchemas = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verify");

// Validation

router.post("/register", async (req, res) => {
    // Validate data
    
    const { error } = myValidSchemas.RegisterationValidation.validate(req.body);

    if (error) return res.status(400).send("Invalid Details");

    // Check if user exists in the data base

    const EmailExists = await User.findOne({ email: req.body.email });

    if (EmailExists) {
        return res.status(400).send("Email already exists");
    }

    // Hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Save to data base

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        user.save();
        const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
        return res
            .status(200)
            .set("auth-token", token)
            .send(token);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/login", async (req, res) => {
    const { error } = myValidSchemas.LogInValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });

    // check user email exists
    if (!user) {
        return res.status(400).send("Cannot find email");
    }

    // check password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(500).send("Invalid Password");

    // create and assign token
    try {
        const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);

        return res
            .status(200)
            .set("auth-token", token)
            .send(token);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.get("/:userId", verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        res.json(currentUser);
    } catch(err) {
        res.json({message: err});
    }
});

module.exports = router;
