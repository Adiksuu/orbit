import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import EmptyStateCard from './EmptyStateCard';

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

describe('EmptyStateCard Component', () => {
    test('renders the title and description', () => {
        render(
            <EmptyStateCard
                iconName="FolderPlus"
                title="All done!"
                description="No issues found."
            />,
        );

        expect(screen.getByText('All done!')).toBeInTheDocument();
        expect(screen.getByText('No issues found.')).toBeInTheDocument();
    });

    test('renders the action label and points the link at actionHref', () => {
        render(
            <EmptyStateCard
                iconName="FolderPlus"
                title="Empty"
                description="Nothing here"
                actionLabel="Create one"
                actionHref="/issues/new"
            />,
        );

        expect(screen.getByText('Create one')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/issues/new');
    });

    test('does not render the action label when actionHref is missing', () => {
        render(
            <EmptyStateCard
                iconName="FolderPlus"
                title="Empty"
                description="Nothing here"
                actionLabel="Create one"
            />,
        );

        expect(screen.queryByText('Create one')).not.toBeInTheDocument();
    });

    test('does not render the action label when actionLabel is missing', () => {
        render(
            <EmptyStateCard
                iconName="FolderPlus"
                title="Empty"
                description="Nothing here"
                actionHref="/issues/new"
            />,
        );

        // No action label text, but the card is still a link.
        expect(screen.getByRole('link')).toBeInTheDocument();
    });
});
