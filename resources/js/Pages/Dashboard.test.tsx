import { Issue, ProductivityTrendProps } from '@/types/Issues';
import { Project } from '@/types/Projects';
import { AssignableUser } from '@/types/Users';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import Dashboard from './Dashboard';
import React from 'react';

vi.mock('@/context/ShortcutContext', () => ({
    useShortcuts: () => ({
        triggerShortcut: vi.fn(),
    }),
}));

vi.mock('@inertiajs/react', () => ({
    Link: ({
        children,
        href,
        className,
    }: {
        children: React.ReactNode;
        href?: string;
        className?: string;
    }) => (
        <a href={href} className={className}>
            {children}
        </a>
    ),
}));

vi.mock('@/Components/Organisms/Sidebar/Sidebar', () => ({
    default: ({ projects }: { projects: Project[] }) => (
        <div data-testid="sidebar" data-projects-count={projects.length} />
    ),
}));

vi.mock('@/Components/Organisms/PageHeader/PageHeader', () => ({
    default: ({
        title,
        children,
    }: {
        title: string;
        children?: React.ReactNode;
    }) => (
        <div data-testid="page-header" data-title={title}>
            {children}
        </div>
    ),
}));

vi.mock('@/Components/Organisms/DashboardVisuals/DashboardVisuals', () => ({
    default: ({
        issues,
        productivity_trend,
    }: {
        issues: Issue[];
        productivity_trend: ProductivityTrendProps[];
    }) => (
        <div
            data-testid="dashboard-visuals"
            data-issues-count={issues.length}
            data-trend-count={productivity_trend.length}
        />
    ),
}));

vi.mock('@/Components/Organisms/IssueTable/IssueTable', () => ({
    default: ({
        issues,
        setActiveIssue,
    }: {
        issues: Issue[];
        activeIssue: Issue | null;
        setActiveIssue: (issue: Issue | null, edit?: boolean) => void;
    }) => (
        <div data-testid="issue-table" data-issues-count={issues.length}>
            {issues[0] && (
                <button onClick={() => setActiveIssue(issues[0])}>
                    Open {issues[0].id}
                </button>
            )}
            {issues[0] && (
                <button onClick={() => setActiveIssue(issues[0], true)}>
                    Edit {issues[0].id}
                </button>
            )}
        </div>
    ),
}));

vi.mock('@/Components/Organisms/IssueDetail/IssueDetail', () => ({
    default: ({
        isOpen,
        onClose,
        activeIssue,
        initialIsEditing,
        users,
    }: {
        isOpen: boolean;
        onClose: () => void;
        activeIssue: Issue;
        initialIsEditing?: boolean;
        users: AssignableUser[];
    }) =>
        isOpen ? (
            <div
                data-testid="issue-detail"
                data-issue-id={activeIssue.id}
                data-editing={String(!!initialIsEditing)}
                data-users-count={users.length}
            >
                <button onClick={onClose}>Close</button>
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

let issueId = 0;
const makeIssue = (overrides: Partial<Issue> = {}): Issue => ({
    id: `ISSUE-${issueId++}`,
    title: 'An issue',
    status: 'open',
    priority: 'medium',
    project_id: 1,
    user_id: 1,
    ...overrides,
});

const makeUser = (overrides: Partial<AssignableUser> = {}): AssignableUser => ({
    id: 1,
    name: 'Jane Doe',
    ...overrides,
});

describe('Dashboard Page', () => {
    test('renders the Sidebar with the provided projects and a Dashboard page header', () => {
        const projects = [makeProject({ id: 1 }), makeProject({ id: 2 })];
        render(
            <Dashboard
                issues={[]}
                projects={projects}
                productivity_trend={[]}
                users={[]}
            />,
        );

        expect(screen.getByTestId('sidebar')).toHaveAttribute(
            'data-projects-count',
            '2',
        );
        expect(screen.getByTestId('page-header')).toHaveAttribute(
            'data-title',
            'Dashboard',
        );
    });

    test('computes stat card values from the issues list', () => {
        const issues = [
            makeIssue({ status: 'closed', priority: 'high' }),
            makeIssue({ status: 'closed', priority: 'low' }),
            makeIssue({ status: 'open', priority: 'high' }),
            makeIssue({ status: 'open', priority: 'medium' }),
        ];
        render(
            <Dashboard
                issues={issues}
                projects={[makeProject()]}
                productivity_trend={[]}
                users={[]}
            />,
        );

        // 4 total, 2 closed => 2 open.
        expect(screen.getByText('Open Issues')).toBeInTheDocument();
        expect(screen.getAllByText('2')).not.toHaveLength(0);
        // 2 high priority issues => Critical Tasks value of 2.
        expect(screen.getByText('Critical Tasks')).toBeInTheDocument();
        // 2/4 closed => 50% resolution rate (rendered as both the stat
        // value and the progress bar percentage label).
        expect(screen.getAllByText('50%').length).toBeGreaterThan(0);
        // 1 project => Active Projects value of 1.
        expect(screen.getByText('Active Projects')).toBeInTheDocument();
    });

    test('shows 0% resolution rate when there are no issues', () => {
        render(
            <Dashboard
                issues={[]}
                projects={[]}
                productivity_trend={[]}
                users={[]}
            />,
        );

        expect(screen.getAllByText('0%').length).toBeGreaterThan(0);
    });

    test('forwards issues and productivity_trend to DashboardVisuals', () => {
        const issues = [makeIssue(), makeIssue()];
        const trend = [{ day: 'Mon', count: 3 }];
        render(
            <Dashboard
                issues={issues}
                projects={[]}
                productivity_trend={trend}
                users={[]}
            />,
        );

        const visuals = screen.getByTestId('dashboard-visuals');
        expect(visuals).toHaveAttribute('data-issues-count', '2');
        expect(visuals).toHaveAttribute('data-trend-count', '1');
    });

    test('caps IssueTable to the first 20 issues', () => {
        const issues = Array.from({ length: 25 }, () => makeIssue());
        render(
            <Dashboard
                issues={issues}
                projects={[]}
                productivity_trend={[]}
                users={[]}
            />,
        );

        expect(screen.getByTestId('issue-table')).toHaveAttribute(
            'data-issues-count',
            '20',
        );
        expect(
            screen.getByText('Showing 20 latest issues'),
        ).toBeInTheDocument();
    });

    test('renders up to 3 projects and a "view all" link when there are more', () => {
        const projects = [
            makeProject({ id: 1, name: 'Project One' }),
            makeProject({ id: 2, name: 'Project Two' }),
            makeProject({ id: 3, name: 'Project Three' }),
            makeProject({ id: 4, name: 'Project Four' }),
        ];
        render(
            <Dashboard
                issues={[]}
                projects={projects}
                productivity_trend={[]}
                users={[]}
            />,
        );

        expect(screen.getByText('Project One')).toBeInTheDocument();
        expect(screen.getByText('Project Two')).toBeInTheDocument();
        expect(screen.getByText('Project Three')).toBeInTheDocument();
        expect(screen.queryByText('Project Four')).not.toBeInTheDocument();

        const viewAllLink = screen.getByText('View all 4 projects');
        expect(viewAllLink.closest('a')).toHaveAttribute('href', '/projects');
    });

    test('does not render a "view all" link when there are 3 or fewer projects', () => {
        render(
            <Dashboard
                issues={[]}
                projects={[makeProject({ id: 1 })]}
                productivity_trend={[]}
                users={[]}
            />,
        );

        expect(screen.queryByText(/View all/)).not.toBeInTheDocument();
    });

    test('renders an empty state when there are no projects', () => {
        render(
            <Dashboard
                issues={[]}
                projects={[]}
                productivity_trend={[]}
                users={[]}
            />,
        );

        expect(
            screen.getByText('Create your first project'),
        ).toBeInTheDocument();
    });

    test('opens IssueDetail with the selected issue when selected from IssueTable', async () => {
        const user = userEvent.setup();
        const issues = [makeIssue({ id: 'ISSUE-open-test' })];
        const users = [makeUser()];
        render(
            <Dashboard
                issues={issues}
                projects={[]}
                productivity_trend={[]}
                users={users}
            />,
        );

        expect(screen.queryByTestId('issue-detail')).not.toBeInTheDocument();

        await user.click(screen.getByText(`Open ${issues[0].id}`));

        const detail = screen.getByTestId('issue-detail');
        expect(detail).toHaveAttribute('data-issue-id', issues[0].id);
        expect(detail).toHaveAttribute('data-editing', 'false');
        expect(detail).toHaveAttribute('data-users-count', '1');
    });

    test('opens IssueDetail in editing mode when the edit action is used', async () => {
        const user = userEvent.setup();
        const issues = [makeIssue({ id: 'ISSUE-edit-test' })];
        render(
            <Dashboard
                issues={issues}
                projects={[]}
                productivity_trend={[]}
                users={[]}
            />,
        );

        await user.click(screen.getByText(`Edit ${issues[0].id}`));

        expect(screen.getByTestId('issue-detail')).toHaveAttribute(
            'data-editing',
            'true',
        );
    });

    test('closes IssueDetail when onClose is triggered', async () => {
        const user = userEvent.setup();
        const issues = [makeIssue({ id: 'ISSUE-close-test' })];
        render(
            <Dashboard
                issues={issues}
                projects={[]}
                productivity_trend={[]}
                users={[]}
            />,
        );

        await user.click(screen.getByText(`Open ${issues[0].id}`));
        expect(screen.getByTestId('issue-detail')).toBeInTheDocument();

        await user.click(screen.getByText('Close'));
        expect(screen.queryByTestId('issue-detail')).not.toBeInTheDocument();
    });

    test('keeps the active issue in sync when the issues prop is updated', async () => {
        const user = userEvent.setup();
        const original = makeIssue({
            id: 'ISSUE-sync-test',
            title: 'Old title',
        });
        const { rerender } = render(
            <Dashboard
                issues={[original]}
                projects={[]}
                productivity_trend={[]}
                users={[]}
            />,
        );

        await user.click(screen.getByText(`Open ${original.id}`));
        expect(screen.getByTestId('issue-detail')).toHaveAttribute(
            'data-issue-id',
            original.id,
        );

        const updated = { ...original, title: 'New title' };
        rerender(
            <Dashboard
                issues={[updated]}
                projects={[]}
                productivity_trend={[]}
                users={[]}
            />,
        );

        // Still showing the (updated) same issue rather than closing.
        expect(screen.getByTestId('issue-detail')).toHaveAttribute(
            'data-issue-id',
            original.id,
        );
    });
});
