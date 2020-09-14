const mongoose = require("mongoose");

const JournalEntrySchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        max: 255, 
        min: 2 
    },

    entry: {
        type: String,
        required: true,
        min: 2,
        max: 1024
    },
    positives: {
        type: String,
        required: true,
        min: 2,
        max: 1024
    },
    // id of corresponding mood
    mood: {
        type: String, 
        required: true
    },
    points: {
        type: Number,
        default: 10
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("JournalEntrySchema", JournalEntrySchema);
module.exports.actual_model = JournalEntrySchema;
