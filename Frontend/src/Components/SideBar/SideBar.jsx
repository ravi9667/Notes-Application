import React, { useEffect, useState } from "react";
import categoryIcon from"../../assets/note.png"
import "./SideBar.css";

const SideBar = ({ notesList = [], selectedCategory, onSelectCategory }) => {
    const [categories, setCategories] = useState(["All Notes"]);

    useEffect(() => {
        const cats = notesList
            .map(note => note.category)
            .filter(c => c && c.trim() !== "");

        const uniqueCats = Array.from(new Set(cats));
        setCategories(["All Notes", ...uniqueCats]);
    }, [notesList]);

    useEffect(() => {
        const hasCategoryNotes = notesList.some(note =>
            selectedCategory === "All Notes" || note.category === selectedCategory
        );

        if (!hasCategoryNotes) {
            onSelectCategory("All Notes");
        }
    }, [notesList, selectedCategory, onSelectCategory]);

    return (
        <div className="sidebar-container">
            <p className="category-heading">
                <img src={categoryIcon} width={30} className="category-img" alt="" /> Categories
            </p>
            <div className="All-categories">
                {categories.map((cat) => (
                    <p
                        key={cat}
                        className={`category ${cat === selectedCategory ? "active-category" : ""}`}
                        onClick={() => onSelectCategory(cat)}
                        style={{ cursor: "pointer" }}
                        tabIndex="0"
                    >
                        {cat}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
