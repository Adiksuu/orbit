import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import PasswordField from './PasswordField';

describe('PasswordField Component', () => {
    const noop = () => {};

    test('renders as a password input by default', () => {
        render(
            <PasswordField
                id="password"
                label="Password"
                value=""
                onChange={noop}
            />,
        );

        expect(screen.getByLabelText('Password')).toHaveAttribute(
            'type',
            'password',
        );
    });

    test('toggles visibility when the eye button is clicked', async () => {
        render(
            <PasswordField
                id="password"
                label="Password"
                value="secret123"
                onChange={noop}
            />,
        );

        const input = screen.getByLabelText('Password');
        const toggle = screen.getByRole('button', { name: 'Show password' });

        await userEvent.click(toggle);
        expect(input).toHaveAttribute('type', 'text');
        expect(
            screen.getByRole('button', { name: 'Hide password' }),
        ).toBeInTheDocument();

        await userEvent.click(
            screen.getByRole('button', { name: 'Hide password' }),
        );
        expect(input).toHaveAttribute('type', 'password');
    });

    test('calls onChange when typing', async () => {
        const handleChange = vi.fn();
        render(
            <PasswordField
                id="password"
                label="Password"
                value=""
                onChange={handleChange}
            />,
        );

        await userEvent.type(screen.getByLabelText('Password'), 'a');

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('renders the error message when provided', () => {
        render(
            <PasswordField
                id="password"
                label="Password"
                value=""
                onChange={noop}
                error="Password is required."
            />,
        );

        expect(screen.getByText('Password is required.')).toBeInTheDocument();
    });
});
