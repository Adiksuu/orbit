import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import SocialLoginButtons from './SocialLoginButtons';

describe('SocialLoginButtons Component', () => {
    test('renders a button for each provider', () => {
        render(<SocialLoginButtons />);

        expect(screen.getAllByRole('button')).toHaveLength(3);
    });

    test('disables every provider button since none are wired up yet', () => {
        render(<SocialLoginButtons />);

        screen.getAllByRole('button').forEach((button) => {
            expect(button).toBeDisabled();
        });
    });

    test('labels each button with its provider name', () => {
        render(<SocialLoginButtons />);

        expect(
            screen.getByLabelText('Continue with Google (coming soon)'),
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText('Continue with GitHub (coming soon)'),
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText('Continue with Microsoft (coming soon)'),
        ).toBeInTheDocument();
    });
});
