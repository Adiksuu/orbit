import React from 'react';
import Icon from '../../Atoms/Icon/Icon';
import NavItem from '../../Molecules/NavItem/NavItem';
import UserBadge from '../../Molecules/UserBadge/UserBadge';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.top}>
                <div className={styles.brand}>
                    <UserBadge
                        name="Acme Inc."
                        avatarSrc="/path/to/avatar.png"
                        size="sm"
                    />
                    <Icon name="ChevronDown" size={14} color="#999" />
                </div>

                <nav className={styles.navGroup}>
                    <NavItem icon="Search" label="Search" badge="Ctrl K" />
                    <NavItem icon="Inbox" label="Inbox" badge={3} />
                    <NavItem icon="Settings" label="Settings" />
                </nav>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>FAVORITES</h3>
                    <nav className={styles.navGroup}>
                        <NavItem icon="User" label="My issues" />
                        <NavItem icon="Map" label="Roadmap" />
                        <NavItem icon="Layers" label="Backlog" />
                    </nav>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>SPACES</h3>
                    <nav className={styles.navGroup}>
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

            <div className={styles.bottom}>
                <div className={styles.userProfile}>
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
