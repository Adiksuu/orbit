import Avatar from '@/Components/Atoms/Avatar/Avatar';
import Badge from '@/Components/Atoms/Badge/Badge';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import LabelList from '@/Components/Molecules/LabelList/LabelList';
import UserBadge from '@/Components/Molecules/UserBadge/UserBadge';
import { IssueElementProps } from '@/types/Components';
import { IssuePriority } from '@/types/Issues';
import { cva } from 'class-variance-authority';

const priorityTextColor = cva('text-xs', {
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
    'cursor-pointer border-b border-solid border-[var(--bg-light-color)] transition-all duration-100 hover:bg-[var(--bg-light-color-hover)]',
    {
        variants: {
            isActive: {
                true: 'bg-[var(--bg-light-color-hover)]',
                false: '',
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

const listTitleVariants = cva('px-4 py-2 font-medium', {
    variants: {
        isClosed: {
            true: 'line-through text-zinc-500',
            false: 'text-[var(--text-color)]',
        },
    },
    defaultVariants: {
        isClosed: false,
    },
});

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
                        <div className="flex items-center gap-1">
                            <Badge
                                color={issue.status}
                                variant="default"
                                className={'flex gap-1.5'}
                            >
                                <StatusDot status={issue.status} />
                                <span>{issue.status}</span>
                            </Badge>
                        </div>
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

    return (
        <tr
            onClick={() => setActiveIssue(issue)}
            className={listRowVariants({ isActive, isClosed })}
        >
            <td className="w-[100px] px-4 py-2 text-[var(--text-gray-color)]">
                {issue.id}
            </td>
            <td className={listTitleVariants({ isClosed })}>{issue.title}</td>
            <td className="px-4 py-2">
                <div className="flex items-center gap-1">
                    <Badge
                        color={issue.status}
                        variant="default"
                        className={'flex gap-1.5'}
                    >
                        <StatusDot status={issue.status} />
                        <span>{issue.status}</span>
                    </Badge>
                </div>
            </td>
            <td className="px-4 py-2 text-[var(--text-color)]">
                <UserBadge
                    avatarSrc={issue.assignee?.avatar ?? undefined}
                    name={issue.assignee ? issue.assignee.name : 'Unassigned'}
                    size="sm"
                />
            </td>
            <td className="px-4 py-2">
                <div className="flex items-center gap-1">
                    <Badge
                        color={issue.priority}
                        variant="default"
                        className={'flex gap-1.5'}
                    >
                        <StatusDot status={issue.priority} />
                        <span
                            className={priorityTextColor({
                                priority: issue.priority as IssuePriority,
                            })}
                        >
                            <span className="text-[12px]">
                                {issue.priority}
                            </span>
                        </span>
                    </Badge>
                </div>
            </td>
            <td className="px-4 py-2">
                <LabelList labels={issue.labels || []} />
            </td>
        </tr>
    );
};

export default IssueElement;
