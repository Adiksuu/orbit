import { Issue } from '@/types/Issues';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { DetailAttributes } from './DetailAttributes';

const makeIssue = (overrides: Partial<Issue> = {}): Issue => ({
    id: 'ISSUE-1',
    title: 'Fix the bug',
    status: 'open',
    priority: 'high',
    project_id: 1,
    user_id: 1,
    ...overrides,
});

describe('DetailAttributes Component', () => {
    test('renders the section heading', () => {
        render(<DetailAttributes issue={makeIssue()} />);

        expect(screen.getByText('Attributes')).toBeInTheDocument();
    });

    test('renders the issue status', () => {
        render(<DetailAttributes issue={makeIssue({ status: 'closed' })} />);

        expect(screen.getByText('closed')).toBeInTheDocument();
    });

    test('renders the issue priority with the matching text color', () => {
        render(<DetailAttributes issue={makeIssue({ priority: 'high' })} />);

        expect(screen.getByText('high')).toHaveClass('text-[#f44336]');
    });

    test('renders the assignee name when present', () => {
        render(
            <DetailAttributes
                issue={makeIssue({
                    assignee: {
                        avatar: '/jane.png',
                        created_at: '',
                        email: 'jane@acme.com',
                        id: 1,
                        name: 'Jane Doe',
                        updated_at: '',
                    },
                })}
            />,
        );

        expect(screen.getAllByText('Jane Doe').length).toBeGreaterThan(0);
    });

    test('falls back to "Unassigned" when there is no assignee', () => {
        render(<DetailAttributes issue={makeIssue({ assignee: undefined })} />);

        expect(screen.getAllByText('Unassigned').length).toBeGreaterThan(0);
    });

    test('renders the reporter name when present', () => {
        render(
            <DetailAttributes
                issue={makeIssue({
                    reporter: { avatar: '/john.png', name: 'John Smith' },
                })}
            />,
        );

        expect(screen.getAllByText('John Smith').length).toBeGreaterThan(0);
    });

    test('falls back to "Unknown" when there is no reporter', () => {
        render(<DetailAttributes issue={makeIssue({ reporter: undefined })} />);

        expect(screen.getAllByText('Unknown').length).toBeGreaterThan(0);
    });

    test('renders the issue labels when present', () => {
        render(
            <DetailAttributes
                issue={makeIssue({ labels: ['bug', 'feature'] })}
            />,
        );

        expect(screen.getAllByText('bug').length).toBeGreaterThan(0);
        expect(screen.getAllByText('feature').length).toBeGreaterThan(0);
    });

    test('shows "No labels" when the issue has no labels', () => {
        render(<DetailAttributes issue={makeIssue({ labels: [] })} />);

        expect(screen.getByText('No labels')).toBeInTheDocument();
    });

    test('shows "No labels" when labels is undefined', () => {
        render(<DetailAttributes issue={makeIssue({ labels: undefined })} />);

        expect(screen.getByText('No labels')).toBeInTheDocument();
    });
});
