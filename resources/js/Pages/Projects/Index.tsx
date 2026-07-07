import Icon from '@/Components/Atoms/Icon/Icon';
import ProjectCard, {
    ProjectNewCard,
} from '@/Components/Molecules/ProjectCard/ProjectCard';
import ProjectEmptyState from '@/Components/Molecules/ProjectEmptyState/ProjectEmptyState';
import PageHeader from '@/Components/Organisms/PageHeader/PageHeader';
import Sidebar from '@/Components/Organisms/Sidebar/Sidebar';
import { Project } from '@/types/Projects';
import { Link } from '@inertiajs/react';

function Index({ projects }: { projects: Project[] }) {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[var(--bg-color)]">
            <Sidebar projects={projects} />
            <div className="flex min-w-0 flex-1 flex-col">
                <PageHeader title={'Projects'}>
                    <Link
                        href="/projects/new"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-md border-none bg-[var(--accent-color)] px-3 py-1.5 text-xs font-semibold text-white transition-all duration-150 hover:bg-[var(--accent-light-color)]"
                    >
                        <Icon name="Plus" size={13} color="#fff" />
                        New Project
                    </Link>
                </PageHeader>
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
                            <ProjectNewCard />
                        </section>
                    ) : (
                        <ProjectEmptyState />
                    )}
                </main>
            </div>
        </div>
    );
}

export default Index;
