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
}, { timestamps: true });

subscriberSchema.virtual("subscriberAge").get(function() {
  const now = new Date();
  const createdAt = this.createdAt;
  const timeDifference = now - createdAt;
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
});

subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode} Vip: ${this.vip}`;
};

export const Subscriber = mongoose.model("Subscriber", subscriberSchema);