const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const treasureSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        riddle: {
            type: String,
            required: true,
        },

        code: {
            type: String,
            required: true,
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
        radius: {
            type: Number,
            required: true,
        },
        reward: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: ["hidden", "active", "claimed"],
            default: "active",
        },
    },
    { timestamps: true }
);

treasureSchema.index({ location: "2dsphere" });

const Treasure = mongoose.model("Treasure", treasureSchema);

module.exports = Treasure;
