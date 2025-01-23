import styles from '../../styles/PersonalInformation.module.css';
function CreateAccount({register, errors}) {

    return (
        <form className={styles.container_form}>
            <h1>Personal Information</h1>
            <div className={styles.form_background}>
                <input {...register('name')} type='text' placeholder='Complete name' />
                <p>{errors.name?.message}</p>

                <input {...register('email')} type='email' placeholder='E-mail' />
                <p>{errors.email?.message}</p>

                <input {...register('password')} type='password' placeholder='Password' />
                <p>{errors.password?.message}</p>

                <input {...register('confirmPassword')} type='password' placeholder='Confirm password' />
                <p>{errors.confirmPassword?.message}</p>

                <input {...register('dateOfBirth')} type='date' />
                <p>{errors.dateOfBirth?.message}</p>

                <input {...register('nationality')} type='text' placeholder='Nationality' />
                <p>{errors.nationality?.message}</p>

                <input {...register('phone')} type='tel' placeholder='Phone' />
                <p>{errors.phone?.message}</p>
            </div>
        </form>
    );
}

export default CreateAccount;