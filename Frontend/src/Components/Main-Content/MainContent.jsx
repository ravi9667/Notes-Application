import React from "react";
import './mainContent.css';
import MainHeader from "./Main-header/MainHeader";
import Card from "../Card/Card";

const MainContent = ({ notesList, selectedCategory, handleAddNote, handleDeleteNote }) => {
    const filteredNotes = notesList.filter(note => {
        if (selectedCategory === "All Notes") return true;
        return note.category === selectedCategory;
    });

    return (
        <div className="mainContent-container">
            <div className="notes-section">
                <MainHeader
                    handleAddNote={handleAddNote}
                />
                <div className="card-container">
                    {filteredNotes.map((card) => (
                        <Card
                            key={card._id}
                            _id={card._id}
                            title={card.title}
                            note={card.note}
                            createdAt={card.createdAt}
                            handleDeleteNote={handleDeleteNote}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainContent;
