import React, { useState } from "react";
import "./AddNotes.css"

const AddNote = ({ closeAddNote, handleAddNote }) => {
    const [formData, setFormData] = useState({
        title: '',
        note: '',
        category: ''
    });

    function handleInput(field, event) {
        setFormData({ ...formData, [field]: event.target.value });
    }

    async function sendNote() {
        const apiData = {
            title: formData.title,
            note: formData.note,
            category: formData.category,
        };

        if (!apiData.title && !apiData.note && !apiData.category) {
            return;
        }

        await handleAddNote(apiData);

        setFormData({ title: '', note: '', category: '' });
        closeAddNote();
    }

    return (
        <div className="add-note">
            <button className="cancel-btn" onClick={closeAddNote}>✖</button>
            <p className="addNote-heading">Add a New Note</p>
            <input
                onChange={(e) => handleInput('title', e)}
                value={formData.title}
                type="text"
                placeholder="Title"
                className="title-input"
            />
            <textarea
                onChange={(e) => handleInput('note', e)}
                value={formData.note}
                placeholder="Note"
                className="note-input"
            ></textarea>
            <input
                onChange={(e) => handleInput('category', e)}
                value={formData.category}
                type="text"
                placeholder="Category"
                className="category-input"
            />
            <button type="submit" onClick={sendNote} className="createNote-btn">
                Create Note
            </button>
        </div>
    );
};

export default AddNote;
