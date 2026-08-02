import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import SettingsTabItem from './SettingsTabItem';

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

describe('SettingsTabItem', () => {
    test('renders tab link with icon label', () => {
        render(
            <SettingsTabItem
                label="Preferences"
                href="/settings?tab=preferences"
                icon="SlidersHorizontal"
            />,
        );

        expect(screen.getByText('Preferences').closest('a')).toHaveAttribute(
            'href',
            '/settings?tab=preferences',
        );
    });

    test('applies active styles when active', () => {
        render(
            <SettingsTabItem
                label="Preferences"
                href="/settings?tab=preferences"
                icon="SlidersHorizontal"
                isActive
            />,
        );

        expect(screen.getByText('Preferences').closest('a')).toHaveClass(
            'text-white',
        );
    });
});
