import React from 'react';
import FilterBar from '../Components/Organisms/FilterBar/FilterBar';
import IssueDetail from '../Components/Organisms/IssueDetail/IssueDetail';
import IssueTable from '../Components/Organisms/IssueTable/IssueTable';
import MainLayout from '../Layouts/MainLayout';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
    return (
        <MainLayout>
            <div className={styles.dashboard}>
                <FilterBar />
                <div className={styles.mainContent}>
                    <div className={styles.tableContainer}>
                        <IssueTable />
                    </div>
                    <div className={styles.detailContainer}>
                        <IssueDetail />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
