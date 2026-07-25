import { IssuePageLooks } from '@/types/Issues';
import { Project } from '@/types/Projects';
import { AssignableUser } from '@/types/Users';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import MainLayout from './MainLayout';

vi.mock('@/Components/Organisms/Sidebar/Sidebar', () => ({
    default: ({ projects }: { projects: Project[] }) => (
        <div data-testid="sidebar" data-projects-count={projects.length} />
    ),
}));

vi.mock('@/Components/Organisms/TopNav/TopNav', () => ({
    default: ({
        selectedLook,
        project,
    }: {
        selectedLook: IssuePageLooks;
        project: Project;
    }) => (
        <div
            data-testid="top-nav"
            data-selected-look={selectedLook}
            data-project-name={project.name}
        />
    ),
}));

const makeProject = (overrides: Partial<Project> = {}): Project => ({
    id: 1,
    name: 'Orbit',
    slug: 'orbit',
    description: '',
    color: 'purple',
    created_at: 0,
    updated_at: 0,
    ...overrides,
});

const makeUser = (overrides: Partial<AssignableUser> = {}): AssignableUser => ({
    id: 1,
    name: 'Jane Doe',
    ...overrides,
});

describe('MainLayout Component', () => {
    test('renders the children inside the main content area', () => {
        render(
            <MainLayout
                selectedLook="List"
                setSelectedLook={vi.fn()}
                projects={[]}
                project={makeProject()}
                users={[]}
            >
                <div>Page content</div>
            </MainLayout>,
        );

        expect(screen.getByText('Page content')).toBeInTheDocument();
    });

    test('renders both the Sidebar and TopNav alongside the children', () => {
        render(
            <MainLayout
                selectedLook="Board"
                setSelectedLook={vi.fn()}
                projects={[makeProject()]}
                project={makeProject()}
                users={[makeUser()]}
            >
                <div>Page content</div>
            </MainLayout>,
        );

        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('top-nav')).toBeInTheDocument();
        expect(screen.getByText('Page content')).toBeInTheDocument();
    });

    test('forwards the projects list to Sidebar', () => {
        const projects = [
            makeProject({ id: 1 }),
            makeProject({ id: 2 }),
            makeProject({ id: 3 }),
        ];

        render(
            <MainLayout
                selectedLook="List"
                setSelectedLook={vi.fn()}
                projects={projects}
                project={makeProject()}
                users={[]}
            >
                <div>Page content</div>
            </MainLayout>,
        );

        expect(screen.getByTestId('sidebar')).toHaveAttribute(
            'data-projects-count',
            '3',
        );
    });

    test('forwards selectedLook and the active project to TopNav', () => {
        render(
            <MainLayout
                selectedLook="Calendar"
                setSelectedLook={vi.fn()}
                projects={[]}
                project={makeProject({ name: 'Roadmap' })}
                users={[]}
            >
                <div>Page content</div>
            </MainLayout>,
        );

        const topNav = screen.getByTestId('top-nav');
        expect(topNav).toHaveAttribute('data-selected-look', 'Calendar');
        expect(topNav).toHaveAttribute('data-project-name', 'Roadmap');
    });
});
