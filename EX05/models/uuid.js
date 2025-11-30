import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"
const Schema = mongoose.Schema

const measurementSchema = new Schema({
    measurements: [Number]
})

const uuidSchema = new Schema({
    uuid: {
        type: String,
        default: uuidv4
    },
    measurements: measurementSchema
})

export const Uuid = mongoose.model("Uuid", uuidSchema)
