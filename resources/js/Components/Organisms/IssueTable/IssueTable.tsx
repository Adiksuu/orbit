import { Issue } from '@/types/Issues';
import Badge from '../../Atoms/Badge/Badge';
import StatusDot from '../../Atoms/StatusDot/StatusDot';
import UserBadge from '../../Molecules/UserBadge/UserBadge';
import styles from './IssueTable.module.scss';

interface IssueTableProps {
    issues: Issue[];
    activeIssue: Issue | null;
    setActiveIssue: (issue: Issue | null) => void;
}

const IssueTable = ({
    issues,
    activeIssue,
    setActiveIssue,
}: IssueTableProps) => {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.idCell}>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Assignee</th>
                        <th>Priority</th>
                        <th>Labels</th>
                    </tr>
                </thead>
                <tbody>
                    {issues.map((issue) => (
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
                                        issue.assignee
                                            ? issue.assignee.avatar
                                            : undefined
                                    }
                                    name={
                                        issue.assignee
                                            ? issue.assignee.name
                                            : 'Unassigned'
                                    }
                                    size="sm"
                                />
                            </td>
                            <td>
                                <div className={styles.priorityCell}>
                                    <Badge
                                        color={issue.priority}
                                        variant="ghost"
                                    >
                                        <StatusDot status={issue.priority} />
                                    </Badge>
                                    <span className={styles[issue.priority]}>
                                        {issue.priority
                                            .charAt(0)
                                            .toUpperCase() +
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
                    ))}
                </tbody>
            </table>
            <div className={styles.footer}>{issues.length || 0} issues</div>
        </div>
    );
};

export default IssueTable;
