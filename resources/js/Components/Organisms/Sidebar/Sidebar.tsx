import React from 'react';
import Icon from '../../Atoms/Icon/Icon';
import NavItem from '../../Molecules/NavItem/NavItem';
import UserBadge from '../../Molecules/UserBadge/UserBadge';

const Sidebar: React.FC = () => {
    return (
        <aside
            className={
                'flex h-screen w-[240px] shrink-0 flex-col justify-between border-r border-solid border-r-[var(--bg-light-color)] bg-[var(--bg-dark-color)] p-3'
            }
        >
            <div>
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
                <nav className={'flex flex-col'}>
                    <NavItem icon="Search" label="Search" badge="Ctrl K" />
                    <NavItem icon="Inbox" label="Inbox" badge={3} />
                    <NavItem icon="Settings" label="Settings" />
                </nav>
                <div className={'mt-6'}>
                    <h3
                        className={
                            'mb-2 px-3 text-sm font-semibold text-zinc-400'
                        }
                    >
                        PROJECTS
                    </h3>
                    <nav className={'flex flex-col'}>
                        <NavItem
                            icon="Smartphone"
                            label="Mobile App"
                            isActive
                        />
                        <NavItem icon="Globe" label="Web App" />
                        <NavItem icon="Database" label="API" />
                        <NavItem icon="LayoutDashboard" label="Design System" />
                        <NavItem icon="Server" label="Infrastructure" />
                    </nav>
                </div>
            </div>
            <div
                className={
                    'border-t border-solid border-[var(--bg-light-color)] py-3'
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
