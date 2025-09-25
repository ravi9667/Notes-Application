import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true
    },
    note: {
        type: String,
        required: true,
        lowercase: true
    },
    category: {
        type: String,
        required: true,
        lowercase: true
    },
    uniqueKey: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const NotesData = mongoose.model("notesData", notesSchema);