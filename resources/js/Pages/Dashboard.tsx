import EmptyStateCard from '@/Components/Molecules/EmptyStateCard/EmptyStateCard';
import ProjectCard from '@/Components/Molecules/ProjectCard/ProjectCard';
import StatCard from '@/Components/Molecules/StatCard/StatCard';
import DashboardVisuals from '@/Components/Organisms/DashboardVisuals/DashboardVisuals';
import IssueDetail from '@/Components/Organisms/IssueDetail/IssueDetail';
import IssueTable from '@/Components/Organisms/IssueTable/IssueTable';
import PageHeader from '@/Components/Organisms/PageHeader/PageHeader';
import Sidebar from '@/Components/Organisms/Sidebar/Sidebar';
import { Issue, ProductivityTrendProps } from '@/types/Issues';
import { Project } from '@/types/Projects';
import { AssignableUser } from '@/types/Users';
import { Link } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

export default function Dashboard({
    issues,
    projects,
    productivity_trend,
    users,
}: {
    issues: Issue[];
    projects: Project[];
    productivity_trend: ProductivityTrendProps[];
    users: AssignableUser[];
}) {
    const [activeIssue, _setActiveIssue] = useState<Issue | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const setActiveIssue = (issue: Issue | null, edit: boolean = false) => {
        _setActiveIssue(issue);
        setIsEditing(edit);
    };

    useEffect(() => {
        if (activeIssue) {
            const updated = issues.find((i) => i.id === activeIssue.id);
            if (updated) {
                setActiveIssue(updated);
            }
        }
    }, [issues]);

    const stats = useMemo(() => {
        const total = issues.length;
        const closed = issues.filter((i) => i.status === 'closed').length;
        const open = total - closed;
        const highPriority = issues.filter((i) => i.priority === 'high').length;
        const resolutionRate =
            total > 0 ? Math.round((closed / total) * 100) : 0;

        return {
            total,
            open,
            highPriority,
            resolutionRate,
        };
    }, [issues]);

    const hasProjects = projects && projects.length > 0;

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[var(--bg-color)]">
            <Sidebar projects={projects} />
            <div className="flex min-w-0 flex-1 flex-col">
                <PageHeader title="Dashboard" />
                <div className="relative flex flex-1 overflow-hidden">
                    <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
                        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            <StatCard
                                title="Active Projects"
                                value={projects.length}
                                icon="FolderGit2"
                                description="Tracked projects in workspace"
                                color="accent"
                            />
                            <StatCard
                                title="Open Issues"
                                value={stats.open}
                                icon="Layers"
                                description="Active tasks assigned/open"
                                color="info"
                            />
                            <StatCard
                                title="Critical Tasks"
                                value={stats.highPriority}
                                icon="TriangleAlert"
                                description="High priority issues needing attention"
                                color="error"
                            />
                            <StatCard
                                title="Resolution Rate"
                                value={`${stats.resolutionRate}%`}
                                icon="CircleCheck"
                                progress={stats.resolutionRate}
                                color="success"
                            />
                        </section>

                        <DashboardVisuals
                            issues={issues}
                            productivity_trend={productivity_trend}
                        />

                        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="flex min-h-[400px] flex-col lg:col-span-2">
                                <div className="mb-2 flex items-center justify-between">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                        Recent Work Activity
                                    </h3>
                                    <span className="text-[10px] font-medium text-zinc-500">
                                        Showing {issues.slice(0, 20).length}{' '}
                                        latest issues
                                    </span>
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                    <IssueTable
                                        issues={issues.slice(0, 20)}
                                        activeIssue={activeIssue}
                                        setActiveIssue={setActiveIssue}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                        Projects Directory
                                    </h3>
                                    <span className="text-[10px] font-medium text-zinc-500">
                                        Showing {projects.slice(0, 3).length}{' '}
                                        latest projects
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {hasProjects ? (
                                        <>
                                            {projects
                                                .slice(0, 3)
                                                .map((project) => (
                                                    <ProjectCard
                                                        key={project.id}
                                                        project={project}
                                                        issues={issues}
                                                    />
                                                ))}
                                            {projects.length > 3 && (
                                                <Link
                                                    href="/projects"
                                                    className="cursor-pointer rounded-lg border border-dashed border-[var(--bg-light-color)] py-2.5 text-center text-xs font-semibold text-zinc-500 transition-colors hover:text-white"
                                                >
                                                    View all {projects.length}{' '}
                                                    projects
                                                </Link>
                                            )}
                                        </>
                                    ) : (
                                        <EmptyStateCard
                                            title={'Create your first project'}
                                            description={
                                                'Get started by setting up a workspace for your tasks and team activity.'
                                            }
                                            iconName={'FolderPlus'}
                                            actionHref={'/projects/new'}
                                            actionLabel={'Create Project'}
                                        />
                                    )}
                                </div>
                            </div>
                        </section>
                    </main>

                    {activeIssue && (
                        <IssueDetail
                            isOpen={!!activeIssue}
                            onClose={() => setActiveIssue(null)}
                            activeIssue={activeIssue}
                            initialIsEditing={isEditing}
                            users={users}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
