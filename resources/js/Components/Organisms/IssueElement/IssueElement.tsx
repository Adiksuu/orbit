import Badge from '@/Components/Atoms/Badge/Badge';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import UserBadge from '@/Components/Molecules/UserBadge/UserBadge';
import styles from '@/Components/Organisms/IssueTable/IssueTable.module.scss';
import { Issue } from '@/types/Issues';

interface IssueElementProps {
    issue: Issue;
    activeIssue: Issue | null;
    setActiveIssue: (issue: Issue | null) => void;
}

export const IssueElement = ({
    issue,
    activeIssue,
    setActiveIssue,
}: IssueElementProps) => {
    return (
        <tr
            key={issue.id}
            className={
                activeIssue
                    ? issue.id === activeIssue.id
                        ? styles.activeRow
                        : ''
                    : ''
            }
            onClick={() => setActiveIssue(issue)}
        >
            <td className={styles.idCell}>{issue.id}</td>
            <td className={styles.titleCell}>{issue.title}</td>
            <td>
                <div className={styles.statusCell}>
                    <StatusDot status={issue.status} />
                    <span>{issue.status}</span>
                </div>
            </td>
            <td>
                <UserBadge
                    avatarSrc={
                        issue.assignee ? issue.assignee.avatar : undefined
                    }
                    name={issue.assignee ? issue.assignee.name : 'Unassigned'}
                    size="sm"
                />
            </td>
            <td>
                <div className={styles.priorityCell}>
                    <Badge color={issue.priority} variant="ghost">
                        <StatusDot status={issue.priority} />
                    </Badge>
                    <span className={styles[issue.priority]}>
                        {issue.priority.charAt(0).toUpperCase() +
                            issue.priority.slice(1)}
                    </span>
                </div>
            </td>
            <td>
                <div className={styles.labelsCell}>
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
