const mongoose = require("mongoose");

const MISCSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        max: 255, 
        min: 2 
    },

    points: {
        type: Number,
        default: 10,
        min: 1,
        max: 100
    },
    
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("MISCSchema", MISCSchema);
module.exports.actual_model = MISCSchema;
