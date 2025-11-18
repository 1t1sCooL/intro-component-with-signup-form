import styles from './Form.module.css'
import { Input } from "@/shared/ui/input";
import  React, { useState } from "react";
import { useForm } from '../lib/useForm.ts';
import { validateField } from "@/widgets/form/lib/validateField.ts";

export const Form = () => {
    const {formData,
        setFormData,
        errors,
        setErrors} = useForm()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };
    return (
        <section className={styles.form}>
            <h2 className={styles.formHeader}><span>Try it free 7 days</span> then $20/mo. thereafter</h2>
            <form>
                <Input
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Input
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Input
                    name="email"
                    placeholder="Email Address"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <Input
                    value="Claim your free trial"
                    type="submit"
                    disabled={
                        !!errors.firstName ||
                        !!errors.lastName ||
                        !!errors.email ||
                        !!errors.password ||
                        !formData.firstName.trim() ||
                        !formData.lastName.trim() ||
                        !formData.email.trim() ||
                        !formData.password
                    }
                />
                <p className={styles.formText}>
                    By clicking the button, you are agreeing to our <span>Terms and Services</span>
                </p>
            </form>
        </section>
    )
}