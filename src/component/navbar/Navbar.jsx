import React, { useContext } from 'react';
import './Navbar.css';
import logo from '/src/assets/logo.png';
import { CoinContext } from "../../context/CoinContext.jsx"; // Corrected the import
import { Link } from 'react-router-dom';

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
            <Link to={'/'}>
            <img src={logo} alt="logo van pagina" className="logo"/>
            </Link>

            <ul>
                <Link to={'/'}><li>Home</li></Link>
                <Link to="/favorites"><li>Favorite</li></Link>
                <Link to={"/top10"}>Top 10</Link>
                <li>Blog</li>
            </ul>
            <div className="navbar-right">
                <select onChange={currencyHandler}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    {/* Corrected to EUR */}
                </select>
            </div>
        </div>
    );
}

export default Navbar;
