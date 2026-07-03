import { IssuePageLooks } from '@/types/Issues';
import { Project } from '@/types/Projects';
import React from 'react';
import Sidebar from '../Components/Organisms/Sidebar/Sidebar';
import TopNav from '../Components/Organisms/TopNav/TopNav';

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
        <div
            className={
                'flex h-screen w-screen overflow-hidden bg-[var(--bg-color)]'
            }
        >
            <Sidebar />
            <div className={'flex min-w-0 flex-1 flex-col'}>
                <TopNav
                    selectedLook={selectedLook}
                    setSelectedLook={setSelectedLook}
                    projects={projects}
                />
                <main className={'flex flex-1 flex-col overflow-y-auto'}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
