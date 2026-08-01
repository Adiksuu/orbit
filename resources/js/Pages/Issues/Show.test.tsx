import { Issue } from '@/types/Issues';
import { Project } from '@/types/Projects';
import { AssignableUser } from '@/types/Users';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import Show from './Show';

const mockPatch = vi.hoisted(() => vi.fn());
const mockRoute = vi.hoisted(() =>
    vi.fn(
        (name: string, id?: string | number) =>
            `/${name}/${Array.isArray(id) ? id.join('/') : (id ?? '')}`,
    ),
);

vi.stubGlobal('route', mockRoute);

vi.mock('@inertiajs/react', async () => {
    const React = await import('react');
    return {
        Link: ({ children, href, ...props }: Record<string, unknown>) =>
            React.createElement('a', { href, ...props }, children as never),
        router: {
            patch: mockPatch,
        },
    };
});

vi.mock('react-markdown', () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
}));
vi.mock('remark-gfm', () => ({ default: () => {} }));

vi.mock('@/Components/Organisms/Sidebar/Sidebar', () => ({
    default: () => <div data-testid="sidebar" />,
}));

const project: Project = {
    id: 1,
    name: 'Orbit',
    slug: 'orbit',
    description: '',
    color: 'purple',
    created_at: 0,
    updated_at: 0,
};

const users: AssignableUser[] = [
    { id: 1, name: 'Jane Cooper', avatar: undefined },
    { id: 2, name: 'Marcus Lee', avatar: undefined },
];

const buildIssue = (overrides: Partial<Issue> = {}): Issue => ({
    id: '42',
    title: 'Fix login crash',
    description: 'Steps to reproduce',
    status: 'open',
    priority: 'high',
    project_id: 1,
    user_id: 1,
    labels: ['bug'],
    created_at: 1_700_000_000_000,
    updated_at: 1_700_000_000_000,
    ...overrides,
});

describe('Issues/Show Page', () => {
    test('renders the issue title, description and sidebar fields', () => {
        render(
            <Show
                project={project}
                projects={[project]}
                issue={buildIssue()}
                users={users}
            />,
        );

        expect(screen.getByText('Fix login crash')).toBeInTheDocument();
        expect(screen.getByText('Steps to reproduce')).toBeInTheDocument();
        expect(screen.getByText('open')).toBeInTheDocument();
        expect(screen.getByText('high')).toBeInTheDocument();
    });

    test('editing the title commits via a PATCH to issues.update', async () => {
        const issue = buildIssue();
        render(
            <Show
                project={project}
                projects={[project]}
                issue={issue}
                users={users}
            />,
        );

        await userEvent.click(screen.getByText('Fix login crash'));
        const input = screen.getByRole('textbox');
        await userEvent.clear(input);
        await userEvent.type(input, 'Fix login crash on iOS{Enter}');

        expect(mockRoute).toHaveBeenCalledWith('issues.update', issue.id);
        expect(mockPatch).toHaveBeenCalledWith(
            '/issues.update/42',
            { title: 'Fix login crash on iOS' },
            { preserveScroll: true },
        );
    });

    test('changing the status opens the picker and commits the new value', async () => {
        render(
            <Show
                project={project}
                projects={[project]}
                issue={buildIssue()}
                users={users}
            />,
        );

        await userEvent.click(screen.getByText('open'));
        await userEvent.click(screen.getByText('closed'));

        expect(mockPatch).toHaveBeenCalledWith(
            expect.any(String),
            { status: 'closed' },
            { preserveScroll: true },
        );
    });

    test('changing the priority opens the picker and commits the new value', async () => {
        render(
            <Show
                project={project}
                projects={[project]}
                issue={buildIssue()}
                users={users}
            />,
        );

        await userEvent.click(screen.getByText('high'));
        await userEvent.click(screen.getByText('low'));

        expect(mockPatch).toHaveBeenCalledWith(
            expect.any(String),
            { priority: 'low' },
            { preserveScroll: true },
        );
    });

    test('assigning the issue to a user commits their id', async () => {
        render(
            <Show
                project={project}
                projects={[project]}
                issue={buildIssue()}
                users={users}
            />,
        );

        await userEvent.click(screen.getByText('Unassigned'));
        await userEvent.click(screen.getByText('Marcus Lee'));

        expect(mockPatch).toHaveBeenCalledWith(
            expect.any(String),
            { assignee_id: 2 },
            { preserveScroll: true },
        );
    });

    test('unassigning a currently-assigned issue commits null', async () => {
        render(
            <Show
                project={project}
                projects={[project]}
                issue={buildIssue({
                    assignee_id: 1,
                    assignee: {
                        id: 1,
                        name: 'Jane Cooper',
                        avatar: '',
                        email: '',
                        created_at: '',
                        updated_at: '',
                    },
                })}
                users={users}
            />,
        );

        await userEvent.click(screen.getByText('Jane Cooper'));
        await userEvent.click(screen.getByText('Unassigned'));

        expect(mockPatch).toHaveBeenCalledWith(
            expect.any(String),
            { assignee_id: null },
            { preserveScroll: true },
        );
    });

    test('toggling a label commits the updated labels array', async () => {
        render(
            <Show
                project={project}
                projects={[project]}
                issue={buildIssue({ labels: ['bug'] })}
                users={users}
            />,
        );

        await userEvent.click(screen.getAllByText('bug')[0]);
        await userEvent.click(screen.getByText('design'));

        expect(mockPatch).toHaveBeenCalledWith(
            expect.any(String),
            { labels: ['bug', 'design'] },
            { preserveScroll: true },
        );
    });
});
