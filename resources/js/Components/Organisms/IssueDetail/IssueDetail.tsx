import React from 'react';
import Badge from '../../Atoms/Badge/Badge';
import Icon from '../../Atoms/Icon/Icon';
import StatusDot from '../../Atoms/StatusDot/StatusDot';
import Comment from '../../Molecules/Comment/Comment';
import UserBadge from '../../Molecules/UserBadge/UserBadge';
import styles from './IssueDetail.module.scss';

const IssueDetail: React.FC = () => {
    return (
        <div className={styles.issueDetail}>
            <div className={styles.header}>
                <span className={styles.issueId}>MOB-127</span>
                <div className={styles.actions}>
                    <button className={styles.iconButton}>
                        <Icon name="Pencil" size={14} color="#999" />
                    </button>
                    <button className={styles.iconButton}>
                        <Icon name="Link" size={14} color="#999" />
                    </button>
                    <button className={styles.iconButton}>
                        <Icon name="Ellipsis" size={14} color="#999" />
                    </button>
                    <button className={styles.iconButton}>
                        <Icon name="X" size={14} color="#999" />
                    </button>
                </div>
            </div>

            <div className={styles.content}>
                <h2 className={styles.title}>Fix crash on app launch</h2>
                <div className={styles.meta}>
                    <UserBadge name="Sarah Chen" size="sm" />
                    <span className={styles.time}>2h ago • Edited</span>
                </div>

                <p className={styles.description}>
                    Users are experiencing crashes on app launch on iOS 17.2.
                    Reproduced on iPhone 15 Pro.
                </p>

                <div className={styles.properties}>
                    <div className={styles.property}>
                        <span className={styles.propLabel}>Status</span>
                        <div className={styles.propValue}>
                            <StatusDot status="in-progress" />
                            <span>In Progress</span>
                        </div>
                    </div>
                    <div className={styles.property}>
                        <span className={styles.propLabel}>Priority</span>
                        <div className={styles.propValue}>
                            <StatusDot status="canceled" size="sm" />
                            <span className={styles.high}>High</span>
                        </div>
                    </div>
                    <div className={styles.property}>
                        <span className={styles.propLabel}>Assignee</span>
                        <div className={styles.propValue}>
                            <UserBadge name="Sarah Chen" size="sm" />
                        </div>
                    </div>
                    <div className={styles.property}>
                        <span className={styles.propLabel}>Labels</span>
                        <div className={styles.propValue}>
                            <Badge color="bug">bug</Badge>
                            <Badge color="feature">ios</Badge>
                        </div>
                    </div>
                    <div className={styles.property}>
                        <span className={styles.propLabel}>Sprint</span>
                        <div className={styles.propValue}>Sprint 12</div>
                    </div>
                    <div className={styles.property}>
                        <span className={styles.propLabel}>Due date</span>
                        <div className={styles.propValue}>May 24, 2024</div>
                    </div>
                </div>

                <div className={styles.commentsSection}>
                    <div className={styles.tabs}>
                        <button className={styles.tabActive}>
                            Comments <Badge variant="default">2</Badge>
                        </button>
                        <button className={styles.tab}>Activity</button>
                    </div>

                    <div className={styles.commentsList}>
                        <Comment
                            userName="Mike Johnson"
                            timestamp="1h ago"
                            content="I'm on it. Should have a fix soon."
                        />
                    </div>

                    <div className={styles.commentInputContainer}>
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className={styles.commentInput}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueDetail;
