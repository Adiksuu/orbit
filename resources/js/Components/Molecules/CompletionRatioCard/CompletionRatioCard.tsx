import { CompletionRatioCardProps } from '@/types/Components';
import { FC } from 'react';
import ProgressRing from '../../Atoms/ProgressRing/ProgressRing';
import { VisualCard } from '../../Atoms/VisualCard/VisualCard';
import { VisualCardHeader } from '../VisualCardHeader/VisualCardHeader';

export const CompletionRatioCard: FC<CompletionRatioCardProps> = ({
    open,
    inProgress,
    closed,
    total,
    closedPct,
}) => {
    return (
        <VisualCard>
            <VisualCardHeader
                title="Completion Ratio"
                description="Resolution status of all logged tasks"
            />
            <div className="flex flex-1 items-center justify-center py-6">
                <div className="relative flex items-center justify-center">
                    <ProgressRing
                        radius={64}
                        stroke={8}
                        progress={closedPct}
                        colorClass="stroke-[var(--success-color)]"
                        bgColorClass="stroke-zinc-800"
                    />
                    <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold leading-none text-white">
                            {closedPct}%
                        </span>
                        <span className="mt-1 text-[10px] font-semibold uppercase text-zinc-500">
                            Resolved
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-auto flex items-center justify-around border-t border-solid border-zinc-800/60 pt-3 text-xs">
                <div className="flex flex-col items-center">
                    <span className="font-medium text-zinc-500">Open</span>
                    <span className="mt-0.5 font-semibold text-white">
                        {open}
                    </span>
                </div>
                <div className="h-6 w-px bg-zinc-800" />
                <div className="flex flex-col items-center">
                    <span className="font-medium text-zinc-500">
                        In Progress
                    </span>
                    <span className="mt-0.5 font-semibold text-[var(--accent-color)]">
                        {inProgress}
                    </span>
                </div>
                <div className="h-6 w-px bg-zinc-800" />
                <div className="flex flex-col items-center">
                    <span className="font-medium text-zinc-500">Closed</span>
                    <span className="mt-0.5 font-semibold text-[var(--success-color)]">
                        {closed}
                    </span>
                </div>
                <div className="h-6 w-px bg-zinc-800" />
                <div className="flex flex-col items-center">
                    <span className="font-medium text-zinc-500">Total</span>
                    <span className="mt-0.5 font-semibold text-[var(--accent-color)]">
                        {total}
                    </span>
                </div>
            </div>
        </VisualCard>
    );
};
