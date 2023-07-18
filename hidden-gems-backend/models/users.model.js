const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Treasure = require("../models/treasures.model");

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        gender: {
            type: String,
            required: true,
            trim: true,
            enum: ["male", "female"],
        },
        imagelink: {
            type: String,
            trim: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isOnline: {
            type: Boolean,
            default: false,
        },

        location: {
            type: {
                type: String,
                enum: ["Point"],
            },
            coordinates: {
                type: [Number],
                default: null,
            },
        },
        treasureList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Treasure",
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", userSchema);

module.exports = User;
