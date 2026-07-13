import { TextAreaProps } from '@/types/Components';
import { cva } from 'class-variance-authority';

export const textareaVariants = cva(
    'w-full resize-y rounded-md border border-[var(--bg-light-color)] bg-[var(--bg-color)] px-3 py-[6px] text-sm text-white transition-none focus:border-[var(--accent-color)] disabled:cursor-not-allowed disabled:bg-[var(--bg-pending-color)] min-h-[200px]',
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

function TextArea({
    value,
    onChange,
    placeholder,
    isDisabled,
    variant,
}: TextAreaProps) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            className={textareaVariants({ variant })}
            placeholder={placeholder}
            disabled={isDisabled}
        ></textarea>
    );
}

export default TextArea;
