import styles from './Input.module.css';
import React from "react";

interface InputProps {
    placeholder?: string;
    name?: string;
    type?: "text" | "password" | "email" | "submit";
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    error?: string;
    disabled?: boolean;
}

export const Input = ({ placeholder, type = "text", value = "", name, onChange, error }: InputProps) => {
    return (
        <div className={styles.inputWrapper}>
            <input
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                placeholder={placeholder}
                type={type}
                value={value}
                name={name}
                onChange={onChange}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};