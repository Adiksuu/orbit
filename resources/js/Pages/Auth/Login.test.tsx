import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Login from './Login';

const formState = vi.hoisted(() => ({
    errors: {} as Record<string, string>,
    processing: false,
}));
const mockPost = vi.hoisted(() => vi.fn());
const mockReset = vi.hoisted(() => vi.fn());

vi.stubGlobal(
    'route',
    vi.fn((name: string) => `/${name}`),
);

vi.mock('@inertiajs/react', async () => {
    const React = await import('react');
    return {
        Head: () => null,
        Link: ({ children, href, className }: Record<string, unknown>) =>
            React.createElement('a', { href, className }, children as never),
        useForm: (initialData: Record<string, unknown>) => {
            const [data, setDataState] = React.useState(initialData);
            return {
                data,
                setData: (key: string, value: unknown) =>
                    setDataState((prev: Record<string, unknown>) => ({
                        ...prev,
                        [key]: value,
                    })),
                post: mockPost,
                processing: formState.processing,
                errors: formState.errors,
                reset: mockReset,
            };
        },
    };
});

describe('Login Page', () => {
    beforeEach(() => {
        formState.errors = {};
        formState.processing = false;
        mockPost.mockClear();
        mockReset.mockClear();
    });

    test('renders the login form fields', () => {
        render(<Login />);

        expect(screen.getByLabelText(/^Email/)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Password/)).toBeInTheDocument();
        expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Log in' }),
        ).toBeInTheDocument();
    });

    test('updates the email and password fields as the user types', async () => {
        const user = userEvent.setup();
        render(<Login />);

        const emailInput = screen.getByLabelText(/^Email/);
        const passwordInput = screen.getByLabelText(/^Password/);

        await user.type(emailInput, 'jane@example.com');
        await user.type(passwordInput, 'secret123');

        expect(emailInput).toHaveValue('jane@example.com');
        expect(passwordInput).toHaveValue('secret123');
    });

    test('toggles the remember me checkbox', async () => {
        const user = userEvent.setup();
        render(<Login />);

        const checkbox = screen.getByLabelText('Remember me');
        expect(checkbox).not.toBeChecked();

        await user.click(checkbox);

        expect(checkbox).toBeChecked();
    });

    test('submits the form to the login route with an onFinish callback', async () => {
        const user = userEvent.setup();
        render(<Login />);

        await user.type(screen.getByLabelText(/^Email/), 'jane@example.com');
        await user.type(screen.getByLabelText(/^Password/), 'secret123');
        await user.click(screen.getByRole('button', { name: 'Log in' }));

        expect(mockPost).toHaveBeenCalledTimes(1);
        expect(mockPost).toHaveBeenCalledWith(
            '/login',
            expect.objectContaining({ onFinish: expect.any(Function) }),
        );
    });

    test('resets the password field once the request finishes', async () => {
        const user = userEvent.setup();
        render(<Login />);

        await user.click(screen.getByRole('button', { name: 'Log in' }));

        const onFinish = mockPost.mock.calls[0][1].onFinish;
        onFinish();

        expect(mockReset).toHaveBeenCalledWith('password');
    });

    test('shows a disabled, "Logging in..." button while processing', () => {
        formState.processing = true;
        render(<Login />);

        const button = screen.getByRole('button', { name: 'Logging in...' });
        expect(button).toBeDisabled();
    });

    test('renders validation errors returned from the server', () => {
        formState.errors = {
            email: 'These credentials do not match our records.',
        };
        render(<Login />);

        expect(
            screen.getByText('These credentials do not match our records.'),
        ).toBeInTheDocument();
    });

    test('links to the register page', () => {
        render(<Login />);

        expect(screen.getByText('Sign up').closest('a')).toHaveAttribute(
            'href',
            '/register',
        );
    });
});
