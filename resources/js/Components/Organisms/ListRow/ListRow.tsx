import Badge from '@/Components/Atoms/Badge/Badge';
import IconButton from '@/Components/Atoms/IconButton/IconButton';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import LabelList from '@/Components/Molecules/LabelList/LabelList';
import UserBadge from '@/Components/Molecules/UserBadge/UserBadge';
import { ListRowProps } from '@/types/Components';
import { cn } from '@/utils/cn';
import { formatTimeAgo } from '@/utils/time';
import { listRowVariants, priorityTextColor } from '@/utils/variants';

const tdClass =
    'px-4 py-2.5 border-b border-zinc-800/40 group-last/row:border-b-0 align-middle';

export const ListRow = ({
    issue,
    isActive,
    onClick,
    isClosed,
    handleSelectIssueCheckbox,
}: ListRowProps) => (
    <tr onClick={onClick} className={listRowVariants({ isActive })}>
        <td
            className={`${tdClass} w-[48px] text-center`}
            onClick={(e) => e.stopPropagation()}
        >
            <input
                type="checkbox"
                className={cn(
                    'h-3.5 w-3.5 cursor-pointer rounded border-zinc-700 bg-zinc-800/50 text-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] focus:ring-offset-zinc-950',
                    isClosed
                        ? 'opacity-20'
                        : 'opacity-60 group-hover/row:opacity-100',
                )}
                checked={issue?.isChecked}
                onChange={() =>
                    handleSelectIssueCheckbox &&
                    handleSelectIssueCheckbox(issue)
                }
            />
        </td>
        <td
            className={`${tdClass} w-[70px] font-semibold text-[var(--pending-color)]`}
        >
            #{issue.id}
        </td>
        <td
            className={`${tdClass} max-w-[300px] truncate pr-4 font-medium ${isClosed ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}
        >
            {issue.title}
        </td>
        <td className={tdClass}>
            <Badge
                color={issue.status}
                variant="default"
                className="inline-flex h-6 items-center gap-1.5 rounded-md border border-zinc-700/20 bg-zinc-800/30 px-2 py-0.5 text-[11px] text-zinc-300"
            >
                <StatusDot status={issue.status} />
                {issue.status}
            </Badge>
        </td>
        <td className={tdClass}>
            <UserBadge
                avatarSrc={issue.assignee?.avatar}
                name={issue.assignee?.name ?? 'Unassigned'}
                size="sm"
            />
        </td>
        <td className={tdClass}>
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
        <td className={tdClass}>
            <LabelList
                labels={issue.labels || []}
                badgeClassName="text-[10px] px-1.5 py-0.5"
                isClosed={isClosed}
            />
        </td>
        <td
            className={`${tdClass} whitespace-nowrap font-medium text-zinc-400`}
        >
            {formatTimeAgo(issue.updated_at)} ago
        </td>
        <td
            className={`${tdClass} text-right`}
            onClick={(e) => e.stopPropagation()}
        >
            <IconButton
                iconName={'Ellipsis'}
                className={cn(
                    'rounded-md p-1 text-zinc-500 hover:bg-zinc-800/60',
                    isClosed
                        ? 'opacity-20'
                        : 'opacity-0 group-hover/row:opacity-100',
                )}
            >
                ...
            </IconButton>
        </td>
    </tr>
);
