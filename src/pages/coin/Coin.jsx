import React, { useContext, useState, useEffect } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../component/LineChart/LineChart';
import FavoriteButton from '../../component/Favoritebutton.jsx';

const Coin = () => {
    const { coinID } = useParams();
    const { currency } = useContext(CoinContext);
    const [coinData, setCoinData] = useState(null);
    const [historicalData, setHistoricalData] = useState(null);

    const fetchCoinData = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinID}`, {
                method: 'GET',
                headers: { accept: 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setCoinData(data);
        } catch (err) {
            console.error('Error fetching coin data:', err);
        }
    };

    const fetchHistoricalData = async () => {
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
                { method: 'GET', headers: { accept: 'application/json' } }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setHistoricalData(data);
        } catch (err) {
            console.error('Error fetching historical data:', err);
        }
    };

    useEffect(() => {
        if (coinID) {
            fetchCoinData();
            fetchHistoricalData();
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
                    <div className="coin-chart">
                        {historicalData ? (
                            <LineChart historicalData={historicalData} />
                        ) : (
                            <p>Loading chart...</p>
                        )}
                    </div>

                    <div className="coin-info">
                        <ul>
                            <li>Crypto Market Rank</li>
                            <li>{coinData.market_cap_rank}</li>
                        </ul>
                        <ul>
                            <li>Current Price</li>
                            <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
                        </ul>
                        <ul>
                            <li>Market cap</li>
                            <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
                        </ul>
                        <ul>
                            <li>24 Hour high</li>
                            <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
                        </ul>
                        <ul>
                            <li>24 Hour low</li>
                            <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
                        </ul>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
            <div className="coin-name">
                <img src={coinData?.image?.large} alt={coinData?.name} />
                <h1>{coinData?.name}</h1>
                <FavoriteButton coinID={coinID} />
            </div>
        </div>
    );
};

export default Coin;
