import React from 'react';
import Sidebar from '../Components/Organisms/Sidebar/Sidebar';
import TopNav from '../Components/Organisms/TopNav/TopNav';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.main}>
                <TopNav />
                <main className={styles.content}>{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;
