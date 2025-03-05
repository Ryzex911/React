import React from 'react';
import './home.css'
const Home = () => {
  return(

    <div className='home'>
        <div className='hero'>
          <h1>Welcome <br/> to CryptoDashboard</h1>
          <p>The best place to see and inspect cryptocurrencies</p>
          <form>
            <input type="text" placeholder="Search"/>
            <button type="submit">Search</button>
          </form>
        </div>
      <div className='crypto-table'>
        <div className='table-layout'>
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
      </div>
    </div>
)
}

export default Home;