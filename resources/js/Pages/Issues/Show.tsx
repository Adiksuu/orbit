import EditableSelect from '@/Components/Atoms/EditableSelect/EditableSelect';
import EditableText from '@/Components/Atoms/EditableText/EditableText';
import Icon from '@/Components/Atoms/Icon/Icon';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import CommentForm from '@/Components/Molecules/CommentForm/CommentForm';
import CommentList from '@/Components/Molecules/CommentList/CommentList';
import EditableLabelList from '@/Components/Molecules/EditableLabelList/EditableLabelList';
import SidebarField from '@/Components/Molecules/SidebarField/SidebarField';
import UserBadge from '@/Components/Molecules/UserBadge/UserBadge';
import IssuePageHeader from '@/Components/Organisms/IssuePageHeader/IssuePageHeader';
import Sidebar from '@/Components/Organisms/Sidebar/Sidebar';
import { PageProps } from '@/types';
import { IssuePageProps } from '@/types/Components';
import { Comment, IssueLabel, IssuePriority, Status } from '@/types/Issues';
import { formatStatusLabel } from '@/utils/text';
import { formatDate } from '@/utils/time';
import type { FormDataConvertible } from '@inertiajs/core';
import { Link, router, usePage } from '@inertiajs/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const STATUSES: Status[] = ['open', 'in_progress', 'closed'];
const PRIORITIES: IssuePriority[] = ['high', 'medium', 'low'];

export default function Show({
    project,
    projects,
    issue,
    users,
}: IssuePageProps) {
    const {
        props: { auth },
    } = usePage<PageProps>();

    const updateIssue = (data: Record<string, FormDataConvertible>) => {
        router.patch(route('issues.update', issue.id), data, {
            preserveScroll: true,
        });
    };

    const addComment = (body: string) => {
        router.post(
            route('comments.store', issue.id),
            { body },
            { preserveScroll: true },
        );
    };

    const deleteComment = (comment: Comment) => {
        router.delete(route('comments.destroy', comment.id), {
            preserveScroll: true,
        });
    };

    const statusOptions = STATUSES.map((status) => ({
        value: status,
        label: (
            <div className="flex items-center gap-2">
                <StatusDot status={status} />
                <span className="capitalize">{formatStatusLabel(status)}</span>
            </div>
        ),
    }));

    const priorityOptions = PRIORITIES.map((priority) => ({
        value: priority,
        label: (
            <div className="flex items-center gap-2">
                <StatusDot status={priority} size="sm" />
                <span className="capitalize">{priority}</span>
            </div>
        ),
    }));

    const assigneeOptions = [
        {
            value: '',
            label: (
                <span className="flex items-center gap-2 text-[var(--text-gray-color)]">
                    <Icon name="UserX" size={14} />
                    Unassigned
                </span>
            ),
        },
        ...users.map((user) => ({
            value: String(user.id),
            label: (
                <UserBadge
                    avatarSrc={user.avatar ?? undefined}
                    name={user.name}
                    size="sm"
                    showTooltip={false}
                />
            ),
        })),
    ];

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[var(--bg-color)]">
            <Sidebar projects={projects} />
            <div className="flex min-w-0 flex-1 flex-col">
                <IssuePageHeader project={project} issue={issue} />
                <main className="flex flex-1 overflow-y-auto">
                    <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-8 px-6 py-8 md:grid-cols-[1fr_280px]">
                        <div className="flex min-w-0 flex-col gap-6">
                            <EditableText
                                as="h1"
                                value={issue.title}
                                onSave={(value) =>
                                    updateIssue({ title: value })
                                }
                                placeholder="Issue title"
                                displayClassName="text-2xl font-semibold text-[var(--text-color)]"
                                inputClassName="text-2xl font-semibold"
                            />

                            <EditableText
                                multiline
                                value={issue.description || ''}
                                onSave={(value) =>
                                    updateIssue({ description: value })
                                }
                                placeholder="Add a description..."
                                displayClassName="prose prose-invert max-w-none text-sm"
                                renderDisplay={(value) => (
                                    <Markdown remarkPlugins={[remarkGfm]}>
                                        {value}
                                    </Markdown>
                                )}
                            />

                            <div className="mt-4 flex flex-col gap-4 border-t border-[var(--border-color)] pt-6">
                                <span className="text-sm font-medium text-[var(--text-color)]">
                                    Activity
                                </span>
                                <CommentList
                                    comments={issue.comments || []}
                                    currentUserId={auth.user.id}
                                    onDelete={deleteComment}
                                />
                                <CommentForm onSubmit={addComment} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 border-l border-[var(--border-color)] pl-6">
                            <SidebarField label="Status">
                                <EditableSelect
                                    value={issue.status}
                                    options={statusOptions}
                                    onSave={(value) =>
                                        updateIssue({ status: value })
                                    }
                                    renderValue={(value) => (
                                        <div className="flex items-center gap-2">
                                            <StatusDot
                                                status={value as Status}
                                            />
                                            <span className="text-sm capitalize text-[var(--text-color)]">
                                                {formatStatusLabel(value)}
                                            </span>
                                        </div>
                                    )}
                                />
                            </SidebarField>

                            <SidebarField label="Priority">
                                <EditableSelect
                                    value={issue.priority}
                                    options={priorityOptions}
                                    onSave={(value) =>
                                        updateIssue({ priority: value })
                                    }
                                    renderValue={(value) => (
                                        <div className="flex items-center gap-2">
                                            <StatusDot
                                                status={value as IssuePriority}
                                                size="sm"
                                            />
                                            <span className="text-sm capitalize text-[var(--text-color)]">
                                                {value}
                                            </span>
                                        </div>
                                    )}
                                />
                            </SidebarField>

                            <SidebarField label="Assignee">
                                <EditableSelect
                                    value={
                                        issue.assignee_id
                                            ? String(issue.assignee_id)
                                            : ''
                                    }
                                    options={assigneeOptions}
                                    onSave={(value) =>
                                        updateIssue({
                                            assignee_id: value
                                                ? Number(value)
                                                : null,
                                        })
                                    }
                                    renderValue={() =>
                                        issue.assignee ? (
                                            <UserBadge
                                                avatarSrc={
                                                    issue.assignee.avatar
                                                }
                                                name={issue.assignee.name}
                                                size="sm"
                                                showTooltip={false}
                                            />
                                        ) : (
                                            <span className="flex items-center gap-2 text-[var(--text-gray-color)]">
                                                <Icon name="UserX" size={14} />
                                                Unassigned
                                            </span>
                                        )
                                    }
                                />
                            </SidebarField>

                            <SidebarField label="Labels">
                                <EditableLabelList
                                    labels={issue.labels || []}
                                    onSave={(labels: IssueLabel[]) =>
                                        updateIssue({ labels })
                                    }
                                />
                            </SidebarField>

                            <SidebarField label="Project">
                                <Link
                                    href={route('projects.show', project.id)}
                                    className="flex items-center gap-2 text-sm text-[var(--text-color)] hover:underline"
                                >
                                    <Icon name="FolderGit2" size={14} />
                                    {project.name}
                                </Link>
                            </SidebarField>

                            {(issue.start_date || issue.end_date) && (
                                <SidebarField label="Dates">
                                    <div className="flex items-center gap-2">
                                        <Icon
                                            name="Calendar"
                                            size={14}
                                            className="text-[var(--text-gray-color)]"
                                        />
                                        <span className="text-xs text-[var(--text-color)]">
                                            {issue.start_date || 'Not set'} —{' '}
                                            {issue.end_date || 'Not set'}
                                        </span>
                                    </div>
                                </SidebarField>
                            )}

                            <div className="mt-auto flex flex-col gap-2 border-t border-[var(--border-color)] pt-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-gray-color)]">
                                        Created
                                    </span>
                                    <span className="text-xs text-[var(--text-gray-color)]">
                                        {formatDate(issue.created_at)}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-gray-color)]">
                                        Modified
                                    </span>
                                    <span className="text-xs text-[var(--text-gray-color)]">
                                        {formatDate(issue.updated_at)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
