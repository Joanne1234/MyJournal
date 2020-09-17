require('dotenv').config()

const router = require("express").Router();
const User = require("../models/User");
const RefreshTokens = require("../models/RefreshTokens");
const myValidSchemas = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verify, verifyRefresh} = require("./verify");
const { getUserInfo } = require('./helper');
const PetInfo = require('../models/PetInfo');

const accessTokenLifetime = '45m'
const refreshTokenLifetime = '120m'

// Validation

router.post("/signup", async (req, res) => {
    // Validate data
    
    const { error } = myValidSchemas.RegisterationValidation.validate(req.body.post);

    if (error) return res.status(400).send({msg: error.details[0].message});

    // Check if user exists in the data base

    const EmailExists = await User.findOne({ email: req.body.post.email });

    if (EmailExists) {
        return res.status(400).send({msg: "Email already exists"});
    }

    // Hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.post.password, salt);

    // Save to data base

    const user = new User({
        name: req.body.post.name,
        email: req.body.post.email,
        password: hashedPassword,
        petInfo: new PetInfo()
    });

    try {
        // generate auth token and refresh token
        const authToken = jwt.sign({ _id: user._id }, 
            process.env.ACCESS_TOKEN_SECRET, 
            {expiresIn: accessTokenLifetime});
        const refreshToken = jwt.sign({_id: user._id}, 
            process.env.ACCESS_REFRESH_TOKEN, 
            {expiresIn: refreshTokenLifetime})
        const token = new RefreshTokens({token: refreshToken, user: user._id})
        token.save()
        user.save();
        return res
            .status(200)
            .set("auth-token", authToken)
            .set("refresh-token", refreshToken)
            .send({user, authToken, refreshToken});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/login", async (req, res) => {
    const { error } = myValidSchemas.LogInValidation.validate(req.body.post);
    if (error) return res.status(400).send({msg: error.details[0].message});

    const user = await User.findOne({ email: req.body.post.email });

    // check user email exists
    if (!user) {
        return res.status(400).send({msg: "Email does not exist"});
    }

    // check password is correct
    const validPass = await bcrypt.compare(req.body.post.password, user.password);
    if (!validPass) return res.status(500).send({msg: "Invalid Password"});

    // create and assign token
    try {
        const authToken = jwt.sign({ _id: user._id }, 
            process.env.ACCESS_TOKEN_SECRET, 
            {expiresIn: accessTokenLifetime});
        const refreshToken = jwt.sign({_iser:user._id}, 
            process.env.ACCESS_REFRESH_TOKEN, 
            {expiresIn: refreshTokenLifetime})
        const token = new RefreshTokens({token: refreshToken, user: user._id})
        token.save()
        user.save();
        return res
            .status(200)
            .set("auth-token", authToken)
            .set("refresh-token", refreshToken)
            .send({authToken, refreshToken});
    } catch (error) {
        return res.status(400).send({msg: error});
    }
});

router.patch("/details", verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const name = req.body.post.name
        const password = req.body.post.password
        if (name) {
            currentUser.name = name
        }
        if (password) {
            currentUser.password = password
        }
        currentUser.save()
        res.json(getUserInfo(currentUser));
    } catch(err) {
        res.json({message: err});
    }
})

router.post("/logout", verify, async (req, res) => {
    
    // remove all refresh tokens from user from list
    try {
        await RefreshTokens.deleteMany({user: req.user._id})
        return res
            .status(200)
            .set("auth-token", null)
            .send({msg: "Logged out"});
    } catch (error) {
        return res.status(400).send({msg: error});
    }
});

router.get("/", verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const userInfo = getUserInfo(currentUser)
        res.json(userInfo);
    } catch(err) {
        res.json({message: err}); 
    }
});

module.exports = router;
