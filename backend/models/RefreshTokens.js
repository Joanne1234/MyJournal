const mongoose = require("mongoose");

const RefreshTokensSchema = new mongoose.Schema({
    token:{ 
        type: String, 
        required: true, 
    },
    // store user id
    user: {
        type: String,
        required: true
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },
    // expires every 24hrs
    createdAt: {
        type: Date,
        default: Date.now,
        index: {expires: '86400s'}//86400,
    }
});

//RefreshTokensSchema.createIndex({createdAt: 1}, {expireAfterSeconds: 20})
module.exports = mongoose.model("RefreshTokens", RefreshTokensSchema);
