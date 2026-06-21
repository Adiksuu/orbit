import { Issue } from '@/types/Issues';
import FilterBar from '../Components/Organisms/FilterBar/FilterBar';
import IssueDetail from '../Components/Organisms/IssueDetail/IssueDetail';
import IssueTable from '../Components/Organisms/IssueTable/IssueTable';
import MainLayout from '../Layouts/MainLayout';
import styles from './Dashboard.module.scss';

export default function Dashboard({ issues }: { issues: Issue[] }) {
    console.log(issues);
    return (
        <MainLayout>
            <div className={styles.dashboard}>
                <FilterBar />
                <div className={styles.mainContent}>
                    <div className={styles.tableContainer}>
                        <IssueTable issues={issues} />
                    </div>
                    <div className={styles.detailContainer}>
                        <IssueDetail />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
