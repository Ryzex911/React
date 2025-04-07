import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Top10PieChart.css";

const COLORS = [
    "#FF5733", "#FFBD33", "#FFDA33", "#33FF57", "#33FFBD",
    "#33DAFF", "#3357FF", "#5733FF", "#BD33FF", "#FF33DA"
];

const Top10PieChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1")
            .then(res => res.json())
            .then(res => {
                const top10 = res.map(coin => ({
                    name: coin.name,
                    value: coin.market_cap,
                    symbol: coin.symbol,
                }));
                setData(top10);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="pie-chart-container">
            <h2 className="chart-title">Top 10 Crypto Coins by Market Cap</h2>
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={500}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={200}
                            dataKey="value"
                            isAnimationActive={true}
                            animationDuration={1000}
                            animationEasing="ease-in-out"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                            labelLine={{ stroke: "#fff" }} // Ensures labels stay visible
                            labelPosition="outside"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Top10PieChart;
