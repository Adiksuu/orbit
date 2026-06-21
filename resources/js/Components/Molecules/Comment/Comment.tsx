import React from 'react';
import UserBadge from '../UserBadge/UserBadge';
import styles from './Comment.module.scss';

interface CommentProps {
    userName: string;
    avatarSrc?: string;
    timestamp: string;
    content: string;
}

const Comment: React.FC<CommentProps> = ({
    userName,
    avatarSrc,
    timestamp,
    content,
}) => {
    return (
        <div className={styles.comment}>
            <div className={styles.header}>
                <UserBadge name={userName} avatarSrc={avatarSrc} size="sm" />
                <span className={styles.timestamp}>{timestamp}</span>
            </div>
            <div className={styles.content}>{content}</div>
        </div>
    );
};

export default Comment;
