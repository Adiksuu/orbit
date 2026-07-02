import DropdownItem from '@/Components/Atoms/DropdownItem/DropdownItem';
import DropdownTrigger from '@/Components/Atoms/DropdownTrigger/DropdownTrigger';
import { Issue } from '@/types/Issues';
import { formatDate, formatTimeAgo } from '@/utils/time';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Badge from '../../Atoms/Badge/Badge';
import DropdownMenu from '../../Atoms/DropdownMenu/DropdownMenu';
import Icon from '../../Atoms/Icon/Icon';
import Input from '../../Atoms/Input/Input';
import StatusDot from '../../Atoms/StatusDot/StatusDot';
import TextArea from '../../Atoms/TextArea/TextArea';
import UserBadge from '../../Molecules/UserBadge/UserBadge';
import styles from './IssueDetail.module.scss';

interface IssueDetailProps {
    activeIssue: Issue;
    setActiveIssue: (issue: Issue | null) => void;
}
type Status = 'open' | 'closed';
type Priority = 'high' | 'medium' | 'low';
type Label = 'bug' | 'feature' | 'performance' | 'design' | 'ux' | 'chore';

const IssueDetail = ({ activeIssue, setActiveIssue }: IssueDetailProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isPriorityOpen, setIsPriorityOpen] = useState(false);

    const { data, setData, patch, processing } = useForm({
        title: activeIssue.title,
        description: activeIssue.description || '',
        status: activeIssue.status,
        priority: activeIssue.priority,
        labels: activeIssue.labels || [],
    });

    const handleSave = () => {
        patch(route('issues.update', activeIssue.id), {
            onSuccess: () => setIsEditing(false),
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setData({
            title: activeIssue.title,
            description: activeIssue.description || '',
            status: activeIssue.status,
            priority: activeIssue.priority,
            labels: activeIssue.labels || [],
        });
    };

    const statuses: string[] = ['open', 'closed'];
    const priorities: string[] = ['high', 'medium', 'low'];

    useEffect(() => {
        handleCancel();
    }, [activeIssue]);

    return (
        <div className={styles.issueDetail}>
            <div className={styles.header}>
                <span className={styles.issueId}>{activeIssue.title}</span>
                <div className={styles.actions}>
                    {isEditing ? (
                        <>
                            <button
                                className={styles.iconButton}
                                onClick={handleSave}
                                disabled={processing}
                            >
                                <Icon name="Check" size={14} color="#4caf50" />
                            </button>
                            <button
                                className={styles.iconButton}
                                onClick={handleCancel}
                            >
                                <Icon name="X" size={14} color="#f44336" />
                            </button>
                        </>
                    ) : (
                        <button
                            className={styles.iconButton}
                            onClick={() => setIsEditing(true)}
                        >
                            <Icon name="Pencil" size={14} color="#999" />
                        </button>
                    )}
                    <button
                        className={styles.iconButton}
                        onClick={() => setActiveIssue(null)}
                    >
                        <Icon name="X" size={14} color="#999" />
                    </button>
                </div>
            </div>

            <div className={styles.content}>
                {isEditing ? (
                    <div className={styles.editForm}>
                        <div className={styles.field}>
                            <label className={styles.propLabel}>Title</label>
                            <Input
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                placeholder="Issue title"
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.propLabel}>
                                Description
                            </label>
                            <TextArea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                placeholder="Issue description"
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className={styles.title}>{activeIssue.title}</h2>
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
                                {activeIssue.updated_at ===
                                activeIssue.created_at
                                    ? ' opened'
                                    : ' updated'}
                            </span>
                        </div>

                        <p className={styles.description}>
                            {activeIssue.description}
                        </p>
                    </>
                )}

                <div className={styles.properties}>
                    <div className={styles.property}>
                        <span className={styles.propLabel}>Status</span>
                        <div className={styles.propValue}>
                            {isEditing ? (
                                <>
                                    <DropdownTrigger
                                        label={
                                            <>
                                                <StatusDot
                                                    status={data['status']}
                                                />
                                                <span>{data['status']}</span>
                                            </>
                                        }
                                        onClick={() => setIsOpen(!isOpen)}
                                    />
                                    {isOpen && (
                                        <DropdownMenu>
                                            {statuses.map((option: string) => (
                                                <DropdownItem
                                                    key={option}
                                                    label={
                                                        <>
                                                            <StatusDot
                                                                status={
                                                                    option as Status
                                                                }
                                                            />
                                                            <span>
                                                                {option}
                                                            </span>
                                                        </>
                                                    }
                                                    isActive={
                                                        data['status'] ===
                                                        option
                                                    }
                                                    onClick={() => {
                                                        setData(
                                                            'status',
                                                            option as Status,
                                                        );
                                                        setIsOpen(false);
                                                    }}
                                                />
                                            ))}
                                        </DropdownMenu>
                                    )}
                                </>
                            ) : (
                                <>
                                    <StatusDot status={activeIssue.status} />
                                    <span>{activeIssue.status}</span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={styles.property}>
                        <span className={styles.propLabel}>Priority</span>
                        <div className={styles.propValue}>
                            {isEditing ? (
                                <>
                                    <DropdownTrigger
                                        label={
                                            <>
                                                <StatusDot
                                                    status={data['priority']}
                                                />
                                                <span>{data['priority']}</span>
                                            </>
                                        }
                                        onClick={() =>
                                            setIsPriorityOpen(!isPriorityOpen)
                                        }
                                    />
                                    {isPriorityOpen && (
                                        <DropdownMenu>
                                            {priorities.map(
                                                (option: string) => (
                                                    <DropdownItem
                                                        key={option}
                                                        label={
                                                            <>
                                                                <StatusDot
                                                                    status={
                                                                        option as Priority
                                                                    }
                                                                />
                                                                <span>
                                                                    {option}
                                                                </span>
                                                            </>
                                                        }
                                                        isActive={
                                                            data['priority'] ===
                                                            option
                                                        }
                                                        onClick={() => {
                                                            setData(
                                                                'priority',
                                                                option as Priority,
                                                            );
                                                            setIsPriorityOpen(
                                                                false,
                                                            );
                                                        }}
                                                    />
                                                ),
                                            )}
                                        </DropdownMenu>
                                    )}
                                </>
                            ) : (
                                <>
                                    <StatusDot
                                        status={activeIssue.priority}
                                        size="sm"
                                    />
                                    <span
                                        className={styles[activeIssue.priority]}
                                    >
                                        {activeIssue.priority}
                                    </span>
                                </>
                            )}
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
                            {isEditing ? (
                                <div className={styles.labelsPicker}>
                                    {[
                                        'bug',
                                        'feature',
                                        'performance',
                                        'design',
                                        'ux',
                                        'chore',
                                    ].map((label) => {
                                        const isSelected = data.labels.includes(
                                            label as Label,
                                        );
                                        return (
                                            <button
                                                key={label}
                                                type="button"
                                                className={`${styles.labelButton} ${isSelected ? styles.selected : ''}`}
                                                onClick={() => {
                                                    const newLabels = isSelected
                                                        ? data.labels.filter(
                                                              (l) =>
                                                                  l !== label,
                                                          )
                                                        : [
                                                              ...data.labels,
                                                              label,
                                                          ];
                                                    setData(
                                                        'labels',
                                                        newLabels as Label[],
                                                    );
                                                }}
                                            >
                                                <Badge
                                                    color={label as Label}
                                                    variant={
                                                        isSelected
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                >
                                                    {label}
                                                </Badge>
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                activeIssue.labels?.map((label, idx) => (
                                    <Badge key={idx} color={label}>
                                        {label}
                                    </Badge>
                                ))
                            )}
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
            </div>
        </div>
    );
};

export default IssueDetail;
