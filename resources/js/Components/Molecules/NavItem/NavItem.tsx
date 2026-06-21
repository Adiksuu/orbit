import { icons } from 'lucide-react';
import React from 'react';
import Icon from '../../Atoms/Icon/Icon';
import styles from './NavItem.module.scss';

interface NavItemProps {
    icon: keyof typeof icons;
    label: string;
    isActive?: boolean;
    badge?: string | number;
    onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
    icon,
    label,
    isActive,
    badge,
    onClick,
}) => {
    return (
        <div
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            <div className={styles.content}>
                <Icon
                    name={icon}
                    size={18}
                    color={isActive ? '#f3f3f3' : '#999'}
                />
                <span className={styles.label}>{label}</span>
            </div>
            {badge !== undefined && (
                <span className={styles.badge}>{badge}</span>
            )}
        </div>
    );
};

export default NavItem;
