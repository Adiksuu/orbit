import { TextAreaProps } from '@/types/Components';

function TextArea({ value, onChange, placeholder, isDisabled }: TextAreaProps) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            className={
                'w-full resize-y rounded-md border border-[var(--bg-light-color)] bg-[var(--bg-color)] px-3 py-[6px] text-sm text-white transition-none placeholder:text-slate-800 focus:border-[var(--accent-color)] disabled:cursor-not-allowed disabled:bg-[var(--bg-pending-color)]'
            }
            placeholder={placeholder}
            disabled={isDisabled}
        ></textarea>
    );
}

export default TextArea;
