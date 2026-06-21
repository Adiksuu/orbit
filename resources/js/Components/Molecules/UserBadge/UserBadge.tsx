import React from 'react';
import Avatar from '../../Atoms/Avatar/Avatar';
import styles from './UserBadge.module.scss';

interface UserBadgeProps {
    name: string;
    email?: string;
    avatarSrc?: string;
    size?: 'sm' | 'md' | 'lg';
    showDetails?: boolean;
}

const UserBadge: React.FC<UserBadgeProps> = ({
    name,
    email,
    avatarSrc,
    size = 'md',
    showDetails = false,
}) => {
    return (
        <div className={`${styles.userBadge} ${styles[size]}`}>
            <Avatar src={avatarSrc} initials={name.charAt(0)} size={size} />
            <div className={styles.info}>
                <span className={styles.name}>{name}</span>
                {showDetails && email && (
                    <span className={styles.email}>{email}</span>
                )}
            </div>
        </div>
    );
};

export default UserBadge;
