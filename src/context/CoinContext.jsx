import React, { useEffect, useState, createContext } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoins, setAllCoins] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$",
    });

    const fetchAllCoin = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": "CG-YoGaxZa7pATJ8soCtEmneB6E",
            },
        };

        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
                options
            );
            const data = await response.json();
            setAllCoins(data);  // Set the fetched data into state
        } catch (err) {
            console.error("Error fetching data:", err);  // Log the error if fetching fails
        }
    };

    useEffect(() => {
        fetchAllCoin();
    }, [currency]);  // Run fetchAllCoin whenever the currency changes

    const contextValue = {
        allCoins,
        currency,
        setCurrency,
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
