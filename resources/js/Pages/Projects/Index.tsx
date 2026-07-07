import Icon from '@/Components/Atoms/Icon/Icon';
import ProjectCard from '@/Components/Molecules/ProjectCard/ProjectCard';
import Sidebar from '@/Components/Organisms/Sidebar/Sidebar';
import { Project } from '@/types/Projects';
import { formattedDate } from '@/utils/time';
import { Link } from '@inertiajs/react';

function Index({ projects }: { projects: Project[] }) {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[var(--bg-color)]">
            <Sidebar projects={projects} />
            <div className="flex min-w-0 flex-1 flex-col">
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-solid border-[var(--bg-light-color)] bg-[var(--bg-color)] px-6">
                    <div className="flex flex-col">
                        <h1 className="text-sm font-semibold text-white">
                            Projects
                        </h1>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                            {formattedDate()}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex cursor-pointer items-center justify-center rounded-md border-none bg-transparent p-1.5 hover:bg-[var(--bg-light-color)]">
                            <Icon name="Bell" size={16} color="#999" />
                        </button>
                        <button className="flex cursor-pointer items-center justify-center rounded-md border-none bg-transparent p-1.5 hover:bg-[var(--bg-light-color)]">
                            <Icon name="Settings" size={16} color="#999" />
                        </button>

                        <Link
                            href="/projects/new"
                            className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-md border-none bg-[var(--accent-color)] px-3 py-1.5 text-xs font-semibold text-white transition-all duration-150 hover:bg-[var(--accent-light-color)]"
                        >
                            <Icon name="Plus" size={13} color="#fff" />
                            New Project
                        </Link>
                    </div>
                </header>

                <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
                    {projects.length > 0 ? (
                        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    issues={project.issues ?? []}
                                />
                            ))}
                            <Link
                                href="/projects/new"
                                className="group flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-[var(--bg-light-color)] bg-transparent transition-all duration-300 hover:border-[var(--accent-color)] hover:bg-[var(--accent-color-opacity)]"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-[var(--bg-light-color)] transition-all duration-300 group-hover:border-[var(--accent-color)] group-hover:bg-[var(--accent-color-opacity)]">
                                    <Icon
                                        name="Plus"
                                        size={18}
                                        className="text-zinc-500 transition-colors duration-200 group-hover:text-[var(--accent-color)]"
                                    />
                                </div>
                                <span className="text-xs font-semibold text-zinc-500 transition-colors duration-200 group-hover:text-[var(--accent-color)]">
                                    New Project
                                </span>
                            </Link>
                        </section>
                    ) : (
                        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-solid border-[var(--bg-light-color)] bg-[var(--bg-dark-color)]">
                                <Icon
                                    name="FolderSearch"
                                    size={28}
                                    className="text-zinc-500"
                                />
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
                    )}
                </main>
            </div>
        </div>
    );
}

export default Index;
