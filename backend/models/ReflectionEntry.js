const mongoose = require("mongoose");

const ReflectionEntrySchema = new mongoose.Schema({
    event:{ 
        type: String, 
        required: true, 
        max: 255, 
        min: 2 
    },

    description: {
        type: String,
        required: true,
        min: 2,
        max: 1024
    },
    
    // corresponding ids of moods
    feelings: {
        before: {type: String, required: true},
        during: {type: String, required: true},
        after: {type: String, required: true}
    },

    evaluation: {
        type: String,
        required: false,
        min: 2,
        max: 1024
    },

    actions: {
        type: String,
        required: false,
        min: 2,
        max: 1024
    },

    conclusion: {
        type: String,
        required: false,
        min: 2,
        max: 1024
    },

    actionPlan: {
        type: String,
        required: false,
        min: 2,
        max: 1024
    },

    learnt: {
        type: String,
        required: true,
        min: 2,
        max: 1024
    },

    points: {
        type: Number,
        default: 20
    },
    
    extended: {
        type: Boolean,
        default: false
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("ReflectionEntrySchema", ReflectionEntrySchema);
module.exports.actual_model = ReflectionEntrySchema;
