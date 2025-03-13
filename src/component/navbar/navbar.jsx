import React, { useContext } from 'react';
import './navbar.css';
import logo from '/src/assets/logo.png';
import arrow_icon from '/src/assets/arrow_icon.png';
import { CoinContext } from "../../context/CoinContext.jsx"; // Corrected the import

const Navbar = () => {
    const { setCurrency } = useContext(CoinContext); // Fixed context import

    const currencyHandler = (event) => {
        switch(event.target.value){
            case "USD":
                setCurrency({ name: "usd", symbol: "$" });
                break;
            case "EUR": // Fixed value to EUR
                setCurrency({ name: "eur", symbol: "€" });
                break;
            default: // Fixed typo 'deafult' to 'default'
                setCurrency({ name: "usd", symbol: "$" }); // default to USD
                break;
        }
    };

    return (
        <div className="navbar">
            <img src={logo} alt="logo van pagina" className="logo"/>
            <ul>
                <li>Home</li>
                <li>Features</li>
                <li>Pricing</li>
                <li>Blog</li>
            </ul>
            <div className="navbar-right">
                <select onChange={currencyHandler}> {/* Fixed onChange */}
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option> {/* Corrected to EUR */}
                </select>
                <button>
                    Sign up <img src={arrow_icon} alt="arrow icon foto"/>
                </button>
            </div>
        </div>
    );
}

export default Navbar;
