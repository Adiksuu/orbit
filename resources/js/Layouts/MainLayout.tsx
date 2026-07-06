import { MainLayoutProps } from '@/types/Components';
import React from 'react';
import Sidebar from '../Components/Organisms/Sidebar/Sidebar';
import TopNav from '../Components/Organisms/TopNav/TopNav';

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    selectedLook,
    setSelectedLook,
    projects,
    project,
}) => {
    return (
        <div
            className={
                'flex h-screen w-screen overflow-hidden bg-[var(--bg-color)]'
            }
        >
            <Sidebar projects={projects} project={project} />
            <div className={'flex min-w-0 flex-1 flex-col'}>
                <TopNav
                    selectedLook={selectedLook}
                    setSelectedLook={setSelectedLook}
                    project={project}
                />
                <main className={'flex flex-1 flex-col overflow-y-auto'}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
