import React from 'react';
import styles from './Avatar.module.scss';

interface AvatarProps {
    src?: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg';
    initials?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', initials }) => {
    return (
        <div className={`${styles.avatar} ${styles[size]}`}>
            {src ? (
                <img src={src} alt={alt || 'Avatar'} className={styles.image} />
            ) : (
                <span className={styles.initials}>{initials}</span>
            )}
        </div>
    );
};

export default Avatar;
