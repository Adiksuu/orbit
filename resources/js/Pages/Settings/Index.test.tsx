import { render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import SettingsIndex from './Index';

const pageState = vi.hoisted(() => ({ url: '/settings' }));

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
    usePage: () => ({
        url: pageState.url,
        props: {},
    }),
}));

describe('Settings Index Page', () => {
    beforeEach(() => {
        pageState.url = '/settings';
    });

    test('renders account and workspace sections with tabs', () => {
        render(<SettingsIndex />);

        expect(screen.getByText('Account')).toBeInTheDocument();
        expect(screen.getByText('Workspace')).toBeInTheDocument();
        const preferencesLink = screen
            .getAllByText('Preferences')
            .find((node) => node.closest('a'));
        expect(preferencesLink?.closest('a')).toHaveAttribute(
            'href',
            '/settings?tab=preferences',
        );
        expect(screen.getByText('Roles & management')).toBeInTheDocument();
    });

    test('renders heading and back link', () => {
        render(<SettingsIndex />);

        expect(
            screen.getByRole('heading', { name: 'Preferences' }),
        ).toBeInTheDocument();
        expect(screen.getByText('Back to app').closest('a')).toHaveAttribute(
            'href',
            '/',
        );
    });

    test('reads active tab from query param', () => {
        pageState.url = '/settings?tab=members';
        render(<SettingsIndex />);

        expect(
            screen.getByRole('heading', { name: 'Members' }),
        ).toBeInTheDocument();
        expect(screen.getByText('Member access')).toBeInTheDocument();
    });

    test('renders account tab content for selected account tab', () => {
        pageState.url = '/settings?tab=notifications';
        render(<SettingsIndex />);

        expect(screen.getByText('Activity notifications')).toBeInTheDocument();
        expect(screen.getByText('Delivery preferences')).toBeInTheDocument();
    });

    test('renders workspace tab content for selected workspace tab', () => {
        pageState.url = '/settings?tab=templates';
        render(<SettingsIndex />);

        expect(screen.getByText('Issue templates')).toBeInTheDocument();
        expect(screen.getByText('Quality controls')).toBeInTheDocument();
    });
});
