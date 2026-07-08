import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import DropdownTrigger from './DropdownTrigger';

describe('DropdownTrigger Component', () => {
    const noop = () => {};

    test('renders the provided label', () => {
        render(<DropdownTrigger label="Select status" onClick={noop} />);

        expect(screen.getByText('Select status')).toBeInTheDocument();
    });

    test('always renders a chevron icon (an svg)', () => {
        const { container } = render(
            <DropdownTrigger label="Open" onClick={noop} />,
        );

        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    test('calls onClick when clicked', async () => {
        const handleClick = vi.fn();
        render(<DropdownTrigger label="Open menu" onClick={handleClick} />);

        await userEvent.click(screen.getByRole('button'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('is disabled and does not fire onClick when disabled is true', async () => {
        const handleClick = vi.fn();
        render(
            <DropdownTrigger label="Disabled" onClick={handleClick} disabled />,
        );

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();

        await userEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });
});
