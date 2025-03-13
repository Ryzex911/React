import React, { useContext, useEffect } from 'react';
import './home.css';
import { CoinContext } from "../../context/CoinContext.jsx";

const Home = () => {
    const { allCoin, currency } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = React.useState([]);

    useEffect(() => {
        if (Array.isArray(allCoin)) {
            setDisplayCoin(allCoin);
        }
    }, [allCoin, currency]);

    return (
        <div className='home'>
            <div className='hero'>
                <h1>Welcome <br /> to CryptoDashboard</h1>
                <p>The best place to see and inspect cryptocurrencies</p>
                <form>
                    <input type="text" placeholder="Search" />
                    <button type="submit">Search</button>
                </form>
            </div>

            <div className='crypto-table'>
                <div className='table-layout'>
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{ textAlign: "center" }}>24H Change</p>
                    <p className='market-cap'>Market Cap</p>
                </div>

                {
                    Array.isArray(displayCoin) && displayCoin.length > 0 ? (
                        displayCoin.slice(0, 10).map((item, index) => (
                            <div className='table-layout' key={index}>
                                <p>{item.market_cap_rank}</p>
                                <p>{item.name}</p>
                                <p>{item.current_price}</p>
                                <p>{item.price_change_percentage_24h}</p>
                                <p>{item.market_cap}</p>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>  // Show loading message if displayCoin is not populated
                    )
                }
            </div>
        </div>
    );
}

export default Home;
