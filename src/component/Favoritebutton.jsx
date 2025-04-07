import React, { useState, useEffect } from "react";

const FavoriteButton = ({ coinID }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.includes(coinID));
    }, [coinID]);

    const toggleFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favorites.includes(coinID)) {
            favorites = favorites.filter(id => id !== coinID); // Remove if already favorite
        } else {
            favorites.push(coinID); // Add to favorites
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <button onClick={toggleFavorite} className={`favorite-btn ${isFavorite ? 'favorite' : ''}`}>
            {isFavorite ? "★ Favoriet" : "☆ Favoriet"}
        </button>
    );
};

export default FavoriteButton;
