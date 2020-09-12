const mongoose = require("mongoose");

const PetInfoSchema = new mongoose.Schema({
    name: { 
        type: String, 
        default: "Rocky", 
        max: 255, 
        min: 2 
    },

    health: {
        type: Number,
        default: 100,
        min: 0,
        max: 120
    },

    level: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    overallFoodIntake: {
        type: Number,
        default: 0,
        min: 0,
        max: 10000
    },

    lastFed: {
        type: Date,
        default: Date.now
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("PetInfoSchema", PetInfoSchema);
module.exports.actual_model = PetInfoSchema;
