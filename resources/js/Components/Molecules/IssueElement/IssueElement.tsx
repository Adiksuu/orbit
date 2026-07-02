import Badge from '@/Components/Atoms/Badge/Badge';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import UserBadge from '@/Components/Molecules/UserBadge/UserBadge';
import { Issue } from '@/types/Issues';
import { cva } from 'class-variance-authority';

interface IssueElementProps {
    issue: Issue;
    activeIssue: Issue | null;
    setActiveIssue: (issue: Issue | null) => void;
}

type Priority = 'high' | 'medium' | 'low';

const priorityTextColor = cva('', {
    variants: {
        priority: {
            high: 'text-[#f44336]',
            medium: 'text-[#ff9800]',
            low: 'text-[#4caf50]',
        },
    },
});

export const IssueElement = ({
    issue,
    activeIssue,
    setActiveIssue,
}: IssueElementProps) => {
    const isActive = activeIssue?.id === issue.id;

    return (
        <tr
            onClick={() => setActiveIssue(issue)}
            className={`cursor-pointer border-b border-solid border-[var(--bg-light-color)] transition-colors duration-100 hover:bg-[rgba(var(--bg-light-color-rgb),0.2)] ${isActive ? 'bg-[rgba(var(--bg-light-color-rgb),0.2)]' : ''} `}
        >
            <td className="w-[100px] px-4 py-2 text-[var(--text-gray-color)]">
                {issue.id}
            </td>
            <td className="px-4 py-2 font-medium text-[var(--text-color)]">
                {issue.title}
            </td>
            <td className="px-4 py-2">
                <div className="flex items-center gap-2 text-[var(--text-gray-color)]">
                    <StatusDot status={issue.status} />
                    <span>{issue.status}</span>
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
                    <Badge color={issue.priority} variant="ghost">
                        <StatusDot status={issue.priority} />
                    </Badge>
                    <span
                        className={priorityTextColor({
                            priority: issue.priority as Priority,
                        })}
                    >
                        {issue.priority.charAt(0).toUpperCase() +
                            issue.priority.slice(1)}
                    </span>
                </div>
            </td>
            <td className="px-4 py-2">
                <div className="flex gap-1.5">
                    {issue.labels?.map((label, idx) => (
                        <Badge key={idx} color={label}>
                            {label}
                        </Badge>
                    ))}
                </div>
            </td>
        </tr>
    );
};

export default IssueElement;
