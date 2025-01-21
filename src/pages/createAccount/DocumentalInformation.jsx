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
    
    dateOfExpiration:z.string({
        expirationDate:z.string().refine((date) => !isNaN(new Date(date).getTime()),
        {message:"Invalid date format"})
    }).refine((date) => {
        const today = new Date();
        today.setHours(0,0,0,0);
        const expirationDate = new Date(date);
        return expirationDate >= today;
    },{message: "The document is expired"})
});

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
        <form>
            <h1>Documental Information</h1>
            <div className={styles.background_form}>
            <label htmlFor="docs" style={{display:'block'}}>Document Type:</label>
            
                <select name="typeOfDocument.docs" {...register("typeOfDocument.docs")} defaultValue="">
                    <option value="">Select a document</option>
                    <option value="Drives license">Drive's license</option>
                    <option value="Identity card">Identity card</option>
                    <option value="Passaport">Passaport</option>
                </select>
                <p>{errors.typeOfDocument?.docs?.message}</p>
                <input {...register('documentNumber')}type="string" placeholder='Wiriter yor document number '/>
                <p>{errors.documentNumber?.message}</p>
                <input {...register('dateOfExpiration')}type="date" />
                <p>{errors.dateOfExpiration?.message}</p>
                <input {...register('imgDocument')}type="file" required/>
            </div>
        </form>
    );
}

export default DocumentalInformation;

