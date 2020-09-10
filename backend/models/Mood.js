const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({

    scale: {
        type: Number,
        required: true,
        min: -1,
        max: 10
    },

    points: {
        type: Number,
        default: 5
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("MoodSchema", MoodSchema);
module.exports.actual_model = MoodSchema;
