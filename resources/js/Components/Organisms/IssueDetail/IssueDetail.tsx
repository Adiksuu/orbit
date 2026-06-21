import { Issue } from '@/types/Issues';
import { formatDate, formatTimeAgo } from '@/utils/time';
import Badge from '../../Atoms/Badge/Badge';
import Icon from '../../Atoms/Icon/Icon';
import StatusDot from '../../Atoms/StatusDot/StatusDot';
import Comment from '../../Molecules/Comment/Comment';
import UserBadge from '../../Molecules/UserBadge/UserBadge';
import styles from './IssueDetail.module.scss';

interface IssueDetailProps {
    activeIssue: Issue;
    setActiveIssue: (issue: Issue | null) => void;
}

const IssueDetail = ({ activeIssue, setActiveIssue }: IssueDetailProps) => {
    return (
        <div className={styles.issueDetail}>
            <div className={styles.header}>
                <span className={styles.issueId}>{activeIssue.title}</span>
                <div className={styles.actions}>
                    <button className={styles.iconButton}>
                        <Icon name="Pencil" size={14} color="#999" />
                    </button>
                    <button
                        className={styles.iconButton}
                        onClick={() => setActiveIssue(null)}
                    >
                        <Icon name="X" size={14} color="#999" />
                    </button>
                </div>
            </div>

            <div className={styles.content}>
                <h2 className={styles.title}>Fix crash on app launch</h2>
                <div className={styles.meta}>
                    <UserBadge
                        avatarSrc={activeIssue.assignee?.avatar}
                        name={
                            activeIssue.assignee
                                ? activeIssue.assignee.name
                                : 'Unassigned'
                        }
                        size="sm"
                    />
                    <span className={styles.time}>
                        {formatTimeAgo(activeIssue.updated_at)} ago •
                        {activeIssue.updated_at === activeIssue.created_at
                            ? ' opened'
                            : ' updated'}
                    </span>
                </div>

                <p className={styles.description}>{activeIssue.description}</p>

                <div className={styles.properties}>
                    <div className={styles.property}>
                        <span className={styles.propLabel}>Status</span>
                        <div className={styles.propValue}>
                            <StatusDot status={activeIssue.status} />
                            <span>{activeIssue.status}</span>
                        </div>
                    </div>
                    <div className={styles.property}>
                        <span className={styles.propLabel}>Priority</span>
                        <div className={styles.propValue}>
                            <StatusDot
                                status={activeIssue.priority}
                                size="sm"
                            />
                            <span className={styles[activeIssue.priority]}>
                                {activeIssue.priority}
                            </span>
                        </div>
                    </div>
                    <div className={styles.property}>
                        <span className={styles.propLabel}>Assignee</span>
                        <div className={styles.propValue}>
                            <UserBadge
                                avatarSrc={activeIssue.assignee?.avatar}
                                name={
                                    activeIssue.assignee
                                        ? activeIssue.assignee.name
                                        : 'Unassigned'
                                }
                                size="sm"
                            />
                        </div>
                    </div>
                    <div className={styles.property}>
                        <span className={styles.propLabel}>Labels</span>
                        <div className={styles.propValue}>
                            {activeIssue.labels?.map((label, idx) => (
                                <Badge key={idx} color={label}>
                                    {label}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className={styles.property}>
                        <span className={styles.propLabel}>Created</span>
                        <div className={styles.propValue}>
                            {formatDate(activeIssue.created_at)}
                        </div>
                    </div>
                    <div className={styles.property}>
                        <span className={styles.propLabel}>Modified</span>
                        <div className={styles.propValue}>
                            {formatDate(activeIssue.updated_at)}
                        </div>
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
