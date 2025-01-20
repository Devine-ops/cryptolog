import styles from '../../styles/AdressInformation.module.css'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const addressSchema = z.object({
    completeAddress: z.string().min(5, {message: "Address must have at least 5 characters"}),
    postalCode: z.string().regex(/^\d{5}(-d{4})?$/, {message: "Invalid postal code format"}),
    state: z.string().min(2, {message: "State must have at least 2 characters"}),
    country: z.string().includes(2,{message: "Country must have at least 3 characters"}),
});


function addressInformation() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(addressSchema),
    });
  
    const onSubmit = (data) => {
      console.log("Submitted data:", data);
      alert("Form submitted successfully!");
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Address Information</h1>
            <div className={styles.background_form}>
            <input type="text" placeholder="Complete address" {...register("completeAddress")} />
            <p>{errors.completeAddress?.message}</p>
    
            <input type="text" placeholder="Postal code" {...register("postalCode")} />
            <p>{errors.postalCode?.message}</p>
    
            <input type="text" placeholder="State" {...register("state")} />
            <p>{errors.state?.message}</p>
    
            <input type="text" placeholder="Country" {...register("country")} />
            <p>{errors.country?.message}</p>
    
            <button type="submit">Submit</button>
        </div>
      </form>

    );
  }
  
  export default addressInformation;