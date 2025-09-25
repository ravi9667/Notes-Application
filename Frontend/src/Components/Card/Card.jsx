import React from "react";
import DeleteIcon from '../../assets/delete.png';
import './Card.css';

function Card({ title, note, createdAt, _id, handleDeleteNote }) {
    const date = new Date(createdAt);
    const formattedDate = date.toDateString();

    function toTitleCase(str) {
        if (!str || typeof str !== 'string') return '';
        return str.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <div className="card">
            <div className="text-container">
                <h1 className="card-title">{title ? toTitleCase(title) : 'Untitled'}</h1>
                <p className="card-note">{note}</p>
            </div>
            <div className="text-bottom">
                <p className="card-createdAt">{formattedDate}</p>
                <button className="delete-btn" onClick={() => handleDeleteNote(_id)}>
                    <img src={DeleteIcon} alt="Delete" width={20} height={20} />
                </button>
            </div>
        </div>
    );
}

export default Card;
