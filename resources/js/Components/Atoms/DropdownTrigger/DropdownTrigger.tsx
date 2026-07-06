import Icon from '@/Components/Atoms/Icon/Icon';
import { DropdownTriggerProps } from '@/types/Components';
import { cn } from '@/utils/cn';

export default function DropdownTrigger({
    label,
    onClick,
    disabled,
}: DropdownTriggerProps) {
    return (
        <button
            type="button"
            className={cn(
                'flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-[rgb(60_60_60/0.8)] bg-[var(--bg-color)] px-4 py-2.5 text-left text-sm font-medium text-white outline-none transition-all duration-200 ease-linear',
                'disabled:cursor-not-allowed disabled:opacity-60',
            )}
            onClick={onClick}
            disabled={disabled}
        >
            <span className="flex flex-1 items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                {label}
            </span>
            <Icon name={'ChevronDown'} />
        </button>
    );
}
