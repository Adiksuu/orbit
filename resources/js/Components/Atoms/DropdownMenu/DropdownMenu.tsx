import { DropdownMenuProps } from '@/types/Components';
import { cn } from '@/utils/cn';

export default function DropdownMenu({
    children,
    direction = 'bottom',
}: DropdownMenuProps) {
    return (
        <div
            className={cn(
                'absolute left-0 right-0 z-[100] flex flex-col gap-0.5 overflow-hidden rounded-lg border border-[var(--bg-color)] bg-[var(--bg-color)] p-1 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4),_0_8px_10px_-6px_rgba(0,0,0,0.4)]',
                direction === 'bottom'
                    ? 'bottom-[calc(100%+6px)]'
                    : 'top-[calc(100%+6px)]',
            )}
        >
            {children}
        </div>
    );
}
