import { IssuePageLooks } from '@/types/Issues';
import React from 'react';
import Sidebar from '../Components/Organisms/Sidebar/Sidebar';
import TopNav from '../Components/Organisms/TopNav/TopNav';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
    children: React.ReactNode;
    selectedLook: IssuePageLooks;
    setSelectedLook: (look: IssuePageLooks) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    selectedLook,
    setSelectedLook,
}) => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.main}>
                <TopNav
                    selectedLook={selectedLook}
                    setSelectedLook={setSelectedLook}
                />
                <main className={styles.content}>{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;
