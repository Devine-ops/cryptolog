import './App.css'
import React from 'react';
import CryptoPrices from '../src/api_coingeko/consumer';
import Header from '../src/layout/Header';


const App = () => {
  return (
    <div>
      <Header/>
      <CryptoPrices />
    </div>
  );
};

export default App;

