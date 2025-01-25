import { useState } from 'react'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { personalSchema, documentalSchema, addressSchema } from './validationSchema'
import PersonalInformation from './PesonalInformation'
import DocumentalInformation from './DocumentalInformation'
import AddressInformation from './AddressInformation';
import styles from '../../styles/CreateAccount.module.css'

function CreateAccount () {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const schemaByStep = [personalSchema, documentalSchema, addressSchema];
    const schema = schemaByStep[step - 1];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm ({
        resolver:zodResolver(schema),
        mode: 'onBlur',
        defaultValues:'formData',
    })

    const nextStep = (data) => {
        setFormData((prev) => ({
            ...prev,
            ...data,
        }));
        setStep(step + 1);
    }

    const prevStep = () => setStep((step) => step - 1);

    const onSubmit = async (data) => {
        const finalData = {
            ...formData,
            ...data, 
        }; 

        try{
            const response = await fetch('http://localhost:3000/api/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalData),
            });
            alert('Account created successfully!')
        } catch (error) {
            alert('Error creating account')
            console.error(error);
        }
        
    }
    
    return(
        <div className={styles.background}>
            <form className={styles.container_form} onSubmit={handleSubmit(step === 3 ? onSubmit : nextStep)} enctype="multipart/form-data">
                {step === 1 && (
                <PersonalInformation register={register} errors={errors} nextStep={nextStep} />
            )}

            {step === 2 && (
                <DocumentalInformation register={register} errors={errors} nextStep={nextStep} prevStep={prevStep} />
            )}

            {step === 3 && (
                <AddressInformation register={register} errors={errors} prevStep={prevStep} />
            )}

                <div className={styles.button_container}>
                    {step > 1 && <button type="button" onClick={prevStep}>Prev</button>}
                    <button type="submit">{step === 3 ? "Submit" : "Next"}</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAccount;