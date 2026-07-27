import { Issue } from '@/types/Issues';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import IssueElement from './IssueElement';
import React from 'react';

const makeAssignee = (name = 'Jane Doe') => ({
    avatar: '/jane.png',
    created_at: '',
    email: 'jane@acme.com',
    id: 1,
    name,
    password: '',
    updated_at: '',
});

const makeIssue = (overrides: Partial<Issue> = {}): Issue => ({
    id: 'ISSUE-1',
    title: 'Fix the bug',
    status: 'open',
    priority: 'high',
    project_id: 1,
    user_id: 1,
    labels: ['bug'],
    assignee: makeAssignee(),
    ...overrides,
});

const renderInTable = (ui: React.ReactElement) =>
    render(
        <table>
            <tbody>{ui}</tbody>
        </table>,
    );

describe('IssueElement Component', () => {
    describe('board layout', () => {
        test('renders the title and assignee name', () => {
            render(
                <IssueElement
                    issue={makeIssue()}
                    activeIssue={null}
                    setActiveIssue={() => {}}
                    type="board"
                />,
            );

            expect(screen.getByText('Fix the bug')).toBeInTheDocument();
            expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        });

        test('shows "Unassigned" and a placeholder when there is no assignee', () => {
            render(
                <IssueElement
                    issue={makeIssue({ assignee: undefined })}
                    activeIssue={null}
                    setActiveIssue={() => {}}
                    type="board"
                />,
            );

            expect(screen.getByText('Unassigned')).toBeInTheDocument();
            expect(screen.queryByRole('img')).not.toBeInTheDocument();
        });

        test('renders the issue labels', () => {
            render(
                <IssueElement
                    issue={makeIssue({ labels: ['bug', 'feature'] })}
                    activeIssue={null}
                    setActiveIssue={() => {}}
                    type="board"
                />,
            );

            expect(screen.getAllByText('feature')[0]).toBeInTheDocument();
        });

        test('calls setActiveIssue with the issue when clicked', async () => {
            const issue = makeIssue();
            const setActiveIssue = vi.fn();
            render(
                <IssueElement
                    issue={issue}
                    activeIssue={null}
                    setActiveIssue={setActiveIssue}
                    type="board"
                />,
            );

            await userEvent.click(screen.getByText('Fix the bug'));

            expect(setActiveIssue).toHaveBeenCalledWith(issue, false);
        });

        test('applies active styling when this issue is the active one', () => {
            const issue = makeIssue();
            const { container } = render(
                <IssueElement
                    issue={issue}
                    activeIssue={issue}
                    setActiveIssue={() => {}}
                    type="board"
                />,
            );

            expect(container.firstChild).toHaveClass('border-zinc-600');
        });

        test('applies closed (line-through) styling for closed issues', () => {
            render(
                <IssueElement
                    issue={makeIssue({ status: 'closed' })}
                    activeIssue={null}
                    setActiveIssue={() => {}}
                    type="board"
                />,
            );

            expect(screen.getByText('Fix the bug')).toHaveClass('line-through');
        });
    });

    describe('list layout (default)', () => {
        test('renders the id, title and priority in a table row', () => {
            renderInTable(
                <IssueElement
                    issue={makeIssue()}
                    activeIssue={null}
                    setActiveIssue={() => {}}
                />,
            );

            expect(screen.getByText(/ISSUE-1/)).toBeInTheDocument();
            expect(screen.getByText('Fix the bug')).toBeInTheDocument();
            expect(screen.getAllByText('high')).toHaveLength(1);
        });

        test('renders the assignee name via the user badge', () => {
            renderInTable(
                <IssueElement
                    issue={makeIssue()}
                    activeIssue={null}
                    setActiveIssue={() => {}}
                />,
            );

            expect(screen.getAllByText('Jane Doe')).toHaveLength(2);
        });

        test('renders "Unassigned" when there is no assignee', () => {
            renderInTable(
                <IssueElement
                    issue={makeIssue({ assignee: undefined })}
                    activeIssue={null}
                    setActiveIssue={() => {}}
                />,
            );

            expect(screen.getAllByText('Unassigned')).toHaveLength(2);
        });

        test('calls setActiveIssue with the issue when the row is clicked', async () => {
            const issue = makeIssue();
            const setActiveIssue = vi.fn();
            renderInTable(
                <IssueElement
                    issue={issue}
                    activeIssue={null}
                    setActiveIssue={setActiveIssue}
                />,
            );

            await userEvent.click(screen.getByText('Fix the bug'));

            expect(setActiveIssue).toHaveBeenCalledWith(issue, false);
        });
    });
});
