import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  className,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button type="button" {...rest} className={classes} disabled={disabled || loading} aria-busy={loading}>
      <span className={styles.label}>{children}</span>
      {/* Part of the accessible name. A role="status" here would be ignored: a button's children are presentational. */}
      {loading && <span className={styles.srOnly}>Loading</span>}
    </button>
  );
}