import React from 'react';

import styles from './Input.module.css';

type NativeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange' | 'name'>;

interface InputProps extends NativeInputProps {
  placeholder?: string;
  name?: string;
  type?: 'text' | 'password' | 'email' | 'submit';
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
  required?: boolean;
  id?: string;
}

export const Input = ({
  placeholder,
  type = 'text',
  value = '',
  name,
  onChange,
  onBlur,
  error,
  disabled,
  autoComplete,
  required,
  id,
  ...props
}: InputProps) => {
  const errorId = name ? `${name}-error` : undefined;
  return (
    <div className={styles.inputWrapper}>
      <input
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        id={id ?? name}
        placeholder={placeholder}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <span id={errorId} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
};
