import { InputProps } from '@/types/Components';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

export const inputVariants = cva(
    'w-full rounded-md border border-[var(--bg-light-color)] bg-[var(--bg-color)] px-3 py-1.5 text-sm text-[var(--text-color)] transition-colors duration-150 file:hidden focus:border-[var(--accent-color)] disabled:cursor-not-allowed disabled:bg-[var(--pending-color)]',
    {
        variants: {
            variant: {
                default: 'placeholder:text-slate-600',
                modal: 'placeholder:text-slate-400',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            value,
            onChange,
            placeholder,
            isDisabled = false,
            type = 'text',
            className = '',
            variant,
            onKeyDown,
            id,
        },
        ref,
    ) => {
        return (
            <input
                id={id}
                value={value}
                onChange={onChange}
                className={cn(inputVariants({ variant }), className)}
                placeholder={placeholder}
                disabled={isDisabled}
                type={type}
                onKeyDown={onKeyDown}
                ref={ref}
            />
        );
    },
);

Input.displayName = 'Input';

export default Input;
