import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    isBox?: boolean;
    isDisabled?: boolean;
}

function Button({
    children,
    className,
    onClick,
    isBox,
    isDisabled,
}: ButtonProps) {
    return (
        <button
            className={className || !isBox ? styles.button : styles.box}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
}

export default Button;
