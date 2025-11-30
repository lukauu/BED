import mongoose from "mongoose"
const Schema = mongoose.Schema

const courseSchema = new Schema({
    title: String,
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ]
})

export const Course = mongoose.model("Course", courseSchema)

