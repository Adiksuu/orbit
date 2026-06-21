import { Issue } from '@/types/Issues';
import { useState } from 'react';
import FilterBar from '../Components/Organisms/FilterBar/FilterBar';
import IssueDetail from '../Components/Organisms/IssueDetail/IssueDetail';
import IssueTable from '../Components/Organisms/IssueTable/IssueTable';
import MainLayout from '../Layouts/MainLayout';
import styles from './Dashboard.module.scss';

export default function Dashboard({ issues }: { issues: Issue[] }) {
    const [activeIssue, setActiveIssue] = useState<Issue | null>(null);

    return (
        <MainLayout>
            <div className={styles.dashboard}>
                <FilterBar />
                <div className={styles.mainContent}>
                    <div className={styles.tableContainer}>
                        <IssueTable
                            issues={issues}
                            activeIssue={activeIssue}
                            setActiveIssue={setActiveIssue}
                        />
                    </div>
                    {activeIssue && (
                        <div className={styles.detailContainer}>
                            <IssueDetail
                                activeIssue={activeIssue}
                                setActiveIssue={setActiveIssue}
                            />
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
