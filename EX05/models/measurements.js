import mongoose from "mongoose";
const Schema = mongoose.Schema

const measurementSchema = new Schema({
    measurements: [Number]
})
