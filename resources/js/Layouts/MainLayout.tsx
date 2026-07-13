import { useModal } from '@/context/ModalContext';
import { useShortcuts } from '@/context/ShortcutContext';
import { MainLayoutProps } from '@/types/Components';
import { ShortcutDefinition } from '@/types/Shortcuts';
import { router } from '@inertiajs/react';
import React, { useMemo } from 'react';
import Sidebar from '../Components/Organisms/Sidebar/Sidebar';
import TopNav from '../Components/Organisms/TopNav/TopNav';

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    selectedLook,
    setSelectedLook,
    projects,
    project,
}) => {
    const { closeAllModals } = useModal();

    const shortcuts = useMemo(
        (): ShortcutDefinition[] => [
            {
                key: 'alt+p',
                description: 'Go to Projects',
                category: 'Navigation',
                action: () => router.visit('/projects'),
            },
            {
                key: 'alt+b',
                description: 'Go to Dashboard',
                category: 'Navigation',
                action: () => router.visit('/'),
            },
            {
                key: 'escape',
                description: 'Closes modal',
                category: 'View',
                action: () => {
                    closeAllModals();
                    const searchInput = document.querySelector(
                        'input[type="text"]',
                    ) as HTMLInputElement;
                    if (searchInput) searchInput.blur();
                },
            },
            {
                key: 'ctrl+f',
                description: 'Focus Search',
                category: 'Search',
                action: () => {
                    const searchInput = document.querySelector(
                        'input[type="text"]',
                    ) as HTMLInputElement;
                    if (searchInput) searchInput.focus();
                },
            },
        ],
        [closeAllModals],
    );

    useShortcuts(shortcuts);

    return (
        <div
            className={
                'flex h-screen w-screen overflow-hidden bg-[var(--bg-color)]'
            }
        >
            <Sidebar projects={projects} />
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
