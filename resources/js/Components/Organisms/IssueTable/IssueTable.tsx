import { IssueElement } from '@/Components/Organisms/IssueElement/IssueElement';
import { Issue } from '@/types/Issues';
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
                        <IssueElement
                            activeIssue={activeIssue}
                            issue={issue}
                            setActiveIssue={setActiveIssue}
                            key={issue.id}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IssueTable;
