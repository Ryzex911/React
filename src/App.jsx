import './App.css';
import Navbar from "./component/navbar/navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Coin from "./pages/coin/coin.jsx";
import Favorites from "./component/Favorites.jsx";
import Footer from "./component/Footer/Footer.jsx";
import CoinContextProvider from './context/CoinContext';
import Top10Page from "./pages/Top10Page.jsx"; // Import Top10Page

const App = () => {
    return (
        <CoinContextProvider>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/coin/:coinID" element={<Coin />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/top10" element={<Top10Page />} />
                </Routes>
                <Footer />
            </div>
        </CoinContextProvider>
    );
}

export default App;
