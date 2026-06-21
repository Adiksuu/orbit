import React from 'react';
import styles from './StatusDot.module.scss';

interface StatusDotProps {
    status: 'todo' | 'in-progress' | 'done' | 'review' | 'backlog' | 'canceled';
    size?: 'sm' | 'md';
}

const StatusDot: React.FC<StatusDotProps> = ({ status, size = 'sm' }) => {
    return (
        <span className={`${styles.dot} ${styles[status]} ${styles[size]}`} />
    );
};

export default StatusDot;
