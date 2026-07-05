import Icon from '@/Components/Atoms/Icon/Icon';
import ProjectCard from '@/Components/Molecules/ProjectCard/ProjectCard';
import StatCard from '@/Components/Molecules/StatCard/StatCard';
import DashboardVisuals from '@/Components/Organisms/DashboardVisuals/DashboardVisuals';
import IssueDetail from '@/Components/Organisms/IssueDetail/IssueDetail';
import IssueTable from '@/Components/Organisms/IssueTable/IssueTable';
import Sidebar from '@/Components/Organisms/Sidebar/Sidebar';
import { Issue, ProductivityTrendProps } from '@/types/Issues';
import { Project } from '@/types/Projects';
import { useEffect, useMemo, useState } from 'react';

export default function Dashboard({
    issues,
    projects,
    productivity_trend,
}: {
    issues: Issue[];
    projects: Project[];
    productivity_trend: ProductivityTrendProps[];
}) {
    const [activeIssue, setActiveIssue] = useState<Issue | null>(null);

    useEffect(() => {
        if (activeIssue) {
            const updated = issues.find((i) => i.id === activeIssue.id);
            if (updated) {
                setActiveIssue(updated);
            }
        }
    }, [issues]);

    const formattedDate = useMemo(() => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date().toLocaleDateString('en-US', options);
    }, []);

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

    return (
        <div
            className={
                'flex h-screen w-screen overflow-hidden bg-[var(--bg-color)]'
            }
        >
            <Sidebar projects={projects} />
            <div className={'flex min-w-0 flex-1 flex-col'}>
                <header
                    className={
                        'flex h-16 shrink-0 items-center justify-between border-b border-solid border-[var(--bg-light-color)] bg-[var(--bg-color)] px-6'
                    }
                >
                    <div className="flex flex-col">
                        <h1 className="text-sm font-semibold text-white">
                            Dashboard
                        </h1>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                            {formattedDate}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            className={
                                'flex cursor-pointer items-center justify-center rounded-md border-none bg-transparent p-1.5 hover:bg-[var(--bg-light-color)]'
                            }
                        >
                            <Icon name="Search" size={18} color="#999" />
                        </button>
                        <button
                            className={
                                'flex cursor-pointer items-center justify-center rounded-md border-none bg-transparent p-1.5 hover:bg-[var(--bg-light-color)]'
                            }
                        >
                            <Icon name="Bell" size={18} color="#999" />
                        </button>
                        <button
                            className={
                                'flex cursor-pointer items-center justify-center rounded-md border-none bg-transparent p-1.5 hover:bg-[var(--bg-light-color)]'
                            }
                        >
                            <Icon name="Settings" size={18} color="#999" />
                        </button>
                    </div>
                </header>
                <div className="flex flex-1 overflow-hidden">
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
                                <div className={'flex-1 overflow-y-auto'}>
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
                                    {projects.slice(0, 3).map((project) => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            issues={issues}
                                        />
                                    ))}
                                    {projects.length > 3 && (
                                        <div className="cursor-pointer rounded-lg border border-dashed border-[var(--bg-light-color)] py-2.5 text-center text-xs font-semibold text-zinc-500 transition-colors hover:text-white">
                                            View all {projects.length} projects
                                            in sidebar
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </main>

                    {activeIssue && (
                        <div className="z-20 w-[420px] overflow-y-auto border-l border-solid border-l-[var(--bg-light-color)] bg-[var(--bg-color)]">
                            <IssueDetail
                                activeIssue={activeIssue}
                                setActiveIssue={setActiveIssue}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
