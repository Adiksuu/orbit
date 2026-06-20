import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    placeholder?: string;
    isDisabled?: boolean;
    type?: string;
}

function Input({
    value,
    onChange,
    className,
    placeholder,
    isDisabled,
    type = 'text',
}: InputProps) {
    return (
        <input
            value={value}
            onChange={onChange}
            className={className || styles.input}
            placeholder={placeholder}
            disabled={isDisabled}
            type={type}
        />
    );
}

export default Input;
