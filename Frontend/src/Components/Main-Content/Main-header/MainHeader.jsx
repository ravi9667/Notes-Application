import React, { useState } from "react";
import './mainHeader.css';
import AddNote from "../../AddNotes/AddNotes";

function MainHeader({ notesList, setNotesList, selectedCategory, handleAddNote  }) {

    if(selectedCategory === "All Notes") {
        selectedCategory = ""
    } else {
        selectedCategory = `/${selectedCategory}`
    }
    const [showAddNote, setShowAddNote] = useState(false);

    const handleClick = () => {
        setShowAddNote(true);
    };

    return (
        <div className="header-container">
            <p className="allNotes">
                All Notes <span className="categories">{selectedCategory}</span>
            </p>
            <button className="addNote-btn" onClick={handleClick}>+ Add Note</button>
            {showAddNote && (
                <AddNote
                    closeAddNote={() => setShowAddNote(false)}
                    notesList={notesList}
                    setNotesList={setNotesList}
                    handleAddNote={handleAddNote}
                />
            )}
        </div>
    );
}

export default MainHeader;
