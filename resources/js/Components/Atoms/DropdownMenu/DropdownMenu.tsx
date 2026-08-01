import { DropdownMenuProps } from '@/types/Components';
import { cn } from '@/utils/cn';

export default function DropdownMenu({
    children,
    direction = 'bottom',
    header,
    stretch = true,
}: DropdownMenuProps) {
    return (
        <div
            className={cn(
                'absolute left-0 z-[100] flex max-h-[320px] flex-col overflow-y-auto overflow-x-hidden rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] p-1 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4),_0_8px_10px_-6px_rgba(0,0,0,0.4)]',
                stretch ? 'right-0' : 'w-max min-w-[180px]',
                direction === 'bottom'
                    ? 'top-[calc(100%+6px)]'
                    : 'bottom-[calc(100%+6px)]',
            )}
        >
            {header && (
                <div className="border-b border-[var(--border-color)] px-3 py-2 text-xs font-medium text-[var(--text-gray-color)]">
                    {header}
                </div>
            )}
            <div className="flex flex-col gap-0.5 p-1">{children}</div>
        </div>
    );
}
