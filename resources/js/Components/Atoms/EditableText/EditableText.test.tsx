import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import EditableText from './EditableText';

describe('EditableText Component', () => {
    test('renders the value in display mode', () => {
        render(<EditableText value="Fix login crash" onSave={() => {}} />);

        expect(screen.getByText('Fix login crash')).toBeInTheDocument();
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    test('renders placeholder text when the value is empty', () => {
        render(
            <EditableText
                value=""
                onSave={() => {}}
                placeholder="Add a description..."
            />,
        );

        expect(screen.getByText('Add a description...')).toBeInTheDocument();
    });

    test('falls back to emptyText when the value is empty and no placeholder is given', () => {
        render(<EditableText value="" onSave={() => {}} emptyText="Empty" />);

        expect(screen.getByText('Empty')).toBeInTheDocument();
    });

    test('clicking the display switches to an editable input pre-filled with the value', async () => {
        render(<EditableText value="Fix login crash" onSave={() => {}} />);

        await userEvent.click(screen.getByText('Fix login crash'));

        expect(screen.getByRole('textbox')).toHaveValue('Fix login crash');
    });

    test('committing a change on blur calls onSave with the new value', async () => {
        const handleSave = vi.fn();
        render(<EditableText value="Old title" onSave={handleSave} />);

        await userEvent.click(screen.getByText('Old title'));
        const input = screen.getByRole('textbox');
        await userEvent.clear(input);
        await userEvent.type(input, 'New title');
        await userEvent.tab();

        expect(handleSave).toHaveBeenCalledWith('New title');
    });

    test('pressing Enter commits the change for single-line fields', async () => {
        const handleSave = vi.fn();
        render(<EditableText value="Old title" onSave={handleSave} />);

        await userEvent.click(screen.getByText('Old title'));
        const input = screen.getByRole('textbox');
        await userEvent.clear(input);
        await userEvent.type(input, 'New title{Enter}');

        expect(handleSave).toHaveBeenCalledWith('New title');
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    test('pressing Escape cancels the edit without calling onSave', async () => {
        const handleSave = vi.fn();
        render(<EditableText value="Old title" onSave={handleSave} />);

        await userEvent.click(screen.getByText('Old title'));
        const input = screen.getByRole('textbox');
        await userEvent.clear(input);
        await userEvent.type(input, 'Discarded{Escape}');

        expect(handleSave).not.toHaveBeenCalled();
        expect(screen.getByText('Old title')).toBeInTheDocument();
    });

    test('does not call onSave on blur when the value is unchanged', async () => {
        const handleSave = vi.fn();
        render(<EditableText value="Same title" onSave={handleSave} />);

        await userEvent.click(screen.getByText('Same title'));
        await userEvent.tab();

        expect(handleSave).not.toHaveBeenCalled();
    });

    test('renders a textarea and does not commit on Enter when multiline', async () => {
        const handleSave = vi.fn();
        render(
            <EditableText value="Some body" onSave={handleSave} multiline />,
        );

        await userEvent.click(screen.getByText('Some body'));
        const textarea = screen.getByRole('textbox');
        expect(textarea.tagName).toBe('TEXTAREA');

        await userEvent.type(textarea, '{Enter}more text');

        expect(handleSave).not.toHaveBeenCalled();
    });

    test('does not enter edit mode when disabled', async () => {
        render(
            <EditableText value="Locked value" onSave={() => {}} disabled />,
        );

        await userEvent.click(screen.getByText('Locked value'));

        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
});
