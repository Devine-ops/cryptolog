import axios from 'axios';

// Busca as 100 principais moedas por capitalização de mercado
export const getTop100Coins = async () => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1';
    try {
        const response = await axios.get(url);
        return response.data; // Retorna as 100 moedas
    } catch (erro) {
        console.error("Erro ao buscar as 100 principais moedas:", erro);
        return null;
    }
};
