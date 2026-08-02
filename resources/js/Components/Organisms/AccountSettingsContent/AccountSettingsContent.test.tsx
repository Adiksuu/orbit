import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import AccountSettingsContent from './AccountSettingsContent';

describe('AccountSettingsContent', () => {
    test('renders preferences content', () => {
        render(<AccountSettingsContent tabId="preferences" />);

        expect(screen.getByText('Default home view')).toBeInTheDocument();
        expect(screen.getByText('Interface theme')).toBeInTheDocument();
        expect(screen.getByText('System sync')).toBeInTheDocument();
        expect(screen.getByText('Interface and behavior')).toBeInTheDocument();
    });

    test('renders profile content', () => {
        render(<AccountSettingsContent tabId="profile" />);

        expect(screen.getByText('Profile details')).toBeInTheDocument();
        expect(screen.getByText('Profile preview')).toBeInTheDocument();
    });

    test('renders notifications content', () => {
        render(<AccountSettingsContent tabId="notifications" />);

        expect(screen.getByText('Activity notifications')).toBeInTheDocument();
        expect(screen.getByText('Digest frequency')).toBeInTheDocument();
    });

    test('renders security and access content', () => {
        render(<AccountSettingsContent tabId="security-access" />);

        expect(
            screen.getByText('Sign-in and verification'),
        ).toBeInTheDocument();
        expect(screen.getByText('Active sessions')).toBeInTheDocument();
    });

    test('renders integrations content', () => {
        render(<AccountSettingsContent tabId="integrations" />);

        expect(screen.getByText('Connected services')).toBeInTheDocument();
        expect(screen.getByText('Developer access')).toBeInTheDocument();
    });

    test('renders export content', () => {
        render(<AccountSettingsContent tabId="export" />);

        expect(screen.getByText('Export data')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Delete account' }),
        ).toBeInTheDocument();
    });
});
