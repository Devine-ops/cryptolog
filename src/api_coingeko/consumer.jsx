import styles from '../styles/consumer.module.css';
import { useEffect, useState } from 'react';
import { getTop100Coins } from './api';


const CryptoPrices = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className={styles.box}>
            
            <div className={styles.wrap}> 
                
                    {coins.length > 0 ? (
                        <ul>
                            {coins.map((coin) => (
                                <li key={coin.id}>
                                    <img src={coin.image} alt={coin.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                                    {coin.name} ({coin.symbol.toUpperCase()}): ${coin.current_price}
                                    <span style={{ color: coin.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                                        ({coin.price_change_percentage_24h.toFixed(2)}%)
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Error fetching data...</p>
                    )}
            </div>
        </div>
    );
};

export default CryptoPrices;
