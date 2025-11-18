import styles from './Input.module.css';
import React from "react";

interface InputProps {
    placeholder?: string;
    name?: string;
    type?: "text" | "password" | "email" | "submit";
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
}

export const Input = ({ placeholder, type = "text", value = "", name, onChange, error }: InputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
    };

    return (
        <div className={styles.inputWrapper}>
            <input
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                placeholder={placeholder}
                type={type}
                value={value}
                name={name}
                onChange={handleChange}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};