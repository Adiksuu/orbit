import Badge from '@/Components/Atoms/Badge/Badge';
import { Project } from '@/types/Projects';
import { getColorTheme } from '@/utils/colors';
import { Link } from '@inertiajs/react';
import React from 'react';
import Icon from '../../Atoms/Icon/Icon';
import NavItem from '../../Molecules/NavItem/NavItem';
import UserBadge from '../../Molecules/UserBadge/UserBadge';

const Sidebar: React.FC<{ projects: Project[]; project?: Project }> = ({
    projects,
    project,
}) => {
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
                    <NavItem
                        icon="LayoutDashboard"
                        label="Dashboard"
                        badge="Ctrl D"
                        link={'/'}
                        isActive={!project}
                    />
                    <NavItem
                        icon="LayoutList"
                        label="Projects"
                        badge={'Ctrl P'}
                        link={'/projects'}
                    />
                    <NavItem icon="Inbox" label="Inbox" badge={3} />
                    <NavItem icon="Settings" label="Settings" />
                </nav>
                <div className={'mt-6 flex min-h-0 flex-1 flex-col'}>
                    <Link
                        href={'/projects/new'}
                        className={
                            'group mb-2 flex shrink-0 items-center justify-between px-3'
                        }
                    >
                        <div className="flex items-center gap-1.5">
                            <h3
                                className={
                                    'text-sm font-semibold text-zinc-400 group-hover:text-white'
                                }
                            >
                                PROJECTS
                            </h3>
                            <Icon
                                name={'PackagePlus'}
                                className={
                                    'text-zinc-400 group-hover:text-white'
                                }
                            />
                        </div>
                        <Badge className={'rounded-full'}>
                            {projects.length}
                        </Badge>
                    </Link>
                    <nav className={'flex min-h-0 flex-col overflow-y-auto'}>
                        {projects.map((projectElement: Project) => {
                            return (
                                <NavItem
                                    key={projectElement.id}
                                    icon="FolderGit2"
                                    iconClassName={`${
                                        getColorTheme(projectElement.color)
                                            .accent
                                    } h-5 w-5 rounded-md p-1`}
                                    label={
                                        projectElement.name.substring(0, 16) +
                                        '...'
                                    }
                                    link={`/projects/${projectElement.id}`}
                                    isActive={projectElement.id === project?.id}
                                />
                            );
                        })}
                    </nav>
                </div>
            </div>
            <div
                className={
                    'shrink-0 border-t border-solid border-[var(--bg-light-color)] pt-3'
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
