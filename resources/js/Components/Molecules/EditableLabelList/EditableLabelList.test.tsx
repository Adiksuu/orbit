import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import EditableLabelList from './EditableLabelList';

describe('EditableLabelList Component', () => {
    test('renders "None" when there are no labels', () => {
        render(<EditableLabelList labels={[]} onSave={() => {}} />);

        expect(screen.getByText('None')).toBeInTheDocument();
    });

    test('renders the current labels', () => {
        render(<EditableLabelList labels={['bug']} onSave={() => {}} />);

        expect(screen.getAllByText('bug')[0]).toBeInTheDocument();
    });

    test('does not show the label picker until clicked', () => {
        render(<EditableLabelList labels={[]} onSave={() => {}} />);

        expect(screen.queryByText('chore')).not.toBeInTheDocument();
    });

    test('clicking the trigger opens a picker with every available label', async () => {
        render(<EditableLabelList labels={[]} onSave={() => {}} />);

        await userEvent.click(screen.getByText('None'));

        expect(screen.getByText('feature')).toBeInTheDocument();
        expect(screen.getByText('chore')).toBeInTheDocument();
    });

    test('clicking an unselected label adds it and calls onSave', async () => {
        const handleSave = vi.fn();
        render(<EditableLabelList labels={['bug']} onSave={handleSave} />);

        await userEvent.click(screen.getAllByText('bug')[0]);
        const designButtons = screen.getAllByText('design');
        await userEvent.click(designButtons[designButtons.length - 1]);

        expect(handleSave).toHaveBeenCalledWith(['bug', 'design']);
    });

    test('clicking an already-selected label removes it and calls onSave', async () => {
        const handleSave = vi.fn();
        render(
            <EditableLabelList
                labels={['bug', 'design']}
                onSave={handleSave}
            />,
        );

        await userEvent.click(screen.getAllByText('bug')[0]);
        const designButtons = screen.getAllByText('design');
        await userEvent.click(designButtons[designButtons.length - 1]);

        expect(handleSave).toHaveBeenCalledWith(['bug']);
    });

    test('clicking outside the component closes the picker', async () => {
        render(
            <div>
                <EditableLabelList labels={[]} onSave={() => {}} />
                <button>Outside</button>
            </div>,
        );

        await userEvent.click(screen.getByText('None'));
        expect(screen.getByText('chore')).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Outside' }));

        expect(screen.queryByText('chore')).not.toBeInTheDocument();
    });

    test('does not open the picker when disabled', async () => {
        render(<EditableLabelList labels={[]} onSave={() => {}} disabled />);

        await userEvent.click(screen.getByText('None'));

        expect(screen.queryByText('chore')).not.toBeInTheDocument();
    });
});
