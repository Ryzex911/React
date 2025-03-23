import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import { CoinContext } from '../../context/CoinContext.jsx';
import { Link } from 'react-router-dom';
import FavoriteButton from '../../component/favoritebutton.jsx';
const Home = () => {
    const { allCoins, currency } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const coinsPerPage = 20;

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!input.trim()) {
            setDisplayCoin(allCoins.slice(0, coinsPerPage)); // Reset when input is empty
            setCurrentPage(1);  // Reset page to 1
            return;
        }
        const coins = allCoins.filter((item) =>
            item.name.toLowerCase().includes(input.toLowerCase())
        );
        setDisplayCoin(coins.slice(0, coinsPerPage));
        setCurrentPage(1);  // Reset to first page for search results
    };

    useEffect(() => {
        if (allCoins && allCoins.length > 0) {
            setDisplayCoin(allCoins.slice((currentPage - 1) * coinsPerPage, currentPage * coinsPerPage));
        }
    }, [allCoins, currentPage, currency]);

    // Handle Next Page
    const handleNextPage = () => {
        if ((currentPage * coinsPerPage) < allCoins.length) {
            setCurrentPage(prevPage => prevPage + 1);
        } else {
            console.log("No more coins to load.");
        }
    };

    // Handle Previous Page
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="home">
            <div className="hero">
                <h1>Welcome <br /> to CryptoDashboard</h1>
                <p>The best place to see and inspect cryptocurrencies</p>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleInputChange}
                        value={input}
                        type="text"
                        placeholder="Search"
                        required
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{ textAlign: 'center' }}>24H Change</p>
                    <p className="market-cap">Market Cap</p>
                    <p className="favo-text">Favorite</p> {/* New Column for Favorite Button */}
                </div>

                {displayCoin.length > 0 ? (
                    displayCoin.map((item, index) => (
                        <div className="table-layout" key={index}>
                            <p>{item.market_cap_rank}</p>
                            <div className="coin-details">
                                <Link to={`/coin/${item.id}`}>
                                    <img src={item.image} alt={item.name} />
                                    <p>{item.name} - {item.symbol}</p>
                                </Link>
                            </div>
                            <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                            <p className={item.price_change_percentage_24h > 0 ? 'green' : 'red'}>
                                {Math.floor(item.price_change_percentage_24h * 100) / 100}%
                            </p>
                            <p className="market-cap">{currency.symbol} {item.market_cap.toLocaleString()}</p>
                            {/* Add FavoriteButton component */}
                            <div className="favorite-container">
                                <FavoriteButton coinID={item.id} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '20px' }}>No results found.</p>
                )}
            </div>


            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage} disabled={(currentPage * coinsPerPage) >= allCoins.length}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
