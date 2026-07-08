import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import TextArea from './TextArea';

describe('TextArea Component', () => {
    const noop = () => {};

    test('renders the current value', () => {
        render(<TextArea value="some notes" onChange={noop} />);

        expect(screen.getByRole('textbox')).toHaveValue('some notes');
    });

    test('renders the placeholder', () => {
        render(
            <TextArea value="" onChange={noop} placeholder="Description..." />,
        );

        expect(
            screen.getByPlaceholderText('Description...'),
        ).toBeInTheDocument();
    });

    test('calls onChange for each character typed', async () => {
        const handleChange = vi.fn();
        render(<TextArea value="" onChange={handleChange} />);

        await userEvent.type(screen.getByRole('textbox'), 'hi');

        expect(handleChange).toHaveBeenCalledTimes(2);
    });

    test('is disabled and rejects input when isDisabled is true', async () => {
        const handleChange = vi.fn();
        render(<TextArea value="" onChange={handleChange} isDisabled />);

        const textarea = screen.getByRole('textbox');
        expect(textarea).toBeDisabled();

        await userEvent.type(textarea, 'hi');
        expect(handleChange).not.toHaveBeenCalled();
    });
});
