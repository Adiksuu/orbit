import Icon from '@/Components/Atoms/Icon/Icon';
import { Link } from '@inertiajs/react';

function ProjectEmptyState() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-solid border-[var(--bg-light-color)] bg-[var(--bg-dark-color)]">
                <Icon name="FolderSearch" size={28} className="text-zinc-500" />
            </div>
            <div>
                <h3 className="text-sm font-semibold text-zinc-300">
                    No projects found
                </h3>
                <p className="mt-1 text-xs text-zinc-500">
                    Create your first project to get started
                </p>
            </div>
            <Link
                href="/projects/new"
                className="flex cursor-pointer items-center gap-1.5 rounded-md border-none bg-[var(--accent-color)] px-4 py-2 text-xs font-semibold text-white transition-all duration-150 hover:bg-[var(--accent-light-color)]"
            >
                <Icon name="Plus" size={13} color="#fff" />
                Create Project
            </Link>
        </div>
    );
}

export default ProjectEmptyState;
