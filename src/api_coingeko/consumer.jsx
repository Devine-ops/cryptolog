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

                <div className={styles.container}>
                    {coins.length > 0 ? (
                        <div className={styles.box}>
                            {coins.map((coin) => (
                                <div className={styles.wrap} key={coin.id}>
                                    <img src={coin.image} alt={coin.name} style={{ width: '60px', height: '60px', margin:'15px auto', display:'block'}} />
                                    {coin.name} ({coin.symbol.toUpperCase()}): ${coin.current_price}
                                    <span style={{ color: coin.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                                        ({coin.price_change_percentage_24h.toFixed(2)}%)
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Error fetching data...</p>
                    )}
                </div>
    );
};

export default CryptoPrices;
