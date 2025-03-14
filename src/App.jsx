import './App.css';
import Navbar from "./component/navbar/navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Coin from "./pages/coin/coin.jsx";
import Footer from "./component/Footer/Footer.jsx";
import CoinContextProvider from './context/CoinContext'; // Import the context provider

const App = () => {
    return (
        <CoinContextProvider> {/* Wrap the whole app in the context provider */}
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/coin/:coinID" element={<Coin />} />
                </Routes>
                <Footer />
            </div>
        </CoinContextProvider>
    );
}

export default App;
