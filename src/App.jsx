import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CryptoPrices from '../src/api_coingeko/Consumer';
import Header from '../src/layout/Header';
import CreateAccount from './pages/createAccount/CreateAccount';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Rota principal */}
        <Route path="/" element={<CryptoPrices />} />
        
        {/* Exemplo de rota adicional */}
        {/* <Route path="/createaccount1" element={<PersonalInformation />} /> */}
        {/* <Route path="/documentalinformation" element={<DocumentalInformation />} />
        <Route path='/adressinformation' element={<AdressInformation />} /> */}
        <Route path='/createaccount' element={<CreateAccount />} />
      </Routes>
    </Router>
  );
};

export default App;


