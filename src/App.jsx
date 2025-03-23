import './App.css';
import Navbar from "./component/navbar/navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Coin from "./pages/coin/coin.jsx";
import Favorites from "./component/Favorites.jsx"; // ✅ Importeer de favorietenpagina
import Footer from "./component/Footer/Footer.jsx";
import CoinContextProvider from './context/CoinContext'; // ✅ Zorg ervoor dat de context wordt gebruikt

const App = () => {
    return (
        <CoinContextProvider>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/coin/:coinID" element={<Coin />} />
                    <Route path="/favorites" element={<Favorites />} /> {/* ✅ Nieuwe route */}
                </Routes>
                <Footer />
            </div>
        </CoinContextProvider>
    );
}

export default App;
