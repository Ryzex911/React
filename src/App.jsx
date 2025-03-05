import './App.css'
import Navbar from "./component/navbar/navbar.jsx";
import{Routes,Route} from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Coin from "./pages/coin/coin.jsx";


const App= () => {

    return(

    <div className= "app">
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/coin/:coinID" element={<Coin/>}/>
        </Routes>

    </div>
)
}

export default App
//<DashboardTable ryzex={"hello"} melvin={"de beste "}/>
//<Favbutton addToFav={"toegevoegd"}/>