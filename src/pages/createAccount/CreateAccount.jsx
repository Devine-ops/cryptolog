import { useState } from 'react'
import PersonalInformation from './PesonalInformation'
import DocumentalInformation from './DocumentalInformation'
import AdressInformation from './AdressInformation'

function CreateAccount () {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return(
        <div>
            {step === 1 && (
                <PersonalInformation nextStep={nextStep}></PersonalInformation>
            )}

            {step === 2 && (
                <DocumentalInformation prevStep={prevStep} nextStep={nextStep}></DocumentalInformation>
            )}

            {step === 3 &&(
                <AdressInformation prevStep={prevStep} submitForm={submitForm}></AdressInformation>
            )}

            <div>
                <button onClick={prevStep}>Prev</button>
                <button onClick={nextStep}>Next</button>
            </div>
        </div>
    )
}

export default CreateAccount;