import { VisualCardProps } from '@/types/Components';
import { FC } from 'react';

export const VisualCard: FC<VisualCardProps> = ({
    children,
    className = '',
}) => {
    return (
        <div
            className={`flex flex-col justify-between rounded-lg border border-solid border-[var(--bg-light-color)] bg-[var(--bg-dark-color)] p-5 transition-all hover:border-zinc-800 ${className}`}
        >
            {children}
        </div>
    );
};
