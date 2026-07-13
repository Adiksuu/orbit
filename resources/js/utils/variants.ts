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
    'flex flex-col gap-2.5 rounded-lg border p-3 text-left transition-all duration-200 cursor-pointer',
    {
        variants: {
            isActive: {
                true: 'border-zinc-600 bg-[var(--bg-light-color-hover)]',
                false: 'border-zinc-800 bg-[#1c1c1c] hover:border-zinc-700 hover:bg-[#222222]',
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
