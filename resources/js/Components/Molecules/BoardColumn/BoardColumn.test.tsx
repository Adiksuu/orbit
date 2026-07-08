import { Issue } from '@/types/Issues';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import BoardColumn from './BoardColumn';

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

describe('BoardColumn Component', () => {
    test('renders the priority heading', () => {
        render(
            <BoardColumn
                issues={[]}
                priority="high"
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.getByText(/high Priority/i)).toBeInTheDocument();
    });

    test('shows the empty state when there are no issues', () => {
        render(
            <BoardColumn
                issues={[]}
                priority="high"
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.getByText('No issues')).toBeInTheDocument();
    });

    test('renders an issue card for each issue', () => {
        const issues = [
            makeIssue({ title: 'First issue' }),
            makeIssue({ title: 'Second issue' }),
        ];
        render(
            <BoardColumn
                issues={issues}
                priority="high"
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.getByText('First issue')).toBeInTheDocument();
        expect(screen.getByText('Second issue')).toBeInTheDocument();
        expect(screen.queryByText('No issues')).not.toBeInTheDocument();
    });

    test('the count badge reflects only non-closed issues', () => {
        const issues = [
            makeIssue({ status: 'open' }),
            makeIssue({ status: 'open' }),
            makeIssue({ status: 'closed' }),
        ];
        render(
            <BoardColumn
                issues={issues}
                priority="high"
                activeIssue={null}
                setActiveIssue={() => {}}
            />,
        );

        // 2 open of 3 total => badge shows "2".
        expect(screen.getByText('2')).toBeInTheDocument();
    });
});
