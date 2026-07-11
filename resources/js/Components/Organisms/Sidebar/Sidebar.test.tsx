import { Project } from '@/types/Projects';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import Sidebar from './Sidebar';

const pageState = vi.hoisted(() => ({ url: '/' }));

vi.mock('@inertiajs/react', async () => {
    const React = await import('react');
    return {
        Link: ({ children, href, ...props }: Record<string, unknown>) =>
            React.createElement('a', { href, ...props }, children as never),
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
    test('renders the primary navigation items', () => {
        render(<Sidebar projects={[]} />);

        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Projects')).toBeInTheDocument();
        expect(screen.getByText('Inbox')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    test('shows the number of projects as a badge next to the PROJECTS heading', () => {
        render(
            <Sidebar
                projects={[
                    makeProject({ id: 1 }),
                    makeProject({ id: 2 }),
                    makeProject({ id: 3 }),
                ]}
            />,
        );

        // Find PROJECTS heading and verify it has a badge showing count
        const projectsHeading = screen.getByText('PROJECTS');
        expect(projectsHeading).toBeInTheDocument();
        // Check that Badge is rendered with count
        const badges = screen.getAllByText('3');
        expect(badges.length).toBeGreaterThanOrEqual(1);
    });

    test('renders a truncated, linked nav item for each project', () => {
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

        // Names are truncated to 16 characters and suffixed with "...".
        expect(screen.getByText('Orbit...')).toBeInTheDocument();
        expect(screen.getByText('A Very Long Proj...')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: /Orbit\.\.\./ }),
        ).toHaveAttribute('href', '/projects/5');
    });

    test('marks the Dashboard item active when on the root url', () => {
        pageState.url = '/';
        render(<Sidebar projects={[]} />);

        expect(screen.getByRole('link', { name: /dashboard/i })).toHaveClass(
            'text-white',
        );
    });

    test('is hidden off-canvas by default and opens when the menu button is clicked', async () => {
        const { container } = render(<Sidebar projects={[]} />);

        const aside = container.querySelector('aside') as HTMLElement;
        expect(aside).toHaveClass('-translate-x-full');
        expect(aside).not.toHaveClass('translate-x-0');

        const menuButton = container
            .querySelector('.lucide-menu')
            ?.closest('button') as HTMLElement;
        await userEvent.click(menuButton);

        expect(aside).toHaveClass('translate-x-0');
    });

    test('closes again when the backdrop is clicked', async () => {
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

    test('closes again when the in-panel close button is clicked', async () => {
        const { container } = render(<Sidebar projects={[]} />);

        const aside = container.querySelector('aside') as HTMLElement;
        const menuButton = container
            .querySelector('.lucide-menu')
            ?.closest('button') as HTMLElement;
        await userEvent.click(menuButton);
        expect(aside).toHaveClass('translate-x-0');

        // The X icon inside the panel header is the close button.
        const closeButton = aside
            .querySelector('.lucide-x')
            ?.closest('button') as HTMLElement;
        await userEvent.click(closeButton);

        expect(aside).toHaveClass('-translate-x-full');
    });
});
