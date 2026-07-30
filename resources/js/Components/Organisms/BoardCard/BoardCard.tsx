import Avatar from '@/Components/Atoms/Avatar/Avatar';
import Badge from '@/Components/Atoms/Badge/Badge';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import LabelList from '@/Components/Molecules/LabelList/LabelList';
import { BoardCardProps } from '@/types/Components';
import { cn } from '@/utils/cn';
import { boardCardVariants } from '@/utils/variants';

export const BoardCard = ({
    issue,
    isActive,
    onClick,
    isClosed,
}: BoardCardProps) => (
    <div
        onClick={onClick}
        className={boardCardVariants({ isActive, isClosed })}
    >
        <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5">
                <StatusDot status={isClosed ? issue.status : issue.priority} />
                <span className="truncate text-[11px] font-semibold text-zinc-500">
                    {issue.assignee?.name || 'Unassigned'}
                </span>
            </div>
            <span className="shrink-0 font-mono text-[10px] font-medium text-zinc-600">
                #{issue.id}
            </span>
        </div>
        <h4
            className={cn(
                'line-clamp-2 text-[13px] font-medium leading-snug text-zinc-200',
                isClosed && 'text-zinc-500 line-through',
            )}
        >
            {issue.title}
        </h4>
        {issue.labels && issue.labels.length > 0 && (
            <LabelList
                labels={issue.labels}
                variant="default"
                badgeClassName="px-1.5 py-0.5 text-[9px]"
            />
        )}
        <div className="mt-0.5 flex items-center justify-between gap-2 border-t border-white/[0.04] pt-2.5">
            <Badge
                color={issue.status}
                variant="default"
                className="flex items-center gap-1.5"
            >
                <StatusDot status={issue.status} />
                <span>{issue.status}</span>
            </Badge>
            {issue.assignee ? (
                <Avatar
                    src={issue.assignee.avatar}
                    alt={issue.assignee.name}
                    initials={issue.assignee.name.charAt(0)}
                    size="sm"
                />
            ) : (
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-dashed border-zinc-700 bg-zinc-900 text-[8px] text-zinc-500">
                    -
                </div>
            )}
        </div>
    </div>
);
