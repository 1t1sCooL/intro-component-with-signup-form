import styles from './Input.module.css'

interface InputProps {
    placeholder?: string;
    type?: "text" | "password" | "email" | "password_confirmation" | "submit";
    value?: string;
}

export const Input = ({placeholder, type, value}:InputProps) => {
    return (
        <input className={styles.input} placeholder={placeholder} type={type} value={value ? value : ''} />
    )
}