import Icon from '@/Components/Atoms/Icon/Icon';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import CommentList from '@/Components/Molecules/CommentList/CommentList';
import LabelList from '@/Components/Molecules/LabelList/LabelList';
import SidebarField from '@/Components/Molecules/SidebarField/SidebarField';
import UserBadge from '@/Components/Molecules/UserBadge/UserBadge';
import IssuePageHeader from '@/Components/Organisms/IssuePageHeader/IssuePageHeader';
import Sidebar from '@/Components/Organisms/Sidebar/Sidebar';
import { IssuePageProps } from '@/types/Components';
import { IssuePriority } from '@/types/Issues';
import { cn } from '@/utils/cn';
import { formatStatusLabel } from '@/utils/text';
import { formatDate } from '@/utils/time';
import { Link } from '@inertiajs/react';
import { cva } from 'class-variance-authority';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const priorityVariants = cva('', {
    variants: {
        priority: {
            high: 'text-red-500',
            medium: 'text-yellow-500',
            low: 'text-green-500',
        },
    },
});

export default function Show({ project, projects, issue }: IssuePageProps) {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[var(--bg-color)]">
            <Sidebar projects={projects} />
            <div className="flex min-w-0 flex-1 flex-col">
                <IssuePageHeader project={project} issue={issue} />
                <main className="flex flex-1 overflow-y-auto">
                    <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-8 px-6 py-8 md:grid-cols-[1fr_280px]">
                        <div className="flex min-w-0 flex-col gap-6">
                            <h1 className="text-2xl font-semibold text-[var(--text-color)]">
                                {issue.title}
                            </h1>

                            <div className="prose prose-invert max-w-none text-sm">
                                {issue.description ? (
                                    <Markdown remarkPlugins={[remarkGfm]}>
                                        {issue.description}
                                    </Markdown>
                                ) : (
                                    <p className="italic text-[var(--text-gray-color)]">
                                        No description provided.
                                    </p>
                                )}
                            </div>

                            <div className="mt-4 flex flex-col gap-4 border-t border-[var(--border-color)] pt-6">
                                <span className="text-sm font-medium text-[var(--text-color)]">
                                    Activity
                                </span>
                                <CommentList comments={issue.comments || []} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 border-l border-[var(--border-color)] pl-6">
                            <SidebarField label="Status">
                                <div className="flex items-center gap-2">
                                    <StatusDot status={issue.status} />
                                    <span className="text-sm capitalize text-[var(--text-color)]">
                                        {formatStatusLabel(issue.status)}
                                    </span>
                                </div>
                            </SidebarField>

                            <SidebarField label="Priority">
                                <div className="flex items-center gap-2">
                                    <StatusDot
                                        status={issue.priority}
                                        size="sm"
                                    />
                                    <span
                                        className={cn(
                                            'text-sm capitalize',
                                            priorityVariants({
                                                priority:
                                                    issue.priority as IssuePriority,
                                            }),
                                        )}
                                    >
                                        {issue.priority}
                                    </span>
                                </div>
                            </SidebarField>

                            <SidebarField label="Assignee">
                                <UserBadge
                                    avatarSrc={issue.assignee?.avatar}
                                    name={
                                        issue.assignee
                                            ? issue.assignee.name
                                            : 'Unassigned'
                                    }
                                    size="sm"
                                />
                            </SidebarField>

                            <SidebarField label="Labels">
                                {issue.labels && issue.labels.length > 0 ? (
                                    <LabelList labels={issue.labels} />
                                ) : (
                                    <span className="text-sm text-[var(--text-gray-color)]">
                                        None
                                    </span>
                                )}
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
