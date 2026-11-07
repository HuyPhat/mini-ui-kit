import { useId, type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, className, 'aria-describedby': describedBy, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedByIds = [describedBy, error && `${inputId}-error`].filter(Boolean).join(' ');
  return (
    <div className={styles.field}>
      <label htmlFor={inputId}>{label}</label>
      <input
        {...rest}
        id={inputId}
        className={[styles.input, error && styles.invalid, className].filter(Boolean).join(' ')}
        aria-invalid={!!error}
        aria-describedby={describedByIds || undefined}
      />
      {error && <span id={`${inputId}-error`} className={styles.error}>{error}</span>}
    </div>
  );
}