import {useForm} from 'react-hook-form'
import {number, z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import styles from '../../styles/DocumentalInformation.module.css'

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, "");

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    const calcDigit = (factor) => 
        cpf.slice(0, factor - 1).split("").reduce((sum, num, idx) => sum + Number(num) * (factor - idx), 0);

    const firstDigit = (calcDigit(10) * 10) % 11 % 10;
    const secondDigit = (calcDigit(11) * 10) % 11 % 10;

    return firstDigit === Number(cpf[9]) && secondDigit === Number(cpf[10]);
}


const schema = z.object ({
    typeOfDocument:z.object({
        docs: z.enum(["Drives license", "Identity card", "Passaport"] ,{
            errorMap: () => ({message: "Please select a valid document type"})
        }),
    }),    
    documentNumber:z.string().regex(/^\d{11}$|^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: "CPF must be in the format XXX.XXX.XXX-xx or 11 digits",
    }).refine(validateCPF, {message: "Invalid CPF digits"}),
    dateOfExpiration:z.string().refine((date) => {
        const inputDate = newData(date);
        const today = newDate();
        return inputDate > today;
    } ,{mensage: "The expiration date must be in the future"}),
})


function DocumentalInformation () {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm ({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
        alert('Form submited successfully!')
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>hello</h1>
            <div className={styles.backgorund_form}>
            <label htmlFor="docs">Document Type:</label>
                <select name="docs" id="docs" {...register("typeOfDocument.docs")} defaultValue="">
                    <option value="">Select a document</option>
                    <option value="Drives license">Drive's license</option>
                    <option value="Identity card">Identity card</option>
                    <option value="Passaport">Passaport</option>
                </select>
                <p>{errors.doc && errors.typeOfDocument?.message}</p>
                <input {...register('documentNumber')}type="string" placeholder='Wiriter yor document number '/>
                <p>{errors.documentNumber?.message}</p>
                <input {...register('dateOfExpiration')}type="date" />
                <p>{errors.dateOfExpiration?.message}</p>
                <input {...register('imgDocument')}type="file" required/>
            </div>
            <button typeof='submit'>submit</button>
        </form>
    );
}

export default DocumentalInformation;

