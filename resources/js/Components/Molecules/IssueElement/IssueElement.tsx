import Avatar from '@/Components/Atoms/Avatar/Avatar';
import Badge from '@/Components/Atoms/Badge/Badge';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import LabelList from '@/Components/Molecules/LabelList/LabelList';
import UserBadge from '@/Components/Molecules/UserBadge/UserBadge';
import { IssueElementProps } from '@/types/Components';
import { IssuePriority } from '@/types/Issues';
import { cn } from '@/utils/cn';
import { formatTimeAgo } from '@/utils/time';
import { cva } from 'class-variance-authority';

const priorityTextColor = cva('text-[11px] font-medium capitalize', {
    variants: {
        priority: {
            high: 'text-[#f44336]',
            medium: 'text-[#ff9800]',
            low: 'text-[#4caf50]',
        },
    },
});

const boardCardVariants = cva(
    'flex flex-col gap-2.5 rounded-lg border p-3 text-left transition-all duration-200 cursor-pointer',
    {
        variants: {
            isActive: {
                true: 'border-zinc-600 bg-[var(--bg-light-color-hover)]',
                false: 'border-zinc-800 bg-[#1c1c1c] hover:border-zinc-700 hover:bg-[#222222]',
            },
            isClosed: {
                true: 'opacity-50 hover:opacity-90',
                false: '',
            },
        },
        defaultVariants: {
            isActive: false,
            isClosed: false,
        },
    },
);

const boardTitleVariants = cva(
    'text-xs font-medium line-clamp-2 leading-snug',
    {
        variants: {
            isClosed: {
                true: 'line-through text-zinc-500',
                false: 'text-zinc-200',
            },
        },
        defaultVariants: {
            isClosed: false,
        },
    },
);

const listRowVariants = cva(
    'group/row cursor-pointer transition-all duration-100 relative hover:z-20',
    {
        variants: {
            isActive: {
                true: 'bg-[var(--bg-light-color-hover)] text-[var(--text-color)] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[var(--accent-color)] before:z-10',
                false: 'hover:bg-[var(--bg-light-color-hover)]/50 text-zinc-300 bg-[var(--bg-color)]',
            },
        },
        defaultVariants: {
            isActive: false,
        },
    },
);

const listTitleVariants = cva(
    'truncate font-medium pr-4 text-zinc-200 group-hover/row:text-white transition-colors',
    {
        variants: {
            isClosed: {
                true: 'line-through text-zinc-500 group-hover/row:text-zinc-500',
                false: '',
            },
        },
        defaultVariants: {
            isClosed: false,
        },
    },
);

export const IssueElement = ({
    issue,
    activeIssue,
    setActiveIssue,
    type = 'list',
}: IssueElementProps) => {
    const isActive = activeIssue?.id === issue.id;
    const isClosed = issue.status === 'closed';

    if (type === 'board') {
        return (
            <div
                onClick={() => setActiveIssue(issue)}
                className={boardCardVariants({ isActive, isClosed })}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <StatusDot
                            status={isClosed ? issue.status : issue.priority}
                        />
                        <span className="text-xs font-semibold text-zinc-500">
                            {issue.assignee?.name || 'Unassigned'}
                        </span>
                    </div>
                </div>
                <h4 className={boardTitleVariants({ isClosed })}>
                    {issue.title}
                </h4>
                <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <Badge
                            color={issue.status}
                            variant="default"
                            className={'flex gap-1.5'}
                        >
                            <StatusDot status={issue.status} />
                            <span>{issue.status}</span>
                        </Badge>
                        <LabelList
                            labels={issue.labels || []}
                            variant="default"
                            badgeClassName="px-1.5 py-0.5 text-[9px]"
                        />
                    </div>
                    <div className="flex-shrink-0">
                        {issue.assignee ? (
                            <Avatar
                                src={issue.assignee.avatar}
                                alt={issue.assignee.name}
                                initials={issue.assignee.name.charAt(0)}
                                size="sm"
                            />
                        ) : (
                            <div
                                className="flex h-4 w-4 items-center justify-center rounded-md border border-dashed border-zinc-700 bg-zinc-900 text-[8px] font-medium text-zinc-500"
                                title="Unassigned"
                            >
                                -
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    const tdClass =
        'px-4 py-2.5 border-b border-zinc-800/40 group-last/row:border-b-0 align-middle';

    return (
        <tr
            onClick={() => setActiveIssue(issue)}
            className={listRowVariants({ isActive })}
        >
            <td
                className={`${tdClass} w-[48px] text-center`}
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    type="checkbox"
                    className={cn(
                        'h-3.5 w-3.5 cursor-pointer rounded border-zinc-700 bg-zinc-800/30 text-[var(--accent-color)] transition-opacity focus:ring-1 focus:ring-[var(--accent-color)] focus:ring-offset-zinc-950',
                        isClosed
                            ? 'opacity-20'
                            : 'opacity-60 group-hover/row:opacity-100',
                    )}
                />
            </td>
            <td className={`${tdClass} w-[70px] font-semibold`}>
                <span
                    className={
                        isClosed
                            ? 'text-zinc-600 line-through'
                            : 'text-[var(--pending-color)]'
                    }
                >
                    #{issue.id}
                </span>
            </td>
            <td className={`${tdClass} max-w-[300px]`}>
                <div className="flex items-center">
                    <span className={listTitleVariants({ isClosed })}>
                        {issue.title}
                    </span>
                </div>
            </td>
            <td className={tdClass}>
                <div
                    className={cn(
                        'flex items-center',
                        isClosed && 'opacity-40',
                    )}
                >
                    <Badge
                        color={issue.status}
                        variant="default"
                        className="inline-flex h-6 items-center gap-1.5 rounded-md border border-zinc-700/20 bg-zinc-800/30 px-2 py-0.5 text-[11px] text-zinc-300"
                    >
                        <StatusDot status={issue.status} />
                        <span className="capitalize">{issue.status}</span>
                    </Badge>
                </div>
            </td>
            <td className={`${tdClass} text-left text-zinc-300`}>
                <div className={'flex items-center justify-start text-left'}>
                    <UserBadge
                        avatarSrc={issue.assignee?.avatar ?? undefined}
                        name={
                            issue.assignee ? issue.assignee.name : 'Unassigned'
                        }
                        size="sm"
                    />
                </div>
            </td>
            <td className={tdClass}>
                <div
                    className={cn(
                        'flex items-center',
                        isClosed && 'opacity-40',
                    )}
                >
                    <Badge
                        color={issue.priority}
                        variant="default"
                        className="inline-flex h-6 items-center gap-1.5 rounded-md border border-zinc-700/20 bg-zinc-800/30 px-2 py-0.5"
                    >
                        <StatusDot status={issue.priority} />
                        <span
                            className={priorityTextColor({
                                priority: issue.priority as IssuePriority,
                            })}
                        >
                            {issue.priority}
                        </span>
                    </Badge>
                </div>
            </td>
            <td className={tdClass}>
                <div className="flex items-center">
                    <LabelList
                        labels={issue.labels || []}
                        badgeClassName="text-[10px] px-1.5 py-0.5"
                        isClosed={isClosed}
                    />
                </div>
            </td>
            <td
                className={cn(
                    `${tdClass} whitespace-nowrap font-medium`,
                    isClosed ? 'text-zinc-600' : 'text-zinc-400',
                )}
            >
                {formatTimeAgo(issue.updated_at) + ' ago'}
            </td>
            <td
                className={`${tdClass} text-right`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className={cn(
                        'rounded-md p-1 text-zinc-500 transition-all hover:bg-zinc-800/60 hover:text-zinc-200',
                        isClosed
                            ? 'opacity-20'
                            : 'opacity-0 group-hover/row:opacity-100',
                    )}
                >
                    <span className="-mt-1.5 block text-[13px] font-bold tracking-widest">
                        ...
                    </span>
                </button>
            </td>
        </tr>
    );
};

export default IssueElement;
