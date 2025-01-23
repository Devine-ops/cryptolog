import styles from '../../src/styles/Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className={styles.header}>
            <h1 className={styles.logo}>
                <Link className={styles.cryptolog} to="/">crypto.log</Link>
            </h1>

            <nav className={styles.nav}>
                <Link to="/" className={styles.link}>home</Link>
                <Link to="/market" className={styles.link}>market</Link>
                <Link to="/about" className={styles.link}>about</Link>
                <Link to="/support" className={styles.link}>support</Link>
            </nav>

            <div className={styles.action}>
                <button className={styles.login}>Login</button>
                <Link to='/createaccount'>
                    <button className={styles.register}>Register</button>
                </Link>
            </div>
        </div>
    );
}

export default Header;
