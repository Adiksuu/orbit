import { BadgeProps } from '@/types/Components';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import React from 'react';

export const badgeVariants = cva(
    'inline-flex items-center py-[2px] px-2 rounded-md text-[10px] font-medium whitespace-nowrap transition-colors border border-solid border-transparent',
    {
        variants: {
            variant: {
                default: 'bg-zinc-800 text-zinc-400 border border-transparent',
                outline:
                    'bg-transparent border border-[var(--bg-light-color)] text-zinc-400',
                ghost: 'bg-transparent text-zinc-400',
            },
            color: {
                bug: 'text-[#f44336] bg-[#f44336]/10 border-[#f44336]/20',
                feature: 'text-[#2196f3] bg-[#2196f3]/10 border-[#2196f3]/20',
                performance:
                    'text-[#9c27b0] bg-[#9c27b0]/10 border-[#9c27b0]/20',
                design: 'text-[#00bcd4] bg-[#00bcd4]/10 border-[#00bcd4]/20',
                ux: 'text-[#009688] bg-[#009688]/10 border-[#009688]/20',
                chore: 'text-[#e91e63] bg-[#e91e63]/10 border-[#e91e63]/20',
                high: 'text-[#f44336]',
                medium: 'text-[#ff9800]',
                low: 'text-[#4caf50]',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

const Badge: React.FC<BadgeProps> = ({
    children,
    variant,
    color,
    className,
    ...props
}) => {
    return (
        <span
            className={cn(badgeVariants({ variant, color }), className)}
            {...props}
        >
            {children}
        </span>
    );
};

export default Badge;
