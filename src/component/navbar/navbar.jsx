import React from 'react'
import './navbar.css'
import logo from '/src/assets/logo.png'
import arrow_icon from '/src/assets/arrow_icon.png'

const Navbar = () => {
    return (

        //hierbij heb ik een navbar gemaakt na het importeren van de logo van de assets folder
        //en dan gelinkt naar me paginas en daarna opties gemaakt om de currentie te veranderen
        <div className="navbar">
            <img src={logo} alt="logo van pagina" className="logo"/>
            <ul>
                <li>Home</li>
                <li>Features</li>
                <li>Pricing</li>
                <li>Blog</li>
            </ul>
            <div className="navbar-right">
                <select>
                <option value="USD">USD</option>
                <option value="USD">EUR</option>
                </select>
                <button>Sign up <img src={arrow_icon} alt="arrow icon foto"/> </button>
            </div>

        </div>
    )

}
export default Navbar