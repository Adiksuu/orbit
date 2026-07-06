import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import { Issue } from '@/types/Issues';
import { Project } from '@/types/Projects';
import { getColorTheme } from '@/utils/colors';
import { Link } from '@inertiajs/react';
import React from 'react';
import Icon from '../../Atoms/Icon/Icon';

interface ProjectCardProps {
    project: Project;
    issues: Issue[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, issues }) => {
    const projectIssues = issues.filter((i) => i.project_id === project.id);
    const totalIssuesCount = projectIssues.length;
    const closedIssuesCount = projectIssues.filter(
        (i) => i.status === 'closed',
    ).length;
    const openIssuesCount = totalIssuesCount - closedIssuesCount;
    const completionRate =
        totalIssuesCount > 0
            ? Math.round((closedIssuesCount / totalIssuesCount) * 100)
            : 0;

    const theme = getColorTheme(project.color);

    return (
        <Link
            href={`/projects/${project.id}`}
            className={`group flex flex-col justify-between rounded-lg border border-solid border-[var(--bg-light-color)] bg-[var(--bg-dark-color)] bg-gradient-to-br p-5 ${theme.gradient} transition-all duration-300 ${theme.border} hover:-translate-y-0.5 hover:shadow-lg`}
        >
            <div>
                <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                        <span
                            className={`h-2.5 w-2.5 shrink-0 rounded-full ${theme.accent}`}
                        />
                        <h4
                            className={`overflow-hidden overflow-ellipsis whitespace-nowrap text-base font-semibold ${theme.textGroupHover}`}
                        >
                            {project.name}
                        </h4>
                    </div>
                    <div className="rounded bg-zinc-800/40 p-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Icon
                            name="ArrowRight"
                            size={12}
                            className="text-zinc-400 group-hover:text-white"
                        />
                    </div>
                </div>
                <p className="mt-2.5 line-clamp-2 min-h-[2rem] text-xs leading-relaxed text-zinc-400">
                    {project.description || 'No description provided.'}
                </p>
            </div>
            <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-semibold text-zinc-300">
                        {completionRate}% Completed
                    </span>
                    <span className="text-zinc-500">
                        {closedIssuesCount}/{totalIssuesCount} Issues
                    </span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--bg-light-color)]">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${theme.accent}`}
                        style={{ width: `${completionRate}%` }}
                    />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-solid border-zinc-800/60 pt-3.5 text-[11px]">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-zinc-400">
                            <StatusDot status={'open'} />
                            {openIssuesCount} Open
                        </span>
                        <span className="flex items-center gap-1.5 text-zinc-400">
                            <StatusDot status={'closed'} />
                            {closedIssuesCount} Closed
                        </span>
                    </div>
                    <span className="rounded bg-zinc-800/40 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-zinc-500">
                        {project.slug}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
