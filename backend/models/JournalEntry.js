const mongoose = require("mongoose");
const Mood = require("./Mood").actual_model;

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
    feeling: Mood,
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
