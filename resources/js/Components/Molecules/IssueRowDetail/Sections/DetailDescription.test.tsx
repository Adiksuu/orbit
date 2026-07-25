import { Issue } from '@/types/Issues';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { DetailDescription } from './DetailDescription';

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
    status: 'open',
    priority: 'high',
    project_id: 1,
    user_id: 1,
    ...overrides,
});

describe('DetailDescription Component', () => {
    test('renders the section heading', () => {
        render(
            <DetailDescription issue={makeIssue()} onOpenDetails={() => {}} />,
        );

        expect(screen.getByText('Issue Details')).toBeInTheDocument();
    });

    test('renders the full description when it is short', () => {
        render(
            <DetailDescription
                issue={makeIssue({ description: 'A short description.' })}
                onOpenDetails={() => {}}
            />,
        );

        expect(screen.getByText('A short description.')).toBeInTheDocument();
    });

    test('truncates descriptions longer than 100 characters', () => {
        const longDescription = 'a'.repeat(150);
        render(
            <DetailDescription
                issue={makeIssue({ description: longDescription })}
                onOpenDetails={() => {}}
            />,
        );

        expect(screen.getByText(`${'a'.repeat(100)}...`)).toBeInTheDocument();
    });

    test('shows a fallback message when there is no description', () => {
        render(
            <DetailDescription
                issue={makeIssue({ description: undefined })}
                onOpenDetails={() => {}}
            />,
        );

        expect(
            screen.getByText('No description provided.'),
        ).toBeInTheDocument();
    });

    test('calls onOpenDetails when "Open Modal View" is clicked', async () => {
        const onOpenDetails = vi.fn();
        render(
            <DetailDescription
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
