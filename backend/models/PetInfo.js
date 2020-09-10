const mongoose = require("mongoose");

const PetInfoSchema = new mongoose.Schema({
    name:{ 
        type: String, 
        required: true, 
        max: 255, 
        min: 2 
    },

    level: {
        type: Number,
        default: 1,
        min: 1,
        max: 100
    },

    overallFoodIntake: {
        type: Number,
        default: 0,
        min: 0,
        max: 10000
    },
    
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("PetInfoSchema", PetInfoSchema);
module.exports.actual_model = PetInfoSchema;
