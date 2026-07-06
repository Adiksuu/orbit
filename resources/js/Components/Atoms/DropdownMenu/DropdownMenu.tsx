import { ChildrenItemProps } from '@/types/Components';

export default function DropdownMenu({ children }: ChildrenItemProps) {
    return (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[100] flex flex-col gap-0.5 overflow-hidden rounded-lg border border-[var(--bg-color)] bg-[var(--bg-color)] p-1 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4),_0_8px_10px_-6px_rgba(0,0,0,0.4)]">
            {children}
        </div>
    );
}
