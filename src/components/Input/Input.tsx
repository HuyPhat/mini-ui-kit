import { useId, type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className={styles.field}>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        className={error ? `${styles.input} ${styles.invalid}` : styles.input}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
      {error && <span id={`${inputId}-error`} className={styles.error}>{error}</span>}
    </div>
  );
}