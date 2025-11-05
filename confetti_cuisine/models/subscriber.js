"use strict";
import mongoose from "mongoose";

const { Schema } = mongoose;

const subscriberSchema = new Schema({
    name: String,
    email: String,
    zipCode: Number,
    streetAddress: String,
    vip: Boolean
});

export const Subscriber = mongoose.model("Subscriber", subscriberSchema);