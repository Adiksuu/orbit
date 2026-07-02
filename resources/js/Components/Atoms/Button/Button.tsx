import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
    'font-medium text-sm cursor-pointer transition-all ease-in-out duration-150 disabled:cursor-not-allowed flex items-center justify-center gap-2',
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
