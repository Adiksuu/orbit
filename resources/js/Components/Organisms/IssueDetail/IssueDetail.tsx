import { IssueDetailProps } from '@/types/Components';
import { IssueLabel, IssuePriority, Status } from '@/types/Issues';
import { formatDate, formatTimeAgo } from '@/utils/time';
import { useForm } from '@inertiajs/react';
import { cva } from 'class-variance-authority';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Badge from '../../Atoms/Badge/Badge';
import DropdownItem from '../../Atoms/DropdownItem/DropdownItem';
import DropdownMenu from '../../Atoms/DropdownMenu/DropdownMenu';
import DropdownTrigger from '../../Atoms/DropdownTrigger/DropdownTrigger';
import IconButton from '../../Atoms/IconButton/IconButton';
import Input from '../../Atoms/Input/Input';
import StatusDot from '../../Atoms/StatusDot/StatusDot';
import TextArea from '../../Atoms/TextArea/TextArea';
import IssueProperty from '../../Molecules/IssueProperty/IssueProperty';
import UserBadge from '../../Molecules/UserBadge/UserBadge';

const priorityVariants = cva('', {
    variants: {
        priority: {
            high: 'text-red-500',
            medium: 'text-yellow-500',
            low: 'text-green-500',
        },
    },
});

const AVAILABLE_LABELS: IssueLabel[] = [
    'bug',
    'feature',
    'performance',
    'design',
    'ux',
    'chore',
];
const STATUSES: Status[] = ['open', 'closed'];
const PRIORITIES: IssuePriority[] = ['high', 'medium', 'low'];

const IssueDetail = ({ activeIssue, setActiveIssue }: IssueDetailProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
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

    useEffect(() => {
        handleCancel();
    }, [activeIssue]);

    return (
        <div className="bg-[var(--bg-light-color)]/40 flex h-screen shrink-0 flex-col border-l border-solid border-l-[var(--bg-light-color)]">
            <div className="flex items-center justify-between border-b border-solid border-b-[var(--bg-light-color)] px-4 py-3">
                <span className="max-w-[200px] truncate text-sm font-normal text-zinc-400">
                    {activeIssue.title}
                </span>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <IconButton
                                iconName="Check"
                                iconColor="#4caf50"
                                onClick={handleSave}
                                disabled={processing}
                            />
                            <IconButton
                                iconName="X"
                                iconColor="#f44336"
                                onClick={handleCancel}
                            />
                        </>
                    ) : (
                        <IconButton
                            iconName="Pencil"
                            onClick={() => setIsEditing(true)}
                        />
                    )}
                    <IconButton
                        iconName="X"
                        onClick={() => setActiveIssue(null)}
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
                {isEditing ? (
                    <div className="mb-6 flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-zinc-400">
                                Title
                            </label>
                            <Input
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                placeholder="Issue title"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-zinc-400">
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
                        <h2 className="mb-3 text-xl font-semibold text-white">
                            {activeIssue.title}
                        </h2>
                        <div className="mb-6 flex items-center gap-3">
                            <UserBadge
                                avatarSrc={activeIssue.assignee?.avatar}
                                name={
                                    activeIssue.assignee
                                        ? activeIssue.assignee.name
                                        : 'Unassigned'
                                }
                                size="sm"
                            />
                            <span className="text-xs text-zinc-400">
                                {formatTimeAgo(activeIssue.updated_at)} ago •{' '}
                                {activeIssue.updated_at ===
                                activeIssue.created_at
                                    ? ' opened'
                                    : ' updated'}
                            </span>
                        </div>
                        <div className="prose prose-invert mb-8 max-w-none text-sm">
                            {activeIssue.description ? (
                                <Markdown remarkPlugins={[remarkGfm]}>
                                    {activeIssue.description}
                                </Markdown>
                            ) : (
                                <p className="italic text-zinc-500">
                                    No description provided.
                                </p>
                            )}
                        </div>
                    </>
                )}
                <div className="flex flex-col gap-4">
                    <IssueProperty label="Status">
                        {isEditing ? (
                            <>
                                <DropdownTrigger
                                    label={
                                        <>
                                            <StatusDot status={data.status} />
                                            <span>{data.status}</span>
                                        </>
                                    }
                                    onClick={() =>
                                        setIsStatusOpen(!isStatusOpen)
                                    }
                                />
                                {isStatusOpen && (
                                    <DropdownMenu>
                                        {STATUSES.map((option) => (
                                            <DropdownItem
                                                key={option}
                                                label={
                                                    <>
                                                        <StatusDot
                                                            status={option}
                                                        />
                                                        <span>{option}</span>
                                                    </>
                                                }
                                                isActive={
                                                    data.status === option
                                                }
                                                onClick={() => {
                                                    setData('status', option);
                                                    setIsStatusOpen(false);
                                                }}
                                            />
                                        ))}
                                    </DropdownMenu>
                                )}
                            </>
                        ) : (
                            <>
                                <StatusDot status={activeIssue.status} />
                                <span className="capitalize">
                                    {activeIssue.status}
                                </span>
                            </>
                        )}
                    </IssueProperty>
                    <IssueProperty label="Priority">
                        {isEditing ? (
                            <>
                                <DropdownTrigger
                                    label={
                                        <>
                                            <StatusDot status={data.priority} />
                                            <span>{data.priority}</span>
                                        </>
                                    }
                                    onClick={() =>
                                        setIsPriorityOpen(!isPriorityOpen)
                                    }
                                />
                                {isPriorityOpen && (
                                    <DropdownMenu>
                                        {PRIORITIES.map((option) => (
                                            <DropdownItem
                                                key={option}
                                                label={
                                                    <>
                                                        <StatusDot
                                                            status={option}
                                                        />
                                                        <span>{option}</span>
                                                    </>
                                                }
                                                isActive={
                                                    data.priority === option
                                                }
                                                onClick={() => {
                                                    setData('priority', option);
                                                    setIsPriorityOpen(false);
                                                }}
                                            />
                                        ))}
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
                                    className={priorityVariants({
                                        priority:
                                            activeIssue.priority as IssuePriority,
                                    })}
                                >
                                    {activeIssue.priority}
                                </span>
                            </>
                        )}
                    </IssueProperty>
                    <IssueProperty label="Assignee">
                        <UserBadge
                            avatarSrc={activeIssue.assignee?.avatar}
                            name={
                                activeIssue.assignee
                                    ? activeIssue.assignee.name
                                    : 'Unassigned'
                            }
                            size="sm"
                        />
                    </IssueProperty>
                    <IssueProperty label="Labels">
                        {isEditing ? (
                            <div className="flex flex-wrap gap-2 py-2">
                                {AVAILABLE_LABELS.map((label) => {
                                    const isSelected =
                                        data.labels.includes(label);
                                    return (
                                        <button
                                            key={label}
                                            type="button"
                                            className="transition-transform duration-100 ease-out hover:scale-105"
                                            onClick={() => {
                                                const newLabels = isSelected
                                                    ? data.labels.filter(
                                                          (l) => l !== label,
                                                      )
                                                    : [...data.labels, label];
                                                setData(
                                                    'labels',
                                                    newLabels as IssueLabel[],
                                                );
                                            }}
                                        >
                                            <Badge
                                                color={label}
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
                    </IssueProperty>
                    <IssueProperty label="Created">
                        {formatDate(activeIssue.created_at)}
                    </IssueProperty>
                    <IssueProperty label="Modified">
                        {formatDate(activeIssue.updated_at)}
                    </IssueProperty>
                </div>
            </div>
        </div>
    );
};

export default IssueDetail;
