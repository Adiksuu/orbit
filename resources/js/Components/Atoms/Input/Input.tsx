import React from 'react';

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    isDisabled?: boolean;
    type?: string;
}

function Input({
    value,
    onChange,
    placeholder,
    isDisabled,
    type = 'text',
}: InputProps) {
    return (
        <input
            value={value}
            onChange={onChange}
            className={
                'w-full rounded-md border border-[var(--bg-light-color)] bg-[var(--bg-color)] px-3 py-1.5 text-sm text-[var(--text-color)] transition-colors duration-150 file:hidden placeholder:text-slate-800 focus:border-[var(--accent-color)] disabled:cursor-not-allowed disabled:bg-[var(--pending-color)]'
            }
            placeholder={placeholder}
            disabled={isDisabled}
            type={type}
        />
    );
}

export default Input;
