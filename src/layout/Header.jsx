import styles from '../../src/styles/Header.module.css';

function Header (){

    return(
        <div className={styles.header}>
            <h1 className={styles.logo}><a href="#home">crypto.log</a></h1>

            <nav className={styles.nav}>
                <ul>
                    <li><a href="#home">home</a></li>
                    <li><a href="#marker">maker</a></li>
                    <li><a href="#about">about</a></li>
                    <li><a href="#suport">support</a></li>
                </ul>
            </nav>

            <div className={styles.action}>
                <button className={styles.login}>Login</button>
                <button className={styles.register}>Register</button>
            </div>
        </div>
    )


}

export default Header;