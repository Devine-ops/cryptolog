import styles from '../../styles/DocumentalInformation.module.css'
function DocumentalInformation ({register, errors}) {

    return(
        <form>
            <h1>Documental Information</h1>
            <div className={styles.background_form}>
            <label htmlFor="docs" style={{display:'block'}}>Document Type:</label>
            
                <select name="typeOfDocument.docs" {...register("typeOfDocument.docs")} defaultValue="">
                    <option value="">Select a document</option>
                    <option value="DRIVER_LICENSE">Drive's license</option>
                    <option value="IDENTITY_CARD">Identity card</option>
                    <option value="PASSPORT">Passaport</option>
                </select>
                <p>{errors.typeOfDocument?.docs?.message}</p>
                <input {...register('documentNumber')}type="string" placeholder='Wiriter yor document number '/>
                <p>{errors.documentNumber?.message}</p>
                <input {...register('dateOfExpiration')}type="date" />
                <p>{errors.dateOfExpiration?.message}</p>
                <input type="file" {...register('imgDocument')}/>
                <p>{errors.imgDocument?.message}</p>
            </div>
        </form>
    );
}

export default DocumentalInformation;

