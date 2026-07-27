import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { describe, expect, test, vi } from 'vitest';
import IconButton from './IconButton';

vi.mock('@inertiajs/react', () => ({
    Link: ({
        children,
        href,
        ...props
    }: {
        children: ReactNode;
        href: string;
    }) => (
        <a href={href} {...props}>
            {children}
        </a>
    ),
}));

describe('IconButton Component', () => {
    test('renders a button element by default', () => {
        render(<IconButton iconName="Bell" />);

        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    test('renders an icon (svg) inside the button', () => {
        const { container } = render(<IconButton iconName="Bell" />);

        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    test('calls onClick when the button is clicked', async () => {
        const handleClick = vi.fn();
        render(<IconButton iconName="Bell" onClick={handleClick} />);

        await userEvent.click(screen.getByRole('button'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('renders a link pointing at the provided href when isLink is true', () => {
        render(<IconButton iconName="Bell" isLink link="/settings" />);

        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/settings');
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    test('forwards extra HTML attributes to the button', () => {
        render(<IconButton iconName="Bell" aria-label="Notifications" />);

        expect(
            screen.getByRole('button', { name: /notifications/i }),
        ).toBeInTheDocument();
    });
});
