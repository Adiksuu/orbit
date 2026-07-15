import Badge from '@/Components/Atoms/Badge/Badge';
import IconButton from '@/Components/Atoms/IconButton/IconButton';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import { IssueRowDetail } from '@/Components/Molecules/IssueRowDetail/IssueRowDetail';
import LabelList from '@/Components/Molecules/LabelList/LabelList';
import UserBadge from '@/Components/Molecules/UserBadge/UserBadge';
import { ListRowProps } from '@/types/Components';
import { cn } from '@/utils/cn';
import { formatTimeAgo } from '@/utils/time';
import { listRowVariants, priorityTextColor } from '@/utils/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const tdClass =
    'px-4 border-b border-zinc-800/40 group-last/row:border-b-0 align-middle';

const expandedTdClass =
    'px-4 border-b border-zinc-700/20 align-middle bg-zinc-800/20';

export const ListRow = ({
    issue,
    isActive,
    onClick,
    isClosed,
    handleSelectIssueCheckbox,
    enabledColumns = {
        id: true,
        title: true,
        status: true,
        assignee: true,
        priority: true,
        labels: true,
        updated: true,
    },
    rowHeight = 44,
    isExpanded,
    onToggleExpand,
}: ListRowProps) => {
    const handleRowClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
            target.closest('[data-column="checkbox"]') ||
            target.closest('[data-column="actions"]')
        ) {
            return;
        }

        onClick(); // Always open details modal
    };

    const handleExpandClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleExpand?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onClick();
        }
        if (e.key === ' ') {
            e.preventDefault();
            onToggleExpand?.();
        }
    };

    return (
        <>
            <tr
                onClick={handleRowClick}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                className={cn(
                    listRowVariants({ isActive }),
                    'group/row cursor-pointer outline-none focus-visible:bg-zinc-800/50',
                    isExpanded && 'active-row-expanded bg-zinc-800/20',
                )}
                style={{ height: rowHeight }}
            >
                <td
                    className={cn(
                        isExpanded ? expandedTdClass : tdClass,
                        'w-[48px] text-center',
                    )}
                    data-column="expand-and-checkbox"
                >
                    <div className="flex items-center justify-center gap-2">
                        <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className={cn(
                                'rounded-md p-1 transition-colors',
                                isExpanded
                                    ? 'bg-[var(--accent-color)]/10 text-[var(--accent-color)]'
                                    : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200',
                            )}
                            onClick={handleExpandClick}
                            aria-expanded={isExpanded}
                        >
                            <ChevronRight size={14} />
                        </motion.div>
                        <div
                            onClick={(e) => e.stopPropagation()}
                            data-column="checkbox"
                        >
                            <input
                                type="checkbox"
                                className={cn(
                                    'h-3.5 w-3.5 cursor-pointer rounded border-zinc-700 bg-zinc-800/50 text-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] focus:ring-offset-zinc-950',
                                    isClosed
                                        ? 'opacity-20'
                                        : isExpanded
                                          ? 'opacity-100'
                                          : 'opacity-60 group-hover/row:opacity-100',
                                )}
                                checked={issue?.isChecked}
                                onChange={() =>
                                    handleSelectIssueCheckbox &&
                                    handleSelectIssueCheckbox(issue)
                                }
                            />
                        </div>
                    </div>
                </td>
                {enabledColumns.id && (
                    <td
                        className={cn(
                            isExpanded ? expandedTdClass : tdClass,
                            'w-[70px] font-semibold text-[var(--pending-color)]',
                        )}
                        data-column="id"
                    >
                        #{issue.id}
                    </td>
                )}
                {enabledColumns.title && (
                    <td
                        className={cn(
                            isExpanded ? expandedTdClass : tdClass,
                            'truncate pr-4 font-medium',
                            isClosed
                                ? 'text-zinc-500 line-through'
                                : 'text-zinc-200',
                        )}
                        data-column="title"
                    >
                        {issue.title}
                    </td>
                )}
                {enabledColumns.status && (
                    <td
                        className={isExpanded ? expandedTdClass : tdClass}
                        data-column="status"
                    >
                        <Badge
                            color={issue.status}
                            variant="default"
                            className="inline-flex h-6 items-center gap-1.5 rounded-md border border-zinc-700/20 bg-zinc-800/30 px-2 py-0.5 text-[11px] text-zinc-300"
                        >
                            <StatusDot status={issue.status} />
                            {issue.status}
                        </Badge>
                    </td>
                )}
                {enabledColumns.assignee && (
                    <td
                        className={isExpanded ? expandedTdClass : tdClass}
                        data-column="assignee"
                    >
                        <UserBadge
                            avatarSrc={issue.assignee?.avatar}
                            name={issue.assignee?.name ?? 'Unassigned'}
                            size="sm"
                        />
                    </td>
                )}
                {enabledColumns.priority && (
                    <td
                        className={isExpanded ? expandedTdClass : tdClass}
                        data-column="priority"
                    >
                        <Badge
                            color={issue.priority}
                            variant="default"
                            className="inline-flex h-6 items-center gap-1.5 rounded-md border border-zinc-700/20 bg-zinc-800/30 px-2 py-0.5"
                        >
                            <StatusDot status={issue.priority} />
                            <span
                                className={priorityTextColor({
                                    priority: issue.priority as any,
                                })}
                            >
                                {issue.priority}
                            </span>
                        </Badge>
                    </td>
                )}
                {enabledColumns.labels && (
                    <td
                        className={isExpanded ? expandedTdClass : tdClass}
                        data-column="labels"
                    >
                        <LabelList
                            labels={issue.labels || []}
                            badgeClassName="text-[10px] px-1.5 py-0.5"
                            isClosed={isClosed}
                        />
                    </td>
                )}
                {enabledColumns.updated && (
                    <td
                        className={cn(
                            isExpanded ? expandedTdClass : tdClass,
                            'whitespace-nowrap font-medium text-zinc-400',
                        )}
                        data-column="updated"
                    >
                        {formatTimeAgo(issue.updated_at)} ago
                    </td>
                )}
                <td
                    className={cn(
                        isExpanded ? expandedTdClass : tdClass,
                        'text-right',
                    )}
                    onClick={(e) => e.stopPropagation()}
                    data-column="actions"
                >
                    <IconButton
                        iconName={'Ellipsis'}
                        className={cn(
                            'rounded-md p-1 text-zinc-500 hover:bg-zinc-800/60',
                            isClosed
                                ? 'opacity-20'
                                : isExpanded
                                  ? 'opacity-100'
                                  : 'opacity-0 group-hover/row:opacity-100',
                        )}
                    >
                        ...
                    </IconButton>
                </td>
            </tr>
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <tr className="bg-zinc-800/10">
                        <td
                            colSpan={100}
                            className="border-b border-zinc-700/30 p-0"
                        >
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.25,
                                    ease: [0.23, 1, 0.32, 1],
                                }}
                                className="w-full overflow-hidden"
                            >
                                <div className="inline-block min-w-full">
                                    <IssueRowDetail
                                        issue={issue}
                                        onOpenDetails={() => onClick()}
                                    />
                                </div>
                            </motion.div>
                        </td>
                    </tr>
                )}
            </AnimatePresence>
        </>
    );
};
