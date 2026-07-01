import { cva } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

const buttonVariants = cva(
    'font-medium text-sm cursor-pointer transition-all ease-in-out duration-150 disabled:cursor-not-allowed',
    {
        variants: {
            isBox: {
                false: 'py-1.5 px-3 rounded-sm bg-[var(--accent-color)] text-[var(--text-color)] hover:bg-[var(--accent-light-color)] disabled:bg-[var(--pending-color)]',
                true: 'p-0 rounded-sm bg-[var(--bg-light-color)] text-[var(--text-color)] hover:brightness-90',
            },
        },
        defaultVariants: {
            isBox: false,
        },
    },
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    isBox?: boolean;
    isDisabled?: boolean;
}

function Button({
    children,
    className,
    onClick,
    isBox = false,
    isDisabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(buttonVariants({ isBox }), className)}
            onClick={onClick}
            disabled={isDisabled}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
