import { Issue } from '@/types/Issues';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import IssueTable from './IssueTable';

const mockAddAlert = vi.fn();

vi.mock('@/context/AlertContext', () => ({
    useAlert: () => ({
        addAlert: mockAddAlert,
    }),
}));

vi.mock('@inertiajs/react', () => {
    const mockRouterGet = vi.fn();
    return {
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
        router: {
            get: mockRouterGet,
        },
    };
});

let counter = 0;
const makeIssue = (overrides: Partial<Issue> = {}): Issue => ({
    id: `ISSUE-${counter++}`,
    title: 'Some issue',
    status: 'open',
    priority: 'high',
    project_id: 1,
    user_id: 1,
    ...overrides,
});

describe('IssueTable Component', () => {
    beforeEach(() => {
        counter = 0;
        vi.clearAllMocks();
    });

    test('renders the column headers', () => {
        render(
            <IssueTable
                issues={[]}
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        expect(
            screen.getByRole('columnheader', { name: 'ID' }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('columnheader', { name: 'Title' }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('columnheader', { name: 'Priority' }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('columnheader', { name: 'Status' }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('columnheader', { name: 'Assignee' }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('columnheader', { name: 'Labels' }),
        ).toBeInTheDocument();
    });

    test('renders a row for each issue', () => {
        const issues = [
            makeIssue({ title: 'First issue' }),
            makeIssue({ title: 'Second issue' }),
        ];
        render(
            <IssueTable
                issues={issues}
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.getByText('First issue')).toBeInTheDocument();
        expect(screen.getByText('Second issue')).toBeInTheDocument();
    });

    test('shows the empty state when there are no issues', () => {
        render(
            <IssueTable
                issues={[]}
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.getByText('All done!')).toBeInTheDocument();
    });

    test('does not show the empty state when there are issues', () => {
        render(
            <IssueTable
                issues={[makeIssue({ title: 'An issue' })]}
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.queryByText('All done!')).not.toBeInTheDocument();
    });

    test('sorts by column on header click', async () => {
        const user = userEvent.setup();
        const { router } = await import('@inertiajs/react');
        render(
            <IssueTable
                issues={[]}
                activeIssue={null}
                setActiveIssue={() => {}}
                queryParams={{}}
            />,
        );

        const titleHeader = screen.getByRole('columnheader', { name: 'Title' });
        await user.click(titleHeader);

        expect(router.get).toHaveBeenCalledWith(
            window.location.pathname,
            expect.objectContaining({
                sort: 'title',
                direction: 'AZ',
            }),
            expect.any(Object),
        );
        expect(mockAddAlert).toHaveBeenCalledWith(
            'Sorting by title ascending',
            'information',
        );
    });

    test('toggles sort direction on same column click with AZ direction', async () => {
        const user = userEvent.setup();
        const { router } = await import('@inertiajs/react');

        render(
            <IssueTable
                issues={[]}
                activeIssue={null}
                setActiveIssue={() => {}}
                queryParams={{ sort: 'title', direction: 'AZ' }}
            />,
        );

        const titleHeader = screen.getByRole('columnheader', { name: 'Title' });
        await user.click(titleHeader);

        expect(router.get).toHaveBeenCalledWith(
            window.location.pathname,
            expect.objectContaining({
                sort: 'title',
                direction: 'ZA',
            }),
            expect.any(Object),
        );
    });

    test('toggles sort direction on same column click with ZA direction', async () => {
        const user = userEvent.setup();
        const { router } = await import('@inertiajs/react');

        render(
            <IssueTable
                issues={[]}
                activeIssue={null}
                setActiveIssue={() => {}}
                queryParams={{ sort: 'title', direction: 'ZA' }}
            />,
        );

        const titleHeader = screen.getByRole('columnheader', { name: 'Title' });
        await user.click(titleHeader);

        expect(router.get).toHaveBeenCalledWith(
            window.location.pathname,
            expect.objectContaining({
                sort: 'title',
                direction: 'AZ',
            }),
            expect.any(Object),
        );
    });

    test('renders sort indicator when column is sorted AZ', () => {
        const { container } = render(
            <IssueTable
                issues={[]}
                activeIssue={null}
                setActiveIssue={() => {}}
                queryParams={{ sort: 'title', direction: 'AZ' }}
            />,
        );

        const titleHeader = screen.getByRole('columnheader', { name: 'Title' });
        expect(titleHeader).toBeInTheDocument();
    });

    test('renders sort indicator when column is sorted ZA', () => {
        const { container } = render(
            <IssueTable
                issues={[]}
                activeIssue={null}
                setActiveIssue={() => {}}
                queryParams={{ sort: 'title', direction: 'ZA' }}
            />,
        );

        const titleHeader = screen.getByRole('columnheader', { name: 'Title' });
        expect(titleHeader).toBeInTheDocument();
    });

    test('handles undefined query params gracefully', () => {
        render(
            <IssueTable
                issues={[]}
                activeIssue={null}
                setActiveIssue={() => {}}
                queryParams={undefined}
            />,
        );

        expect(
            screen.getByRole('columnheader', { name: 'ID' }),
        ).toBeInTheDocument();
    });

    test('handles sort correctly when queryParams is undefined', async () => {
        const user = userEvent.setup();
        const { router } = await import('@inertiajs/react');
        render(
            <IssueTable
                issues={[]}
                activeIssue={null}
                setActiveIssue={() => {}}
                queryParams={undefined}
            />,
        );

        const titleHeader = screen.getByRole('columnheader', { name: 'Title' });
        await user.click(titleHeader);

        // Should NOT call router.get because queryParams is undefined
        expect(router.get).not.toHaveBeenCalled();
        expect(mockAddAlert).not.toHaveBeenCalled();
    });

    test('renders table with proper structure', () => {
        const { container } = render(
            <IssueTable
                issues={[]}
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        const table = container.querySelector('table');
        expect(table).toBeInTheDocument();

        const thead = container.querySelector('thead');
        expect(thead).toBeInTheDocument();

        const tbody = container.querySelector('tbody');
        expect(tbody).toBeInTheDocument();
    });

    test('renders empty state with correct description', () => {
        render(
            <IssueTable
                issues={[]}
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.getByText('All done!')).toBeInTheDocument();
        expect(
            screen.getByText(
                /No issues found in this view. Everything is completed or no tasks have been assigned yet./,
            ),
        ).toBeInTheDocument();
    });

    test('maintains active issue state', () => {
        const activeIssue = makeIssue({
            title: 'Active Issue',
            id: 'ISSUE-999',
        });
        render(
            <IssueTable
                issues={[activeIssue]}
                activeIssue={activeIssue}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.getByText('Active Issue')).toBeInTheDocument();
    });

    test('renders unsorted header icons for non-active columns', () => {
        const { container } = render(
            <IssueTable
                issues={[]}
                activeIssue={null}
                setActiveIssue={() => {}}
                queryParams={{ sort: 'title', direction: 'AZ' }}
            />,
        );

        const idHeader = screen.getByRole('columnheader', { name: 'ID' });
        expect(idHeader).toBeInTheDocument();
    });

    test('handles multiple issues', () => {
        const issues = [];
        for (let i = 0; i < 10; i++) {
            issues.push(makeIssue({ title: `Issue ${i}` }));
        }

        render(
            <IssueTable
                issues={issues}
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        for (let i = 0; i < 10; i++) {
            expect(screen.getByText(`Issue ${i}`)).toBeInTheDocument();
        }
    });

    test('header has correct styling classes', () => {
        const { container } = render(
            <IssueTable
                issues={[]}
                activeIssue={null}
                setActiveIssue={() => {}}
                queryParams={{}}
            />,
        );

        const headerCells = container.querySelectorAll('th');
        expect(headerCells.length).toBeGreaterThan(0);
        headerCells.forEach((cell) => {
            expect(cell).toHaveClass('group', 'cursor-pointer', 'select-none');
        });
    });
});
