import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const dropdownItemVariants = cva(
    'w-full text-left bg-transparent border-none outline-none px-3 py-2 text-sm text-[#999] rounded-md cursor-pointer transition-all duration-200 ease-linear font-inherit flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] hover:text-white',
    {
        variants: {
            isActive: {
                true: 'bg-[rgb(60_60_60/0.8)] text-white font-semibold',
                false: '',
            },
        },
        defaultVariants: {
            isActive: false,
        },
    },
);

interface DropdownItemProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof dropdownItemVariants> {
    label: React.ReactNode;
}

export default function DropdownItem({
    label,
    onClick,
    isActive,
    ...props
}: DropdownItemProps) {
    return (
        <button
            type="button"
            className={cn(dropdownItemVariants({ isActive }))}
            onClick={onClick}
            {...props}
        >
            {label}
        </button>
    );
}
