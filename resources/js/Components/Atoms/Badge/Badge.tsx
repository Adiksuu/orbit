import React from 'react';
import styles from './Badge.module.scss';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'outline' | 'ghost';
    color?:
        | 'bug'
        | 'feature'
        | 'performance'
        | 'design'
        | 'ux'
        | 'chore'
        | 'high'
        | 'medium'
        | 'low';
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    color,
    className,
}) => {
    return (
        <span
            className={`${styles.badge} ${styles[variant]} ${color ? styles[color] : ''} ${className || ''}`}
        >
            {children}
        </span>
    );
};

export default Badge;
