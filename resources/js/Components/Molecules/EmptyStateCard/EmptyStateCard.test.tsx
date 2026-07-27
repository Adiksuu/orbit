import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import EmptyStateCard from './EmptyStateCard';
import React from 'react';

const { triggerShortcut } = vi.hoisted(() => ({
    triggerShortcut: vi.fn(),
}));

vi.mock('@/context/ShortcutContext', () => ({
    useShortcuts: () => ({
        triggerShortcut,
    }),
}));

vi.mock('@inertiajs/react', () => ({
    Link: ({
        children,
        href,
        className,
        onClick,
    }: {
        children: React.ReactNode;
        href?: string;
        className?: string;
        onClick?: () => void;
    }) => (
        <a href={href} className={className} onClick={onClick}>
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

    test('triggers the "p" shortcut when the card is clicked', async () => {
        render(
            <EmptyStateCard
                iconName="FolderPlus"
                title="Empty"
                description="Nothing here"
                actionHref="/issues/new"
            />,
        );

        await userEvent.click(screen.getByRole('link'));

        expect(triggerShortcut).toHaveBeenCalledWith('p');
    });
});
