import React, { useContext, useState, useEffect } from 'react';
import './coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext'; // Corrected import

const Coin = () => {
    const { coinID } = useParams();
    const { currency } = useContext(CoinContext); // Make sure it's correctly destructured
    const [coinData, setCoinData] = useState();

    const fetchCoinData = async () => {
        const options = { method: 'GET', headers: { accept: 'application/json' } };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinID}`, options);
            const data = await response.json();
            setCoinData(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (coinID) {
            fetchCoinData();
        }
    }, [coinID, currency]);

    return (
        <div className="coin">
            {coinData ? (
                <>
                    <div className="coin-name">
                        <img src={coinData.image?.large} alt={coinData.name} />
                        <h1>{coinData.name}</h1>
                    </div>
                    <div className="coin-details">
                        <p>Current price: {currency.symbol}{coinData.market_data?.current_price[currency.name]}</p>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Coin;
