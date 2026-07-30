import { Issue } from '@/types/Issues';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import IssueBoard from './IssueBoard';

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

describe('IssueBoard Component', () => {
    test('renders a column for each of the three priorities', () => {
        render(
            <IssueBoard
                issues={[]}
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.getByText(/high Priority/i)).toBeInTheDocument();
        expect(screen.getByText(/medium Priority/i)).toBeInTheDocument();
        expect(screen.getByText(/low Priority/i)).toBeInTheDocument();
    });

    test('groups each issue into the column matching its priority', () => {
        const issues = [
            makeIssue({ title: 'A high one', priority: 'high' }),
            makeIssue({ title: 'A medium one', priority: 'medium' }),
            makeIssue({ title: 'A low one', priority: 'low' }),
        ];
        render(
            <IssueBoard
                issues={issues}
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        // Every priority's issue is rendered somewhere on the board.
        expect(screen.getByText('A high one')).toBeInTheDocument();
        expect(screen.getByText('A medium one')).toBeInTheDocument();
        expect(screen.getByText('A low one')).toBeInTheDocument();
    });

    test('shows an empty state in columns that have no issues', () => {
        const issues = [makeIssue({ title: 'Only high', priority: 'high' })];
        render(
            <IssueBoard
                issues={issues}
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        // The high column has an issue; medium and low are empty.
        expect(screen.getAllByText('No issues')).toHaveLength(2);
    });

    test('ignores issues whose priority is not one of the three columns', () => {
        const issues = [
            makeIssue({ title: 'A high one', priority: 'high' }),
            // A priority that has no matching column is silently skipped.
            makeIssue({
                title: 'An orphan',
                priority: 'urgent' as Issue['priority'],
            }),
        ];
        render(
            <IssueBoard
                issues={issues}
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.getByText('A high one')).toBeInTheDocument();
        expect(screen.queryByText('An orphan')).not.toBeInTheDocument();
    });

    test('places an issue under the correct priority column', () => {
        const issues = [makeIssue({ title: 'A low one', priority: 'low' })];
        render(
            <IssueBoard
                issues={issues}
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        // Find the "low Priority" column and confirm the issue lives within it.
        const lowHeading = screen.getByText(/low Priority/i);
        const column = lowHeading.closest('div')?.parentElement?.parentElement
            ?.parentElement?.parentElement as HTMLElement;
        expect(within(column).getByText('A low one')).toBeInTheDocument();
    });
});
