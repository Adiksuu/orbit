import { Issue } from '@/types/Issues';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import IssueTable from './IssueTable';

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
});
