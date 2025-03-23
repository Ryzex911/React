import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
    const [data, setData] = useState([["Date", "Prices"]]);

    useEffect(() => {
        let dataCopy = [["Date", "Prices"]];

        if (historicalData?.prices) {
            historicalData.prices.forEach((item) => {
                dataCopy.push([
                    new Date(item[0]).toLocaleDateString(), // Ensure date format is valid
                    item[1] // Ensure price is a number
                ]);
            });

            setData(dataCopy);
        }
    }, [historicalData]);

    return (
        <Chart
            chartType="LineChart" // Ensure correct prop name (chartType, not charttype)
            data={data}
            width="100%"
            height="400px"
            options={{
                legend: { position: "bottom" },
                hAxis: { title: "Date" },
                vAxis: { title: "Price" },
            }}
        />
    );
};

export default LineChart;
