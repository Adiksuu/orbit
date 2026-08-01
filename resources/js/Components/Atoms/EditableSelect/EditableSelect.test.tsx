import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import EditableSelect from './EditableSelect';

const OPTIONS = [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'closed', label: 'Closed' },
];

describe('EditableSelect Component', () => {
    test('renders the label of the currently selected option', () => {
        render(
            <EditableSelect value="open" options={OPTIONS} onSave={() => {}} />,
        );

        expect(screen.getByRole('button')).toHaveTextContent('Open');
    });

    test('does not render the dropdown menu until clicked', () => {
        render(
            <EditableSelect value="open" options={OPTIONS} onSave={() => {}} />,
        );

        expect(screen.queryByText('In Progress')).not.toBeInTheDocument();
    });

    test('clicking the trigger opens the dropdown with every option', async () => {
        render(
            <EditableSelect value="open" options={OPTIONS} onSave={() => {}} />,
        );

        await userEvent.click(screen.getByRole('button'));

        expect(screen.getByText('In Progress')).toBeInTheDocument();
        expect(screen.getByText('Closed')).toBeInTheDocument();
    });

    test('selecting a different option calls onSave with its value and closes the menu', async () => {
        const handleSave = vi.fn();
        render(
            <EditableSelect
                value="open"
                options={OPTIONS}
                onSave={handleSave}
            />,
        );

        await userEvent.click(screen.getByRole('button'));
        await userEvent.click(screen.getByText('In Progress'));

        expect(handleSave).toHaveBeenCalledWith('in_progress');
        expect(screen.queryByText('Closed')).not.toBeInTheDocument();
    });

    test('selecting the already-active option does not call onSave', async () => {
        const handleSave = vi.fn();
        render(
            <EditableSelect
                value="open"
                options={OPTIONS}
                onSave={handleSave}
            />,
        );

        await userEvent.click(screen.getByRole('button'));
        await userEvent.click(screen.getAllByText('Open')[1]);

        expect(handleSave).not.toHaveBeenCalled();
    });

    test('clicking outside the component closes the dropdown', async () => {
        render(
            <div>
                <EditableSelect
                    value="open"
                    options={OPTIONS}
                    onSave={() => {}}
                />
                <button>Outside</button>
            </div>,
        );

        await userEvent.click(screen.getByRole('button', { name: 'Open' }));
        expect(screen.getByText('In Progress')).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Outside' }));

        expect(screen.queryByText('In Progress')).not.toBeInTheDocument();
    });

    test('uses renderValue to customize the trigger display', () => {
        render(
            <EditableSelect
                value="open"
                options={OPTIONS}
                onSave={() => {}}
                renderValue={(value) => `Status: ${value}`}
            />,
        );

        expect(screen.getByRole('button')).toHaveTextContent('Status: open');
    });

    test('does not open the dropdown when disabled', async () => {
        render(
            <EditableSelect
                value="open"
                options={OPTIONS}
                onSave={() => {}}
                disabled
            />,
        );

        expect(screen.getByRole('button')).toBeDisabled();

        await userEvent.click(screen.getByRole('button'));
        expect(screen.queryByText('In Progress')).not.toBeInTheDocument();
    });
});
