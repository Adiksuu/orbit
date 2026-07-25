import { Issue } from '@/types/Issues';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { IssueRowDetail } from './IssueRowDetail';

vi.mock('@inertiajs/react', async () => {
    const React = await import('react');
    return {
        Link: ({ children, href, ...props }: Record<string, unknown>) =>
            React.createElement('a', { href, ...props }, children as never),
    };
});

// react-markdown is heavy ESM; render its content as plain text for assertions.
vi.mock('react-markdown', () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
}));
vi.mock('remark-gfm', () => ({ default: () => {} }));

const makeIssue = (overrides: Partial<Issue> = {}): Issue => ({
    id: 'ISSUE-1',
    title: 'Fix the bug',
    description: 'Steps to reproduce the bug',
    status: 'open',
    priority: 'high',
    project_id: 1,
    user_id: 1,
    labels: ['bug'],
    milestone: 'Sprint 4',
    assignee: {
        avatar: '/jane.png',
        created_at: '',
        email: 'jane@acme.com',
        id: 1,
        name: 'Jane Doe',
        updated_at: '',
    },
    reporter: { avatar: '/john.png', name: 'John Smith' },
    creator: { avatar: '/john.png', name: 'John Smith' },
    ...overrides,
});

describe('IssueRowDetail Component', () => {
    test('renders all three section headings', () => {
        render(<IssueRowDetail issue={makeIssue()} onOpenDetails={() => {}} />);

        expect(screen.getByText('Issue Details')).toBeInTheDocument();
        expect(screen.getByText('Attributes')).toBeInTheDocument();
        expect(screen.getByText('System Info')).toBeInTheDocument();
    });

    test('passes the issue description down to DetailDescription', () => {
        render(<IssueRowDetail issue={makeIssue()} onOpenDetails={() => {}} />);

        expect(
            screen.getByText('Steps to reproduce the bug'),
        ).toBeInTheDocument();
    });

    test('passes the issue status and priority down to DetailAttributes', () => {
        render(<IssueRowDetail issue={makeIssue()} onOpenDetails={() => {}} />);

        expect(screen.getByText('open')).toBeInTheDocument();
        expect(screen.getByText('high')).toBeInTheDocument();
    });

    test('passes the milestone down to DetailSystemInfo', () => {
        render(<IssueRowDetail issue={makeIssue()} onOpenDetails={() => {}} />);

        expect(screen.getByText('Sprint 4')).toBeInTheDocument();
    });

    test('renders assignee, reporter and creator names from the issue', () => {
        render(<IssueRowDetail issue={makeIssue()} onOpenDetails={() => {}} />);

        expect(screen.getAllByText('Jane Doe').length).toBeGreaterThan(0);
        expect(screen.getAllByText('John Smith').length).toBeGreaterThan(0);
    });

    test('calls onOpenDetails when the modal view button is clicked', async () => {
        const onOpenDetails = vi.fn();
        render(
            <IssueRowDetail
                issue={makeIssue()}
                onOpenDetails={onOpenDetails}
            />,
        );

        await userEvent.click(
            screen.getByRole('button', { name: /open modal view/i }),
        );

        expect(onOpenDetails).toHaveBeenCalledTimes(1);
    });
});
