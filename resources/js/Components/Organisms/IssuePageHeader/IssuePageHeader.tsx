import IconButton from '@/Components/Atoms/IconButton/IconButton';
import { IssuePageHeaderProps } from '@/types/Components';
import { Link } from '@inertiajs/react';
import React from 'react';

const IssuePageHeader: React.FC<IssuePageHeaderProps> = ({
    project,
    issue,
}) => {
    return (
        <header className="flex items-center justify-between border-b border-solid border-[var(--border-color)] px-6 py-3">
            <div className="flex min-w-0 items-center gap-2 text-sm">
                <IconButton
                    isLink
                    link={route('projects.show', project.id)}
                    iconName="ArrowLeft"
                    ariaLabel="Back to project"
                />
                <Link
                    href={route('projects.show', project.id)}
                    className="text-[var(--text-gray-color)] hover:text-[var(--text-color)]"
                >
                    {project.name}
                </Link>
                <span className="text-[var(--text-gray-color)]">/</span>
                <span className="text-[var(--text-gray-color)]">Issues</span>
                <span className="text-[var(--text-gray-color)]">/</span>
                <span className="truncate text-[var(--text-color)]">
                    #{issue.id} {issue.title}
                </span>
            </div>
            <div className="flex items-center gap-1">
                <IconButton
                    iconName="Link"
                    ariaLabel="Copy issue link"
                    onClick={() =>
                        navigator.clipboard.writeText(window.location.href)
                    }
                />
            </div>
        </header>
    );
};

export default IssuePageHeader;
