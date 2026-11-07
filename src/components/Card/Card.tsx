import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: string;
  children: ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Card({
  title,
  children,
  headingLevel = 3,
  className,
  ...rest
}: CardProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <section className={[styles.card, className].filter(Boolean).join(' ')} {...rest}>
      <Heading className={styles.title}>{title}</Heading>
      {children}
    </section>
  );
}
