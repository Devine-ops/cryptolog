import styles from '../styles/CreateAccount.module.css';

function CreateAccount() {
    return (
        
        <div className={styles.container_form}>
            <h1>Personal Information</h1>
            <div className={styles.form_background}>
                <input type='text' placeholder='complete name'></input>
                <input type='email' placeholder='e-mail'></input>
                <input type='password' placeholder='password'></input>
                <input type='password' placeholder='confirm password'></input>
                <input type='date'></input> 
                <input type='text' placeholder='nationality'></input> 
                <input type='tel' placeholder='phone'></input>
            </div>
        </div>
    );
}

export default CreateAccount;
