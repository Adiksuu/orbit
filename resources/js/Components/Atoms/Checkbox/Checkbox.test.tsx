import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import Checkbox from './Checkbox';

describe('Checkbox Component', () => {
    const noop = () => {};

    test('renders unchecked by default', () => {
        render(<Checkbox checked={false} onChange={noop} id="remember" />);

        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    test('renders checked when checked is true', () => {
        render(<Checkbox checked onChange={noop} id="remember" />);

        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    test('renders the label and links it to the input', () => {
        render(
            <Checkbox
                checked={false}
                onChange={noop}
                id="remember"
                label="Remember me"
            />,
        );

        expect(screen.getByLabelText('Remember me')).toBe(
            screen.getByRole('checkbox'),
        );
    });

    test('calls onChange when toggled', async () => {
        const handleChange = vi.fn();
        render(
            <Checkbox
                checked={false}
                onChange={handleChange}
                id="remember"
                label="Remember me"
            />,
        );

        await userEvent.click(screen.getByRole('checkbox'));

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('is disabled and rejects clicks when isDisabled is true', async () => {
        const handleChange = vi.fn();
        render(
            <Checkbox
                checked={false}
                onChange={handleChange}
                id="remember"
                isDisabled
            />,
        );

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeDisabled();

        await userEvent.click(checkbox);
        expect(handleChange).not.toHaveBeenCalled();
    });
});
