import { cva } from 'class-variance-authority';

export const priorityTextColor = cva('text-[11px] font-medium capitalize', {
    variants: {
        priority: {
            high: 'text-[#f44336]',
            medium: 'text-[#ff9800]',
            low: 'text-[#4caf50]',
        },
    },
});

export const boardCardVariants = cva(
    'flex flex-col gap-2 rounded-xl border p-3 text-left shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_4px_10px_-4px_rgba(0,0,0,0.45)]',
    {
        variants: {
            isActive: {
                true: 'border-zinc-600 bg-[#242424] ring-1 ring-[var(--accent-color)]/40',
                false: 'border-white/[0.08] bg-[#1c1c1c] hover:border-white/[0.16] hover:bg-[#212121]',
            },
            isClosed: { true: 'opacity-50 hover:opacity-90', false: '' },
        },
    },
);

export const listRowVariants = cva(
    'group/row cursor-pointer transition-all duration-100 relative hover:z-20',
    {
        variants: {
            isActive: {
                true: 'bg-[var(--bg-light-color-hover)] text-[var(--text-color)]',
                false: 'hover:bg-[var(--bg-light-color-hover)]/50 text-zinc-300 bg-[var(--bg-color)]',
            },
        },
    },
);
