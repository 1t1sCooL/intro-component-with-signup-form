import styles from './Form.module.css'
import { Input } from "@/shared/ui/input";
import  React, { useState } from "react";

export const Form = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const validateField = (name: string, value: string) => {
        let error = '';

        switch (name) {
            case 'firstName':
                if (!value.trim()) error = 'First Name cannot be empty';
                break;
            case 'lastName':
                if (!value.trim()) error = 'Last Name cannot be empty';
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) {
                    error = 'This field is required';
                } else if (!emailRegex.test(value)) {
                    error = 'Looks like this is not an email';
                }
                break;

            case 'password':
                if (!value) {
                    error = 'Password cannot be empty';
                } else if (value.length < 8) {
                    error = 'Password must be at least 8 characters';
                }
                break;

            default:
                break;
        }

        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
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