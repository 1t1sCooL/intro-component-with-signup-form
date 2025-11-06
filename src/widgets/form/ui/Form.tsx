import styles from './Form.module.css'
import { Input } from "@/shared/ui/input";

export const Form = () => {
    return (
        <section className={styles.form}>
            <h2 className={styles.formHeader}><span>Try it free 7 days</span> then $20/mo. thereafter</h2>
            <form>
                <Input placeholder={'First Name'} type={'text'}/>
                <Input placeholder={'Last Name'} type={'text'}/>
                <Input placeholder={'Email Address'} type={'text'}/>
                <Input placeholder={'Password'} type={'text'}/>
                <Input value={'Claim your free trial'} type={'submit'}/>
                <p className={styles.formText}>
                    By clicking the button, you are agreeing to our <span>Terms and Services</span>
                </p>
            </form>
        </section>
    )
}