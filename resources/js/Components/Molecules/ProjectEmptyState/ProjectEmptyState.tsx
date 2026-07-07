import Icon from '@/Components/Atoms/Icon/Icon';
import { Link } from '@inertiajs/react';

function ProjectEmptyState() {
    return (
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden py-20 text-center">
            <div
                className="absolute inset-0 z-[-1] opacity-[0.03]"
                style={{
                    backgroundImage:
                        'radial-gradient(var(--zinc-700) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                }}
            ></div>
            <div className="mb-8 rounded-full border border-zinc-700/50 bg-[var(--bg-light-color)] p-4 shadow-inner">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-zinc-700 bg-gradient-to-b from-zinc-800 to-zinc-900 shadow-xl">
                    <Icon
                        name="FolderSearch"
                        size={36}
                        className="text-zinc-400 opacity-90"
                    />
                </div>
            </div>
            <div className="mx-auto max-w-md">
                <h3 className="text-xl font-bold tracking-tight text-white">
                    Your dashboard is empty
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
                    It looks like you don’t have any projects yet. Create your
                    first project to start organizing your work.
                </p>
            </div>
            <Link
                href="/projects/new"
                className="hover:shadow-[var(--accent-color)]/30 mt-10 flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-light-color)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[var(--accent-light-color)] focus:ring-offset-2 focus:ring-offset-[var(--bg-dark-color)]"
            >
                <Icon name="Plus" size={16} color="#fff" />
                Create your first project
            </Link>
        </div>
    );
}

export default ProjectEmptyState;
