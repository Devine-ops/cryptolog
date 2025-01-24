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

    const onSubmit = (data) => {
        const finalData = {
            ...formData,
            ...data,
        };
        console.log(finalData);
        alert('form submited successfully!')
    }
    
    return(
        <div className={styles.background}>
            <form className={styles.container_form} onSubmit={handleSubmit(step === 3 ? onSubmit : nextStep)}>
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