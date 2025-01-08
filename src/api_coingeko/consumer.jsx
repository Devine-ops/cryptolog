import styles from '../styles/consumer.module.css';
import { useEffect, useState } from 'react';
import { getTop100Coins } from './api';

const CryptoPrices = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        const fetchCoins = async () => {
            const topCoins = await getTop100Coins(); // Busca as 100 principais moedas
            if (!topCoins) {
                setLoading(false);
                return;
            }
            setCoins(topCoins);
            setLoading(false);
        };

        fetchCoins();
    }, []);

    if (loading) return <p>Loading Prices...</p>;

    // Calcular os índices dos itens a serem exibidos na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCoins = coins.slice(indexOfFirstItem, indexOfLastItem);

    // Funções de navegação da paginação
    const handleNextPage = () => {
        if (currentPage < Math.ceil(coins.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Market</h1>
            {coins.length > 0 ? (
                <div className={styles.box}>
                    {currentCoins.map((coin) => (
                        <div className={styles.wrap} key={coin.id}>
                            <img 
                                src={coin.image} 
                                alt={coin.name} 
                                style={{ width: '60px', height: '60px', margin: '15px auto', display: 'block' }} 
                            />
                            {coin.name} ({coin.symbol.toUpperCase()}): 
                            <span style={{ display: 'block', margin: '3px' }}>
                                ${coin.current_price}
                            </span>
                            <span 
                                style={{ 
                                    color: coin.price_change_percentage_24h > 0 ? 'green' : 'red', 
                                    display: 'block' 
                                }}
                            >
                                ({coin.price_change_percentage_24h.toFixed(2)}%)
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Error fetching data...</p>
            )}

            {/* Controles de Paginação */}
            <div className={styles.pagination}>
                <button 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 1} 
                    className={styles.paginationButton}
                >
                    Previous
                </button>
                <span className={styles.pageInfo}>
                    Page {currentPage} of {Math.ceil(coins.length / itemsPerPage)}
                </span>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === Math.ceil(coins.length / itemsPerPage)} 
                    className={styles.paginationButton}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CryptoPrices;
