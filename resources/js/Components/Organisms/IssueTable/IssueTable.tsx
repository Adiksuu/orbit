import React from 'react';
import Badge from '../../Atoms/Badge/Badge';
import StatusDot from '../../Atoms/StatusDot/StatusDot';
import UserBadge from '../../Molecules/UserBadge/UserBadge';
import styles from './IssueTable.module.scss';

interface Issue {
    id: string;
    title: string;
    status: 'todo' | 'in-progress' | 'done' | 'review';
    statusText: string;
    assignee: string;
    assigneeAvatar?: string;
    priority: 'high' | 'medium' | 'low';
    labels: { text: string; color: any }[];
}

const issues: Issue[] = [
    {
        id: 'MOB-127',
        title: 'Fix crash on app launch',
        status: 'in-progress',
        statusText: 'In Progress',
        assignee: 'Sarah Chen',
        priority: 'high',
        labels: [
            { text: 'bug', color: 'bug' },
            { text: 'ios', color: 'feature' },
        ],
    },
    {
        id: 'MOB-126',
        title: 'Add offline support',
        status: 'todo',
        statusText: 'Todo',
        assignee: 'Mike Johnson',
        priority: 'high',
        labels: [
            { text: 'feature', color: 'feature' },
            { text: 'offline', color: 'performance' },
        ],
    },
    {
        id: 'MOB-125',
        title: 'Improve loading performance',
        status: 'in-progress',
        statusText: 'In Progress',
        assignee: 'Mike Johnson',
        priority: 'medium',
        labels: [{ text: 'performance', color: 'performance' }],
    },
];

const IssueTable: React.FC = () => {
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
                                issue.id === 'MOB-127' ? styles.activeRow : ''
                            }
                        >
                            <td className={styles.idCell}>{issue.id}</td>
                            <td className={styles.titleCell}>{issue.title}</td>
                            <td>
                                <div className={styles.statusCell}>
                                    <StatusDot status={issue.status} />
                                    <span>{issue.statusText}</span>
                                </div>
                            </td>
                            <td>
                                <UserBadge name={issue.assignee} size="sm" />
                            </td>
                            <td>
                                <div className={styles.priorityCell}>
                                    <Badge
                                        color={issue.priority}
                                        variant="ghost"
                                    >
                                        <StatusDot
                                            status={
                                                issue.priority === 'high'
                                                    ? 'canceled'
                                                    : issue.priority ===
                                                        'medium'
                                                      ? 'review'
                                                      : 'done'
                                            }
                                        />
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
                                    {issue.labels.map((label, idx) => (
                                        <Badge key={idx} color={label.color}>
                                            {label.text}
                                        </Badge>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.footer}>7 issues</div>
        </div>
    );
};

export default IssueTable;
