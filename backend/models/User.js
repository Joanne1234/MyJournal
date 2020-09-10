const mongoose = require("mongoose");
const JournalEntry = require("./JournalEntry").actual_model;
const ReflectionEntry = require("./ReflectionEntry").actual_model;
const PetInfo = require("./PetInfo").actual_model;
const Mood = require("./Mood").actual_model;
const MISC = require("./MISC").actual_model;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },

    email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },

    // points/exp/food is collated through completing journal entries,
    // reflection writing, mood tracking and misc such as registration

    journalEntries: [JournalEntry],

    reflectionEntries: [ReflectionEntry],
    
    mood: [Mood],

    misc: [MISC],

    deletedPoints: {
        type: Number,
        default: 0,
        min: 0,
        max: 10000
    },

    // pet 'eats' the points/exp/food and slowly dies without it

    petInfo: PetInfo
    
});

module.exports = mongoose.model("User", userSchema);
