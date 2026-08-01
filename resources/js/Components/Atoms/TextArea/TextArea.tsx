import { TextAreaProps } from '@/types/Components';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

export const textareaVariants = cva(
    'w-full resize-y rounded-md border border-[var(--bg-light-color)] bg-[var(--bg-color)] px-3 py-[6px] text-sm text-white transition-none focus:border-[var(--accent-color)] disabled:cursor-not-allowed disabled:bg-[var(--pending-color)] min-h-[200px]',
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

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            value,
            onChange,
            placeholder,
            isDisabled,
            variant,
            className,
            onKeyDown,
            onBlur,
        },
        ref,
    ) => {
        return (
            <textarea
                value={value}
                onChange={onChange}
                className={cn(textareaVariants({ variant }), className)}
                placeholder={placeholder}
                disabled={isDisabled}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                ref={ref}
            ></textarea>
        );
    },
);

TextArea.displayName = 'TextArea';

export default TextArea;
