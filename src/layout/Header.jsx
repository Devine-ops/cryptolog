import styles from '../../src/styles/Header.module.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CreateAccount from '../pages/CreateAccount';
import { Link } from 'react-router-dom'

function Header (){

    return(
        <Router>
            <div className={styles.header}>
                <h1 className={styles.logo}><a href="#home">crypto.log</a></h1>
            
                <nav className={styles.nav}>
                    
                        <Link to='/'>home</Link>
                        <Link to='/market'>market</Link>
                        <Link to='/about'>about</Link>
                        <Link to='/support'>support</Link>
                    
                </nav>

                <div className={styles.action}>
                    <button className={styles.login}>Login</button>
                    <button className={styles.register}>Register</button>
                </div>
            </div>

            <Routes>
                <Route path='../src/pages/CreateAccount.jsx' element={<CreateAccount/>}/>
            </Routes>
        </Router>
    )


}

export default Header;