import { DividerProps } from '@/types/Components';
import { cn } from '@/utils/cn';

const Divider = ({ label, className }: DividerProps) => {
    if (!label) {
        return (
            <hr
                className={cn(
                    'border-t border-[var(--bg-light-color)]',
                    className,
                )}
            />
        );
    }

    return (
        <div className={cn('flex items-center gap-3', className)}>
            <span className="h-px flex-1 bg-[var(--bg-light-color)]" />
            <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-[var(--text-gray-color)]">
                {label}
            </span>
            <span className="h-px flex-1 bg-[var(--bg-light-color)]" />
        </div>
    );
};

export default Divider;
