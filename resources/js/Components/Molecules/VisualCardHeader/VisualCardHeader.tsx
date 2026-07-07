import { VisualCardHeaderProps } from '@/types/Components';
import { FC } from 'react';

export const VisualCardHeader: FC<VisualCardHeaderProps> = ({
    title,
    description,
}) => {
    return (
        <div className="mb-4">
            <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {title}
            </span>
            <p className="mt-1 text-xs text-zinc-500">{description}</p>
        </div>
    );
};
