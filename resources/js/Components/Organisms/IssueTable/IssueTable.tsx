import React from 'react';
import Badge from '../../Atoms/Badge/Badge';
import StatusDot from '../../Atoms/StatusDot/StatusDot';
import UserBadge from '../../Molecules/UserBadge/UserBadge';
import styles from './IssueTable.module.scss';

type IssueLabel = 'bug' | 'feature' | 'performance' | 'design' | 'ux' | 'chore';

interface Issue {
    id: string;
    title: string;
    description?: string;
    status: 'open' | 'closed';
    priority: 'high' | 'medium' | 'low';
    project_id: number;
    user_id: number;
    assignee_id?: number;
    created_at?: number;
    updated_at?: number;
    labels?: IssueLabel[];
}

const issues: Issue[] = [
    {
        id: 'MOB-127',
        title: 'Fix crash on app launch',
        status: 'open',
        priority: 'high',
        project_id: 1,
        user_id: 2,
        assignee_id: 3,
        labels: ['bug', 'performance'],
    },
    {
        id: 'MOB-1272',
        title: 'Fix crash on app launch',
        status: 'closed',
        priority: 'low',
        project_id: 1,
        user_id: 2,
        assignee_id: 3,
        labels: ['feature'],
    },
    {
        id: 'MOB-1227',
        title: 'Fix crash on app launch',
        status: 'open',
        priority: 'medium',
        project_id: 1,
        user_id: 2,
        assignee_id: 3,
        labels: ['bug', 'ux'],
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
                                    <span>{issue.status}</span>
                                </div>
                            </td>
                            <td>
                                <UserBadge name={issue.title} size="sm" />
                                {/*<UserBadge name={issue.assignee_id} size="sm" />*/}
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
            <div className={styles.footer}>7 issues</div>
        </div>
    );
};

export default IssueTable;
