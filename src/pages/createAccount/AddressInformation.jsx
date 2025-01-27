import styles from '../../styles/AdressInformation.module.css'
function AddressInformation({register, errors}) {

    return (
      <form>
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
        </div>
      </form>

    );
  }
  
  export default AddressInformation;
