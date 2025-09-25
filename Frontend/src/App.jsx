import React, { useEffect, useState } from 'react';
import "./App.css";
import SideBar from './Components/SideBar/SideBar';
import MainContent from './Components/Main-Content/MainContent';

function App() {
    const [notesList, setNotesList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All Notes");

    // Fetch notes from backend
    async function fetchNotes() {
        try {
            const res = await fetch("http://127.0.0.1:6060/fetchAllNotes");
            const json = await res.json();
            const data = json.data;

            if (!Array.isArray(data)) {
                throw new Error("Expected an array but got: " + JSON.stringify(data));
            }

            setNotesList(data);
        } catch (err) {
            console.error("Failed to fetch notes:", err);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    // Add a new note
    async function handleAddNote(noteData) {
        try {
            const response = await fetch("http://127.0.0.1:6060/addNotesData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(noteData)
            });

            const result = await response.json();
            alert(result?.message || "Note added");

            // Add to current list
            setNotesList(prev => [...prev, result]);
        } catch (error) {
            console.error("Failed to add note:", error);
        }
    }

    // Delete a note by _id
    async function handleDeleteNote(_id) {
        try {
            const response = await fetch("http://127.0.0.1:6060/deleteNote", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id })
            });

            const result = await response.json();

            if (result.ok) {
                setNotesList(prevNotes => {
                    const updated = prevNotes.filter(note => note._id !== _id);

                    // Handle case when no notes left in selected category
                    const remainingInCategory = updated.filter(note => 
                        selectedCategory === "All Notes" || note.category === selectedCategory
                    );

                    if (remainingInCategory.length === 0) {
                        setSelectedCategory("All Notes");
                    }

                    return updated;
                });
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Failed to delete note", error);
            alert("An error occurred while deleting the note.");
        }
    }

    return (
        <div className='container'>
            <SideBar
                notesList={notesList}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
            <MainContent
                notesList={notesList}
                selectedCategory={selectedCategory}
                handleAddNote={handleAddNote}
                handleDeleteNote={handleDeleteNote}
            />
        </div>
    );
}

export default App;
