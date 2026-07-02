import { IssuePageLooks } from '@/types/Issues';
import { Project } from '@/types/Projects';
import React from 'react';
import Sidebar from '../Components/Organisms/Sidebar/Sidebar';
import TopNav from '../Components/Organisms/TopNav/TopNav';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
    children: React.ReactNode;
    selectedLook: IssuePageLooks;
    setSelectedLook: (look: IssuePageLooks) => void;
    projects: Project[];
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    selectedLook,
    setSelectedLook,
    projects,
}) => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.main}>
                <TopNav
                    selectedLook={selectedLook}
                    setSelectedLook={setSelectedLook}
                    projects={projects}
                />
                <main className={styles.content}>{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;
