import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

interface StatusDotProps extends VariantProps<typeof classVariants> {
    status: 'open' | 'closed' | 'low' | 'medium' | 'high';
    className?: string;
}

const classVariants = cva('inline-block rounded-full shrink-0', {
    variants: {
        size: {
            sm: 'w-2 h-2',
            md: 'w-2.5 h-2.5',
        },
        status: {
            open: 'bg-[var(--info-color)]',
            closed: 'bg-[var(--pending-color)]',
            low: 'bg-[var(--success-color)]',
            medium: 'bg-[var(--warning-color)]',
            high: 'bg-[var(--error-color)]',
        },
    },
    defaultVariants: {
        size: 'sm',
    },
});

const StatusDot: React.FC<StatusDotProps> = ({
    status,
    size = 'sm',
    className,
}) => {
    return <span className={classVariants({ status, size, className })} />;
};

export default StatusDot;
