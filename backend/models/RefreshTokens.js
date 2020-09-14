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
        index: {expires: '86400s'}
    }
});

module.exports = mongoose.model("RefreshTokens", RefreshTokensSchema);
