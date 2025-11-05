"use strict";
import mongoose from "mongoose";

const { Schema } = mongoose;

const subscriberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    vip: Boolean
});

export const Subscriber = mongoose.model("Subscriber", subscriberSchema);