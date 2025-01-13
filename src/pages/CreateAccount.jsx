import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from '../styles/CreateAccount.module.css';

const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear(); 
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())){
        age--;
    }
    return age;
}

const schema = z.object({
    name:z.string().min(3,'Complete name is rquired'),
    email:z.string().email('Invalid email format'),
    password:z.string().min(6, 'Confirme password is required'),
    confirmPassword:z.string().min(6, 'Confirme password is required'),
    dateOfBirth: z.string().min(1, 'Date od birth is required').refine((date) => calculateAge(date) >= 18, 'You must be at least 18 years old to create an account'),
    nationality:z.string().min(3,'Nationality is required'),
    phone:z.string().regex(/^\+?[0-9]{10,15}$/, 'Phone number is invalid')
    .min(1, 'Phone number is required'),
})

    .superRefine((data,ctx) => {
        if(data.password !== data.confirmPassword){
            ctx.addIssue({
                path: ['confirmPassword'],
                message: 'Password must match'
            })
        }
    })


function CreateAccount() {

    const {
        register, handleSubmit,
        formState: {errors}, } = useForm ({
            resolver:zodResolver(schema),
        });
    
    const onSubmit = (data) => {
        console.log(data);
        alert('Form submitted successfully!')
    }    

    return (
        <form className={styles.container_form} onSubmit={handleSubmit(onSubmit)}>
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

            <div className={styles.buttons}>
            <button type="submit">Submit</button>
                {/* <button type='button'>Preview</button>
                <button type='submit'>Next</button> */}
            </div>
        </form>
    );
}

export default CreateAccount;
