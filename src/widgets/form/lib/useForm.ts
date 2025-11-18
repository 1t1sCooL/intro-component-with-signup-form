import { useState } from "react";

export const useForm = () => {
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
    return {
        formData,
        setFormData,
        errors,
        setErrors,
    }
}