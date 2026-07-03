import { Project, ProjectColors } from '@/types/Projects';
import React from 'react';
import Icon from '../../Atoms/Icon/Icon';
import NavItem from '../../Molecules/NavItem/NavItem';
import UserBadge from '../../Molecules/UserBadge/UserBadge';

const Sidebar: React.FC<{ projects: Project[] }> = ({ projects }) => {
    const getTailwindColorFromName = (colorName: ProjectColors) => {
        const colors = {
            red: 'bg-red-500',
            orange: 'bg-orange-500',
            yellow: 'bg-yellow-500',
            green: 'bg-green-500',
            lime: 'bg-lime-500',
            blue: 'bg-blue-500',
            sky: 'bg-sky-500',
            violet: 'bg-violet-500',
            purple: 'bg-purple-500',
            pink: 'bg-pink-500',
        };

        return colors[colorName];
    };

    return (
        <aside
            className={
                'flex h-screen w-[240px] shrink-0 flex-col justify-between border-r border-solid border-r-[var(--bg-light-color)] bg-[var(--bg-dark-color)] p-3'
            }
        >
            <div className="flex min-h-0 flex-1 flex-col">
                <div
                    className={
                        'mb-4 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-[var(--bg-light-color)]'
                    }
                >
                    <UserBadge
                        name="Acme Inc."
                        avatarSrc="/path/to/avatar.png"
                        size="sm"
                    />
                    <Icon name="ChevronDown" size={14} color="#999" />
                </div>
                <nav className={'flex shrink-0 flex-col'}>
                    <NavItem icon="Search" label="Search" badge="Ctrl K" />
                    <NavItem icon="Inbox" label="Inbox" badge={3} />
                    <NavItem icon="Settings" label="Settings" />
                </nav>
                <div className={'mt-6 flex min-h-0 flex-1 flex-col'}>
                    <h3
                        className={
                            'mb-2 shrink-0 px-3 text-sm font-semibold text-zinc-400'
                        }
                    >
                        PROJECTS
                    </h3>
                    <nav className={'flex min-h-0 flex-col overflow-y-auto'}>
                        {projects.map((project: Project) => {
                            return (
                                <NavItem
                                    key={project.id}
                                    icon="FolderGit2"
                                    iconClassName={`${getTailwindColorFromName(
                                        project.color,
                                    )} h-5 w-5 rounded-md p-1`}
                                    label={
                                        project.name.substring(0, 16) + '...'
                                    }
                                />
                            );
                        })}
                    </nav>
                </div>
            </div>
            <div
                className={
                    'shrink-0 border-t border-solid border-[var(--bg-light-color)] py-3'
                }
            >
                <div
                    className={
                        'flex cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-[var(--bg-light-color)]'
                    }
                >
                    <UserBadge
                        name="John Doe"
                        email="john@acme.com"
                        avatarSrc="/path/to/user.png"
                        size="md"
                        showDetails
                    />
                    <Icon name="ChevronDown" size={14} color="#999" />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
