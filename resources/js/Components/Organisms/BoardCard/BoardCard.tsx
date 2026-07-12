import Avatar from '@/Components/Atoms/Avatar/Avatar';
import Badge from '@/Components/Atoms/Badge/Badge';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import LabelList from '@/Components/Molecules/LabelList/LabelList';
import { BoardCardProps } from '@/types/Components';
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
        <div className="flex items-center gap-1.5">
            <StatusDot status={isClosed ? issue.status : issue.priority} />
            <span className="text-xs font-semibold text-zinc-500">
                {issue.assignee?.name || 'Unassigned'}
            </span>
        </div>
        <h4
            className={`line-clamp-2 text-xs font-medium leading-snug ${isClosed ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}
        >
            {issue.title}
        </h4>
        <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-1.5">
                <Badge
                    color={issue.status}
                    variant="default"
                    className="flex gap-1.5"
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
            {issue.assignee ? (
                <Avatar
                    src={issue.assignee.avatar}
                    alt={issue.assignee.name}
                    initials={issue.assignee.name.charAt(0)}
                    size="sm"
                />
            ) : (
                <div className="flex h-4 w-4 items-center justify-center rounded-md border border-dashed border-zinc-700 bg-zinc-900 text-[8px] text-zinc-500">
                    -
                </div>
            )}
        </div>
    </div>
);
