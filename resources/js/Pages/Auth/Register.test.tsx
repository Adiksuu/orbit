import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Register from './Register';

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

describe('Register Page', () => {
    beforeEach(() => {
        formState.errors = {};
        formState.processing = false;
        mockPost.mockClear();
        mockReset.mockClear();
    });

    test('renders the registration form fields', () => {
        render(<Register />);

        expect(screen.getByLabelText(/^Full name/)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Email/)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Password/)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Confirm password/)).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Create account' }),
        ).toBeInTheDocument();
    });

    test('updates form fields as the user types', async () => {
        const user = userEvent.setup();
        render(<Register />);

        const nameInput = screen.getByLabelText(/^Full name/);
        const emailInput = screen.getByLabelText(/^Email/);
        const passwordInput = screen.getByLabelText(/^Password/);
        const confirmInput = screen.getByLabelText(/^Confirm password/);

        await user.type(nameInput, 'Jane Doe');
        await user.type(emailInput, 'jane@example.com');
        await user.type(passwordInput, 'secret123');
        await user.type(confirmInput, 'secret123');

        expect(nameInput).toHaveValue('Jane Doe');
        expect(emailInput).toHaveValue('jane@example.com');
        expect(passwordInput).toHaveValue('secret123');
        expect(confirmInput).toHaveValue('secret123');
    });

    test('submits the form to the register route with an onFinish callback', async () => {
        const user = userEvent.setup();
        render(<Register />);

        await user.type(screen.getByLabelText(/^Full name/), 'Jane Doe');
        await user.click(
            screen.getByRole('button', { name: 'Create account' }),
        );

        expect(mockPost).toHaveBeenCalledTimes(1);
        expect(mockPost).toHaveBeenCalledWith(
            '/register',
            expect.objectContaining({ onFinish: expect.any(Function) }),
        );
    });

    test('resets both password fields once the request finishes', async () => {
        const user = userEvent.setup();
        render(<Register />);

        await user.click(
            screen.getByRole('button', { name: 'Create account' }),
        );

        const onFinish = mockPost.mock.calls[0][1].onFinish;
        onFinish();

        expect(mockReset).toHaveBeenCalledWith(
            'password',
            'password_confirmation',
        );
    });

    test('shows a disabled, "Creating account..." button while processing', () => {
        formState.processing = true;
        render(<Register />);

        const button = screen.getByRole('button', {
            name: 'Creating account...',
        });
        expect(button).toBeDisabled();
    });

    test('renders validation errors returned from the server', () => {
        formState.errors = {
            email: 'The email has already been taken.',
        };
        render(<Register />);

        expect(
            screen.getByText('The email has already been taken.'),
        ).toBeInTheDocument();
    });

    test('links to the login page', () => {
        render(<Register />);

        expect(screen.getByText('Log in').closest('a')).toHaveAttribute(
            'href',
            '/login',
        );
    });
});
