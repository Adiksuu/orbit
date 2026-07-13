import { IssueDetailProps } from '@/types/Components';
import { IssueLabel, IssuePriority, Status } from '@/types/Issues';
import { cn } from '@/utils/cn';
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
import Modal from '../../Atoms/Modal/Modal';
import StatusDot from '../../Atoms/StatusDot/StatusDot';
import TextArea from '../../Atoms/TextArea/TextArea';
import LabelList from '../../Molecules/LabelList/LabelList';
import SidebarField from '../../Molecules/SidebarField/SidebarField';
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

const IssueDetail = ({ isOpen, onClose, activeIssue }: IssueDetailProps) => {
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
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <div className="flex h-full flex-col">
                <div className="flex items-start justify-between border-b border-[var(--bg-light-color)] p-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-zinc-500">
                                #{activeIssue.id}
                            </span>
                            <h2 className="text-xl font-semibold text-[var(--text-color)]">
                                {isEditing ? 'Edit Issue' : activeIssue.title}
                            </h2>
                        </div>
                        {!isEditing && (
                            <div className="mt-1 flex items-center gap-3">
                                <UserBadge
                                    avatarSrc={activeIssue.assignee?.avatar}
                                    name={
                                        activeIssue.assignee
                                            ? activeIssue.assignee.name
                                            : 'Unassigned'
                                    }
                                    size="sm"
                                    showTooltip={false}
                                />
                                <span className="text-xs text-zinc-400">
                                    {formatTimeAgo(activeIssue.updated_at)} ago
                                    •{' '}
                                    {activeIssue.updated_at ===
                                    activeIssue.created_at
                                        ? ' opened'
                                        : ' updated'}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {!isEditing && (
                            <IconButton
                                iconName="Pencil"
                                onClick={() => setIsEditing(true)}
                            />
                        )}
                        <IconButton
                            iconName="X"
                            onClick={onClose}
                            iconSize={20}
                        />
                    </div>
                </div>

                <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto p-6 md:grid-cols-[1fr_320px]">
                    <div className="flex flex-col gap-6">
                        {isEditing ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-[var(--text-color)]">
                                        Title
                                    </label>
                                    <Input
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        placeholder="Issue title"
                                        variant="modal"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-[var(--text-color)]">
                                        Description
                                    </label>
                                    <TextArea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Add a description..."
                                        variant="modal"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="prose prose-invert max-w-none text-sm">
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
                        )}
                    </div>

                    <div className="flex flex-col gap-6 border-l border-[var(--bg-light-color)] pl-6">
                        <SidebarField label="Status">
                            {isEditing ? (
                                <div className="relative w-full">
                                    <DropdownTrigger
                                        className="w-full"
                                        label={
                                            <div className="flex items-center gap-2">
                                                <StatusDot
                                                    status={data.status}
                                                />
                                                <span className="capitalize">
                                                    {data.status}
                                                </span>
                                            </div>
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
                                                        <div className="flex items-center gap-2">
                                                            <StatusDot
                                                                status={option}
                                                            />
                                                            <span className="capitalize">
                                                                {option}
                                                            </span>
                                                        </div>
                                                    }
                                                    isActive={
                                                        data.status === option
                                                    }
                                                    onClick={() => {
                                                        setData(
                                                            'status',
                                                            option,
                                                        );
                                                        setIsStatusOpen(false);
                                                    }}
                                                />
                                            ))}
                                        </DropdownMenu>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <StatusDot status={activeIssue.status} />
                                    <span className="text-sm capitalize text-[var(--text-color)]">
                                        {activeIssue.status}
                                    </span>
                                </div>
                            )}
                        </SidebarField>

                        <SidebarField label="Priority">
                            {isEditing ? (
                                <div className="relative w-full">
                                    <DropdownTrigger
                                        className="w-full"
                                        label={
                                            <div className="flex items-center gap-2">
                                                <StatusDot
                                                    status={data.priority}
                                                />
                                                <span className="capitalize">
                                                    {data.priority}
                                                </span>
                                            </div>
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
                                                        <div className="flex items-center gap-2">
                                                            <StatusDot
                                                                status={option}
                                                            />
                                                            <span className="capitalize">
                                                                {option}
                                                            </span>
                                                        </div>
                                                    }
                                                    isActive={
                                                        data.priority === option
                                                    }
                                                    onClick={() => {
                                                        setData(
                                                            'priority',
                                                            option,
                                                        );
                                                        setIsPriorityOpen(
                                                            false,
                                                        );
                                                    }}
                                                />
                                            ))}
                                        </DropdownMenu>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <StatusDot
                                        status={activeIssue.priority}
                                        size="sm"
                                    />
                                    <span
                                        className={cn(
                                            'text-sm capitalize',
                                            priorityVariants({
                                                priority:
                                                    activeIssue.priority as IssuePriority,
                                            }),
                                        )}
                                    >
                                        {activeIssue.priority}
                                    </span>
                                </div>
                            )}
                        </SidebarField>

                        <SidebarField label="Assignee">
                            <UserBadge
                                avatarSrc={activeIssue.assignee?.avatar}
                                name={
                                    activeIssue.assignee
                                        ? activeIssue.assignee.name
                                        : 'Unassigned'
                                }
                                size="sm"
                            />
                        </SidebarField>

                        <SidebarField label="Labels">
                            {isEditing ? (
                                <div className="flex flex-wrap gap-2">
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
                                                              (l) =>
                                                                  l !== label,
                                                          )
                                                        : [
                                                              ...data.labels,
                                                              label,
                                                          ];
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
                                <LabelList labels={activeIssue.labels || []} />
                            )}
                        </SidebarField>

                        <div className="mt-auto flex flex-col gap-2 border-t border-[var(--bg-light-color)] pt-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                                    Created
                                </span>
                                <span className="text-xs text-zinc-400">
                                    {formatDate(activeIssue.created_at)}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                                    Modified
                                </span>
                                <span className="text-xs text-zinc-400">
                                    {formatDate(activeIssue.updated_at)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {isEditing && (
                    <div className="flex items-center justify-end gap-3 border-t border-[var(--bg-light-color)] px-6 py-4">
                        <button
                            type="button"
                            className="cursor-pointer rounded-lg border-none bg-transparent px-4 py-2 text-sm font-medium text-zinc-400 transition-colors duration-150 hover:text-white"
                            onClick={handleCancel}
                            disabled={processing}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={processing}
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--accent-color)] px-6 py-2 text-sm font-medium text-[var(--text-color)] transition-all duration-150 ease-in-out hover:bg-[var(--accent-light-color)] disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save changes'}
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default IssueDetail;
