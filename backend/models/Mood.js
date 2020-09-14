const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({

    scale: {
        type: Number,
        required: true,
        min: -1,
        max: 10
    },
    description: {
        type: String,
        default: null
    },
    parent: {
        journal: {
            type: Boolean,
            default: false
        },
        reflection: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            default: null
        }
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
