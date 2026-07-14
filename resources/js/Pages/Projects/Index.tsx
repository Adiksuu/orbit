import Badge from '@/Components/Atoms/Badge/Badge';
import Button from '@/Components/Atoms/Button/Button';
import EmptyStateCard from '@/Components/Molecules/EmptyStateCard/EmptyStateCard';
import ProjectCard, {
    ProjectNewCard,
} from '@/Components/Molecules/ProjectCard/ProjectCard';
import PageHeader from '@/Components/Organisms/PageHeader/PageHeader';
import Sidebar from '@/Components/Organisms/Sidebar/Sidebar';
import { useShortcuts } from '@/context/ShortcutContext';
import { Project } from '@/types/Projects';

function Index({ projects }: { projects: Project[] }) {
    const { triggerShortcut } = useShortcuts();

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[var(--bg-color)]">
            <Sidebar projects={projects} />
            <div className="flex min-w-0 flex-1 flex-col">
                <PageHeader title={'Projects'}>
                    <Button
                        className={'gap-4 rounded-lg'}
                        id={'new-project-button'}
                        onClick={() => triggerShortcut('p')}
                    >
                        New project
                        <Badge
                            tooltip={true}
                            tooltipText={'Press P'}
                            variant={'ghost'}
                        >
                            <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-[#444] bg-[#222] px-1.5 font-mono text-[9px] font-bold text-[#888] shadow-sm group-hover:border-[#555] group-hover:text-[#ccc]">
                                P
                            </kbd>
                        </Badge>
                    </Button>
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
                        <EmptyStateCard
                            title={'Your dashboard is empty'}
                            description={
                                'It looks like you don’t have any projects yet. Create your first project to start organizing your work.'
                            }
                            iconName={'FolderPlus'}
                            actionLabel={'Create Project'}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}

export default Index;
