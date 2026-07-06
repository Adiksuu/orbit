import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import { DashboardVisualsProps } from '@/types/Components';
import React, { useMemo } from 'react';
import ProgressRing from '../../Atoms/ProgressRing/ProgressRing';

const DashboardVisuals: React.FC<DashboardVisualsProps> = ({
    issues,
    productivity_trend,
}) => {
    const stats = useMemo(() => {
        const total = issues.length;
        if (total === 0) {
            return {
                high: 0,
                medium: 0,
                low: 0,
                highPct: 0,
                mediumPct: 0,
                lowPct: 0,
                open: 0,
                closed: 0,
                openPct: 0,
                closedPct: 0,
            };
        }

        const high = issues.filter((i) => i.priority === 'high').length;
        const medium = issues.filter((i) => i.priority === 'medium').length;
        const low = issues.filter((i) => i.priority === 'low').length;

        const open = issues.filter((i) => i.status === 'open').length;
        const closed = issues.filter((i) => i.status === 'closed').length;

        return {
            high,
            medium,
            low,
            highPct: Math.round((high / total) * 100),
            mediumPct: Math.round((medium / total) * 100),
            lowPct: Math.round((low / total) * 100),
            open,
            closed,
            openPct: Math.round((open / total) * 100),
            closedPct: Math.round((closed / total) * 100),
        };
    }, [issues]);

    const date = new Date();
    const currentDay = date.toLocaleDateString('en-US', { weekday: 'short' });

    const updatedActivity = productivity_trend.map((item) => ({
        ...item,
        active: item.day === currentDay,
    }));

    const maxCount = Math.max(...productivity_trend.map((d) => d.count));

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <div className="flex flex-col justify-between rounded-lg border border-solid border-[var(--bg-light-color)] bg-[var(--bg-dark-color)] p-5">
                <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Completion Ratio
                    </span>
                    <p className="mt-1 text-xs text-zinc-500">
                        Resolution status of all logged tasks
                    </p>
                </div>
                <div className="flex items-center justify-center py-6">
                    <div className="relative flex items-center justify-center">
                        <ProgressRing
                            radius={64}
                            stroke={8}
                            progress={stats.closedPct}
                            colorClass="stroke-[var(--success-color)]"
                            bgColorClass="stroke-zinc-800"
                        />
                        <div className="absolute flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold leading-none text-white">
                                {stats.closedPct}%
                            </span>
                            <span className="mt-1 text-[10px] font-semibold uppercase text-zinc-500">
                                Resolved
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-around border-t border-solid border-zinc-800/60 pt-3 text-xs">
                    <div className="flex flex-col items-center">
                        <span className="font-medium text-zinc-500">Open</span>
                        <span className="mt-0.5 font-semibold text-white">
                            {stats.open}
                        </span>
                    </div>
                    <div className="h-6 w-px bg-zinc-800" />
                    <div className="flex flex-col items-center">
                        <span className="font-medium text-zinc-500">
                            Closed
                        </span>
                        <span className="mt-0.5 font-semibold text-[var(--success-color)]">
                            {stats.closed}
                        </span>
                    </div>
                    <div className="h-6 w-px bg-zinc-800" />
                    <div className="flex flex-col items-center">
                        <span className="font-medium text-zinc-500">Total</span>
                        <span className="mt-0.5 font-semibold text-[var(--accent-color)]">
                            {issues.length}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between rounded-lg border border-solid border-[var(--bg-light-color)] bg-[var(--bg-dark-color)] p-5">
                <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Priority Breakdown
                    </span>
                    <p className="mt-1 text-xs text-zinc-500">
                        Issues distribution by level of urgency
                    </p>
                </div>
                <div className="py-4">
                    <div className="flex h-3 w-full overflow-hidden rounded-full bg-zinc-800">
                        <div
                            style={{ width: `${stats.highPct}%` }}
                            className="h-full bg-[var(--error-color)] transition-all"
                            title={`High: ${stats.highPct}%`}
                        />
                        <div
                            style={{ width: `${stats.mediumPct}%` }}
                            className="h-full bg-[var(--warning-color)] transition-all"
                            title={`Medium: ${stats.mediumPct}%`}
                        />
                        <div
                            style={{ width: `${stats.lowPct}%` }}
                            className="h-full bg-[var(--success-color)] transition-all"
                            title={`Low: ${stats.lowPct}%`}
                        />
                    </div>
                    <div className="mt-5 flex flex-col gap-2.5">
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <StatusDot status={'high'} size={'md'} />
                                <span className="font-medium text-zinc-300">
                                    High Priority
                                </span>
                            </div>
                            <span className="font-semibold text-white">
                                {stats.high}{' '}
                                <span className="font-medium text-zinc-500">
                                    ({stats.highPct}%)
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <StatusDot status={'medium'} size={'md'} />
                                <span className="font-medium text-zinc-300">
                                    Medium Priority
                                </span>
                            </div>
                            <span className="font-semibold text-white">
                                {stats.medium}{' '}
                                <span className="font-medium text-zinc-500">
                                    ({stats.mediumPct}%)
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <StatusDot status={'low'} size={'md'} />
                                <span className="font-medium text-zinc-300">
                                    Low Priority
                                </span>
                            </div>
                            <span className="font-semibold text-white">
                                {stats.low}{' '}
                                <span className="font-medium text-zinc-500">
                                    ({stats.lowPct}%)
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between rounded-lg border border-solid border-[var(--bg-light-color)] bg-[var(--bg-dark-color)] p-5">
                <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Productivity Trend
                    </span>
                    <p className="mt-1 text-xs text-zinc-500">
                        Daily issue updates and fixes from this week
                    </p>
                </div>

                <div className="flex h-24 items-end justify-between gap-2 px-2 pt-4">
                    {updatedActivity.map((day, idx) => {
                        const heightPct = Math.round(
                            (day.count / maxCount) * 100,
                        );
                        return (
                            <div
                                key={idx}
                                className="group flex flex-1 flex-col items-center"
                            >
                                <div className="relative flex w-full flex-col items-center">
                                    <span className="absolute -top-7 z-20 scale-0 rounded border border-solid border-zinc-700 bg-zinc-900 px-1.5 py-0.5 text-[9px] font-semibold text-white transition-all group-hover:scale-100">
                                        {day.count}
                                    </span>
                                    <div
                                        style={{ height: `${heightPct}px` }}
                                        className={`w-4 rounded-t-sm transition-all duration-500 ${
                                            day.active
                                                ? 'bg-gradient-to-t from-[var(--accent-color)] to-[var(--accent-light-color)] shadow-[0_0_10px_rgba(136,68,218,0.3)]'
                                                : 'bg-zinc-800 group-hover:bg-zinc-700'
                                        }`}
                                    />
                                </div>
                                <span className="mt-2 text-[10px] font-semibold text-zinc-500">
                                    {day.day}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DashboardVisuals;
