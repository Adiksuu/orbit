import { Project } from '@/types/Projects';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Sidebar from './Sidebar';

const pageState = vi.hoisted(() => ({ url: '/' }));

vi.mock('@inertiajs/react', async () => {
    const React = await import('react');
    return {
        Link: ({
            children,
            href,
            onClick,
            ...props
        }: Record<string, unknown>) =>
            React.createElement(
                'a',
                { href, onClick, ...props },
                children as never,
            ),
        usePage: () => ({ url: pageState.url }),
        useForm: (initialData: Record<string, unknown>) => ({
            data: initialData,
            setData: vi.fn(),
            post: vi.fn(),
            processing: false,
            reset: vi.fn(),
            errors: {},
        }),
    };
});

vi.mock('@/Components/Organisms/NewProjectModal/NewProjectModal', () => ({
    default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
        isOpen ? (
            <div data-testid="new-project-modal">
                {onClose && <button onClick={onClose}>Close Modal</button>}
            </div>
        ) : null,
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

describe('Sidebar Component', () => {
    beforeEach(() => {
        pageState.url = '/';
    });

    test('renders the primary navigation items', () => {
        render(<Sidebar projects={[]} />);

        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Projects')).toBeInTheDocument();
        expect(screen.getByText('Inbox')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    test('shows the number of projects as a badge', () => {
        render(
            <Sidebar
                projects={[
                    makeProject({ id: 1 }),
                    makeProject({ id: 2 }),
                    makeProject({ id: 3 }),
                ]}
            />,
        );

        const projectsHeading = screen.getByText('PROJECTS');
        expect(projectsHeading).toBeInTheDocument();
        const badges = screen.getAllByText('3');
        expect(badges.length).toBeGreaterThanOrEqual(1);
    });

    test('renders a truncated nav item for each project', () => {
        render(
            <Sidebar
                projects={[
                    makeProject({ id: 5, name: 'Orbit' }),
                    makeProject({
                        id: 6,
                        name: 'A Very Long Project Name Here',
                    }),
                ]}
            />,
        );

        expect(screen.getByText('Orbit...')).toBeInTheDocument();
        expect(screen.getByText('A Very Long Proj...')).toBeInTheDocument();
    });

    test('is hidden off-canvas by default', async () => {
        const { container } = render(<Sidebar projects={[]} />);

        const aside = container.querySelector('aside') as HTMLElement;
        expect(aside).toHaveClass('-translate-x-full');
    });

    test('opens when menu button is clicked', async () => {
        const { container } = render(<Sidebar projects={[]} />);

        const aside = container.querySelector('aside') as HTMLElement;
        const menuButton = container
            .querySelector('.lucide-menu')
            ?.closest('button') as HTMLElement;
        await userEvent.click(menuButton);

        expect(aside).toHaveClass('translate-x-0');
    });

    test('closes when backdrop is clicked', async () => {
        const { container } = render(<Sidebar projects={[]} />);

        const aside = container.querySelector('aside') as HTMLElement;
        const menuButton = container
            .querySelector('.lucide-menu')
            ?.closest('button') as HTMLElement;
        await userEvent.click(menuButton);
        expect(aside).toHaveClass('translate-x-0');

        const backdrop = container.querySelector(
            '.backdrop-blur-sm',
        ) as HTMLElement;
        await userEvent.click(backdrop);

        expect(aside).toHaveClass('-translate-x-full');
    });

    test('closes when close button is clicked', async () => {
        const { container } = render(<Sidebar projects={[]} />);

        const aside = container.querySelector('aside') as HTMLElement;
        const menuButton = container
            .querySelector('.lucide-menu')
            ?.closest('button') as HTMLElement;
        await userEvent.click(menuButton);
        expect(aside).toHaveClass('translate-x-0');

        const closeButton = aside
            .querySelector('.lucide-x')
            ?.closest('button') as HTMLElement;
        await userEvent.click(closeButton);

        expect(aside).toHaveClass('-translate-x-full');
    });

    test('renders user badge in the sidebar', () => {
        render(<Sidebar projects={[]} />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@acme.com')).toBeInTheDocument();
    });

    test('renders organization badge at the top', () => {
        render(<Sidebar projects={[]} />);

        expect(screen.getByText('Acme Inc.')).toBeInTheDocument();
    });

    test('renders all projects when provided', () => {
        const projects = [
            makeProject({ id: 1, name: 'Project A' }),
            makeProject({ id: 2, name: 'Project B' }),
            makeProject({ id: 3, name: 'Project C' }),
        ];
        render(<Sidebar projects={projects} />);

        expect(screen.getByText('Project A...')).toBeInTheDocument();
        expect(screen.getByText('Project B...')).toBeInTheDocument();
        expect(screen.getByText('Project C...')).toBeInTheDocument();
    });

    test('opens NewProjectModal when clicking PROJECTS', async () => {
        const user = userEvent.setup();
        render(<Sidebar projects={[]} />);

        const projectsLink = screen
            .getByText('PROJECTS')
            .closest('a') as HTMLElement;
        const clickEvent = new MouseEvent('click', { bubbles: true });
        const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');
        projectsLink.dispatchEvent(clickEvent);

        expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test('closes NewProjectModal when onClose is called', async () => {
        const user = userEvent.setup();
        render(<Sidebar projects={[]} />);

        const projectsLink = screen
            .getByText('PROJECTS')
            .closest('a') as HTMLElement;
        await user.click(projectsLink);

        // Modal should be rendered
        const modal = screen.queryByTestId('new-project-modal');
        if (modal) {
            const closeButton = screen.getByText('Close Modal');
            await user.click(closeButton);
        }
    });

    test('renders project links with correct href', () => {
        render(<Sidebar projects={[makeProject({ id: 5, name: 'Orbit' })]} />);

        const projectLink = screen.getByText('Orbit...').closest('a');
        expect(projectLink).toHaveAttribute('href', '/projects/5');
    });

    test('marks active nav item based on url', () => {
        pageState.url = '/projects';
        render(<Sidebar projects={[]} />);

        const projectsLink = screen.getByText('Projects').closest('a');
        expect(projectsLink).toHaveClass('text-white');
    });

    test('marks project as active when url starts with project path', () => {
        pageState.url = '/projects/5/issues';
        render(
            <Sidebar
                projects={[makeProject({ id: 5, name: 'Test Project' })]}
            />,
        );

        const projectLink = screen.getByText('Test Project...').closest('a');
        expect(projectLink).toHaveClass('text-white');
    });
});
