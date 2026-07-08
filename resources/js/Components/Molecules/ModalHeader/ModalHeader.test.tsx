import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import ModalHeader from './ModalHeader';

describe('ModalHeader Component', () => {
    const noop = () => {};

    test('renders the title', () => {
        render(<ModalHeader title="Create New Issue" onClose={noop} />);

        expect(
            screen.getByRole('heading', { name: /create new issue/i }),
        ).toBeInTheDocument();
    });

    test('renders a custom icon node when provided', () => {
        render(
            <ModalHeader
                title="Titled"
                onClose={noop}
                icon={<span data-testid="header-icon" />}
            />,
        );

        expect(screen.getByTestId('header-icon')).toBeInTheDocument();
    });

    test('renders a close button', () => {
        render(<ModalHeader title="Titled" onClose={noop} />);

        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('calls onClose when the close button is clicked', async () => {
        const handleClose = vi.fn();
        render(<ModalHeader title="Titled" onClose={handleClose} />);

        await userEvent.click(screen.getByRole('button'));

        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});
