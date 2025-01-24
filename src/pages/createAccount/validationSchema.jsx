import { typeOfDocument } from "@prisma/client";
import { data } from "react-router-dom";
import { z } from "zod";

//Validate Personal Schema


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

export const personalSchema = z.object({
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

//Validation schema for documental information

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, "");

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    const calcDigit = (factor) => 
        cpf.slice(0, factor - 1).split("").reduce((sum, num, idx) => sum + Number(num) * (factor - idx), 0);

    const firstDigit = (calcDigit(10) * 10) % 11 % 10;
    const secondDigit = (calcDigit(11) * 10) % 11 % 10;

    return firstDigit === Number(cpf[9]) && secondDigit === Number(cpf[10]);
}


export const documentalSchema = z.object ({
    typeOfDocument:z.object({
        docs: z.enum(["DRIVER_LICENSE", "IDENTITY_CARD", "PASSPORT"] ,{
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
    },{message: "The document is expired"}),

    imgDocument:z.any().refine((fileList) => fileList && fileList.length > 0, {
        message: "A file is required",
    }).refine((fileList) => {
        const file = fileList[0];
        return file instanceof File && file.size > 0;
    }, {
        message: "Please select a valid file",
    }),
    
});

//Validate Address Information

export const addressSchema = z.object({
    completeAddress: z.string().min(5, {message: "Address must have at least 5 characters"}),
    postalCode: z.string().regex(/^\d{5}-\d{3}$/, {message: "Invalid postal code format"}),
    state: z.string().min(2, {message: "State must have at least 2 characters"}),
    country: z.string().min(2,{message: "Country must have at least 3 characters"}),
});
