import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CryptoPrices from '../src/api_coingeko/Consumer';
import Header from '../src/layout/Header';
import PersonalInformation from './pages/createAccount/PesonalInformation'; 
import DocumentalInformation from './pages/createAccount/DocumentalInformation';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Rota principal */}
        <Route path="/" element={<CryptoPrices />} />
        
        {/* Exemplo de rota adicional */}
        <Route path="/createaccount" element={<PersonalInformation />} />
        <Route path="/documentalinformation" element={<DocumentalInformation />} />
      </Routes>
    </Router>
  );
};

export default App;


