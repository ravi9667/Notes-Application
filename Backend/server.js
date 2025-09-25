import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { NotesData } from './models/Notes-info.js';

mongoose.connect('mongodb://localhost:27017/local')
const app = express();

app.use(cors());
app.use(express.json());

const port = 6060;
const hostName = '127.0.0.1';

app.get("/", (req, res) => {
    res.send("Hello Backend")
});

app.post("/addNotesData", async (req, res) => {
    try {
        const {title, note, category, uniqueKey} = req.body;

        const addNotesData = {
            title,
            note,
            category,
            uniqueKey
        }
        const newNoteTest = await NotesData.create(addNotesData);
        console.log(newNoteTest)
        const data = await NotesData.find();

        res.status(200).send({
            ok: true,
            message: "Notes Added Successfully",
            data: data
        })
        
    } catch(err) {
        console.log(`error - ${err}`);
        res.send({
            ok: false,
            message: err
        })
    }
});

app.get("/fetchAllNotes", async (req, res) => {
    try {
        const notesData = await NotesData.find();
        res.status(200).send({
            ok: true,
            data: notesData
        });
    } catch(error) {
        console.log(`Allnotes error - ${error}`);
        res.send({
            ok: false,
            message: error
        });
    }
});


app.delete("/deleteNote", async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).send({
                ok: false,
                error: "_id is required"
            });
        }

        // Optional: Validate if _id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send({
                ok: false,
                error: "Invalid _id format"
            });
        }

        const deletedNote = await NotesData.findByIdAndDelete(_id);

        if (!deletedNote) {
            return res.status(404).send({
                ok: false,
                error: "Note not found"
            });
        }

        const remainingNotes = await NotesData.find();

        res.status(200).send({
            ok: true,
            message: "Note deleted successfully",
            data: remainingNotes
        });

    } catch (err) {
        console.error("Error deleting note:", err);
        res.status(500).send({
            ok: false,
            error: `Internal server error: ${err.message}`
        });
    }
});


app.listen(port, hostName, () => {
    console.log(`Server is running on http://${hostName}:${port}`)
});





// fetchNotes ->
// response -> 
// {
//     ok: true,
//     notes: [
//         {},
//         {}
//     ],
//     categories: [
//         personal,
//     ]
// }