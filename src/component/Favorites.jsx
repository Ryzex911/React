import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Favorite.css";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [coinData, setCoinData] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);

        const fetchCoinDetails = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${storedFavorites.join(",")}`);
                const data = await response.json();
                setCoinData(data);
            } catch (error) {
                console.error("Error fetching coin data:", error);
            }
        };

        if (storedFavorites.length > 0) {
            fetchCoinDetails();
        }
    }, []);

    const handleRemoveFavorite = (coinID) => {
        const updatedFavorites = [...favorites.filter(id => id !== coinID)];
        setFavorites(updatedFavorites);

        const updatedCoinData = [...coinData.filter(coin => coin.id !== coinID)];
        setCoinData(updatedCoinData);

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="favorites">
            <h1>⭐ My Favorite Coins</h1>
            {favorites.length === 0 ? (
                <p>You havebt added any favorite coins yet.</p>
            ) : (
                <ul className="favorites-list">
                    {coinData.map((coin) => (
                        <li key={coin.id} className="favorite-item">
                            <div className="coin-info">
                                <img src={coin.image} alt={coin.name} className="coin-image" />
                                <div className="coin-details">
                                    <Link to={`/coin/${coin.id}`} className="coin-link">
                                        <span className="coin-name">{coin.name}</span>
                                        <span className="coin-symbol">({coin.symbol.toUpperCase()})</span>
                                    </Link>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveFavorite(coin.id)}
                                className="remove-btn">
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Favorites;
