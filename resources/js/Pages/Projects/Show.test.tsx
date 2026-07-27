import { SavedFilter } from '@/hooks/useSavedFilters';
import { Issue, IssuePageLooks, PaginatedResponse } from '@/types/Issues';
import { Project } from '@/types/Projects';
import { AssignableUser } from '@/types/Users';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Show from './Show';
import React from 'react';

vi.mock('@/Layouts/MainLayout', () => ({
    default: ({
        children,
        selectedLook,
        setSelectedLook,
        project,
        projects,
        users,
    }: {
        children: React.ReactNode;
        selectedLook: IssuePageLooks;
        setSelectedLook: (look: IssuePageLooks) => void;
        project: Project;
        projects: Project[];
        users: AssignableUser[];
    }) => (
        <div
            data-testid="main-layout"
            data-selected-look={selectedLook}
            data-project-name={project.name}
            data-projects-count={projects.length}
            data-users-count={users.length}
        >
            <button onClick={() => setSelectedLook('List')}>
                Switch to List
            </button>
            <button onClick={() => setSelectedLook('Board')}>
                Switch to Board
            </button>
            <button onClick={() => setSelectedLook('Calendar')}>
                Switch to Calendar
            </button>
            {children}
        </div>
    ),
}));

vi.mock('@/Components/Organisms/FilterBar/FilterBar', () => ({
    default: ({
        queryParams,
        project,
        savedFilters,
        users,
    }: {
        queryParams?: Record<string, unknown>;
        project: Project;
        savedFilters: SavedFilter[];
        users: AssignableUser[];
    }) => (
        <div
            data-testid="filter-bar"
            data-project-name={project.name}
            data-saved-filters-count={savedFilters.length}
            data-users-count={users.length}
            data-query-params={JSON.stringify(queryParams ?? {})}
        />
    ),
}));

vi.mock('@/Components/Molecules/Pagination/Pagination', () => ({
    default: ({
        from,
        to,
        total,
    }: {
        from: number;
        to: number;
        total: number;
    }) => (
        <div
            data-testid="pagination"
            data-from={from}
            data-to={to}
            data-total={total}
        />
    ),
}));

vi.mock('@/Components/Organisms/IssueTable/IssueTable', () => ({
    default: ({
        issues,
        setActiveIssue,
        pagination,
    }: {
        issues: Issue[];
        activeIssue: Issue | null;
        setActiveIssue: (issue: Issue | null, edit?: boolean) => void;
        pagination?: React.ReactNode;
    }) => (
        <div data-testid="issue-table" data-issues-count={issues.length}>
            {issues[0] && (
                <button onClick={() => setActiveIssue(issues[0])}>
                    Open table {issues[0].id}
                </button>
            )}
            {pagination}
        </div>
    ),
}));

vi.mock('@/Components/Organisms/IssueBoard/IssueBoard', () => ({
    default: ({
        issues,
        setActiveIssue,
    }: {
        issues: Issue[];
        activeIssue: Issue | null;
        setActiveIssue: (issue: Issue | null, edit?: boolean) => void;
    }) => (
        <div data-testid="issue-board" data-issues-count={issues.length}>
            {issues[0] && (
                <button onClick={() => setActiveIssue(issues[0])}>
                    Open board {issues[0].id}
                </button>
            )}
        </div>
    ),
}));

vi.mock('@/Components/Organisms/CalendarView/CalendarView', () => ({
    default: ({
        issues,
        setActiveIssue,
    }: {
        issues: Issue[];
        activeIssue: Issue | null;
        setActiveIssue: (issue: Issue | null) => void;
    }) => (
        <div data-testid="calendar-view" data-issues-count={issues.length}>
            {issues[0] && (
                <button onClick={() => setActiveIssue(issues[0])}>
                    Open calendar {issues[0].id}
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

const makePaginated = (
    data: Issue[],
    overrides: Partial<PaginatedResponse<Issue>> = {},
): PaginatedResponse<Issue> => ({
    current_page: 1,
    data,
    first_page_url: '/projects/1?page=1',
    from: 1,
    last_page: 1,
    last_page_url: '/projects/1?page=1',
    links: [],
    next_page_url: null,
    path: '/projects/1',
    per_page: 20,
    prev_page_url: null,
    to: data.length,
    total: data.length,
    ...overrides,
});

const makeUser = (overrides: Partial<AssignableUser> = {}): AssignableUser => ({
    id: 1,
    name: 'Jane Doe',
    ...overrides,
});

describe('Projects Show Page', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('renders FilterBar and MainLayout with the wired project/filters/users data', () => {
        const project = makeProject({ name: 'Roadmap' });
        const savedFilters: SavedFilter[] = [
            {
                id: 1,
                project_id: 1,
                name: 'My filter',
                context: 'project_1',
                query_params: {},
            },
        ];
        render(
            <Show
                project={project}
                issues={makePaginated([])}
                projects={[project]}
                savedFilters={savedFilters}
                users={[makeUser()]}
            />,
        );

        const layout = screen.getByTestId('main-layout');
        expect(layout).toHaveAttribute('data-project-name', 'Roadmap');
        expect(layout).toHaveAttribute('data-projects-count', '1');
        expect(layout).toHaveAttribute('data-users-count', '1');

        const filterBar = screen.getByTestId('filter-bar');
        expect(filterBar).toHaveAttribute('data-project-name', 'Roadmap');
        expect(filterBar).toHaveAttribute('data-saved-filters-count', '1');
        expect(filterBar).toHaveAttribute('data-users-count', '1');
    });

    test('defaults to the List view and renders IssueTable with its pagination', () => {
        const issues = [makeIssue()];
        render(
            <Show
                project={makeProject()}
                issues={makePaginated(issues, { from: 1, to: 1, total: 1 })}
                projects={[]}
                savedFilters={[]}
                users={[]}
            />,
        );

        expect(screen.getByTestId('main-layout')).toHaveAttribute(
            'data-selected-look',
            'List',
        );
        expect(screen.getByTestId('issue-table')).toHaveAttribute(
            'data-issues-count',
            '1',
        );
        const pagination = screen.getByTestId('pagination');
        expect(pagination).toHaveAttribute('data-from', '1');
        expect(pagination).toHaveAttribute('data-to', '1');
        expect(pagination).toHaveAttribute('data-total', '1');
        expect(screen.queryByTestId('issue-board')).not.toBeInTheDocument();
        expect(screen.queryByTestId('calendar-view')).not.toBeInTheDocument();
    });

    test('reads the initial view from localStorage when valid', () => {
        localStorage.setItem('selectedLook', 'Board');
        render(
            <Show
                project={makeProject()}
                issues={makePaginated([])}
                projects={[]}
                savedFilters={[]}
                users={[]}
            />,
        );

        expect(screen.getByTestId('main-layout')).toHaveAttribute(
            'data-selected-look',
            'Board',
        );
        expect(screen.getByTestId('issue-board')).toBeInTheDocument();
    });

    test('falls back to List when localStorage has an invalid value', () => {
        localStorage.setItem('selectedLook', 'Nonsense');
        render(
            <Show
                project={makeProject()}
                issues={makePaginated([])}
                projects={[]}
                savedFilters={[]}
                users={[]}
            />,
        );

        expect(screen.getByTestId('main-layout')).toHaveAttribute(
            'data-selected-look',
            'List',
        );
    });

    test('switches to the Board view, renders IssueBoard + Pagination, and persists the choice', async () => {
        const user = userEvent.setup();
        const issues = [makeIssue()];
        render(
            <Show
                project={makeProject()}
                issues={makePaginated(issues, { from: 1, to: 1, total: 1 })}
                projects={[]}
                savedFilters={[]}
                users={[]}
            />,
        );

        await user.click(
            screen.getByRole('button', { name: 'Switch to Board' }),
        );

        expect(screen.getByTestId('main-layout')).toHaveAttribute(
            'data-selected-look',
            'Board',
        );
        expect(screen.getByTestId('issue-board')).toBeInTheDocument();
        expect(screen.getByTestId('pagination')).toBeInTheDocument();
        expect(screen.queryByTestId('issue-table')).not.toBeInTheDocument();
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'selectedLook',
            'Board',
        );
    });

    test('switches to the Calendar view and hides pagination', async () => {
        const user = userEvent.setup();
        render(
            <Show
                project={makeProject()}
                issues={makePaginated([makeIssue()])}
                projects={[]}
                savedFilters={[]}
                users={[]}
            />,
        );

        await user.click(
            screen.getByRole('button', { name: 'Switch to Calendar' }),
        );

        expect(screen.getByTestId('calendar-view')).toBeInTheDocument();
        expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'selectedLook',
            'Calendar',
        );
    });

    test('opens IssueDetail when an issue is selected from the List view', async () => {
        const user = userEvent.setup();
        const issue = makeIssue({ id: 'ISSUE-select-test' });
        render(
            <Show
                project={makeProject()}
                issues={makePaginated([issue])}
                projects={[]}
                savedFilters={[]}
                users={[makeUser()]}
            />,
        );

        expect(screen.queryByTestId('issue-detail')).not.toBeInTheDocument();

        await user.click(screen.getByText(`Open table ${issue.id}`));

        const detail = screen.getByTestId('issue-detail');
        expect(detail).toHaveAttribute('data-issue-id', issue.id);
        expect(detail).toHaveAttribute('data-users-count', '1');
    });

    test('closes IssueDetail when onClose is triggered', async () => {
        const user = userEvent.setup();
        const issue = makeIssue({ id: 'ISSUE-close-test' });
        render(
            <Show
                project={makeProject()}
                issues={makePaginated([issue])}
                projects={[]}
                savedFilters={[]}
                users={[]}
            />,
        );

        await user.click(screen.getByText(`Open table ${issue.id}`));
        expect(screen.getByTestId('issue-detail')).toBeInTheDocument();

        await user.click(screen.getByText('Close'));
        expect(screen.queryByTestId('issue-detail')).not.toBeInTheDocument();
    });

    test('auto-opens IssueDetail for the issue referenced by queryParams.issue', () => {
        const targetIssue = makeIssue({ id: 'ISSUE-deep-link' });
        const otherIssue = makeIssue({ id: 'ISSUE-other' });
        render(
            <Show
                project={makeProject()}
                issues={makePaginated([otherIssue, targetIssue])}
                projects={[]}
                savedFilters={[]}
                users={[]}
                queryParams={{ issue: targetIssue.id }}
            />,
        );

        expect(screen.getByTestId('issue-detail')).toHaveAttribute(
            'data-issue-id',
            targetIssue.id,
        );
    });

    test('does not open IssueDetail when queryParams.issue does not match any issue', () => {
        render(
            <Show
                project={makeProject()}
                issues={makePaginated([makeIssue()])}
                projects={[]}
                savedFilters={[]}
                users={[]}
                queryParams={{ issue: 'does-not-exist' }}
            />,
        );

        expect(screen.queryByTestId('issue-detail')).not.toBeInTheDocument();
    });

    test('keeps the active issue in sync when the issues prop is updated', async () => {
        const user = userEvent.setup();
        const original = makeIssue({ id: 'ISSUE-sync-test', title: 'Old' });
        const { rerender } = render(
            <Show
                project={makeProject()}
                issues={makePaginated([original])}
                projects={[]}
                savedFilters={[]}
                users={[]}
            />,
        );

        await user.click(screen.getByText(`Open table ${original.id}`));
        expect(screen.getByTestId('issue-detail')).toHaveAttribute(
            'data-issue-id',
            original.id,
        );

        const updated = { ...original, title: 'New' };
        rerender(
            <Show
                project={makeProject()}
                issues={makePaginated([updated])}
                projects={[]}
                savedFilters={[]}
                users={[]}
            />,
        );

        expect(screen.getByTestId('issue-detail')).toHaveAttribute(
            'data-issue-id',
            original.id,
        );
    });

    test('forwards queryParams to FilterBar and IssueTable', () => {
        const queryParams = {
            sort: 'title' as const,
            direction: 'AZ' as const,
        };
        render(
            <Show
                project={makeProject()}
                issues={makePaginated([])}
                projects={[]}
                savedFilters={[]}
                users={[]}
                queryParams={queryParams}
            />,
        );

        expect(screen.getByTestId('filter-bar')).toHaveAttribute(
            'data-query-params',
            JSON.stringify(queryParams),
        );
    });
});
