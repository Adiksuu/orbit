import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import LabelBadge from './LabelBadge';

describe('LabelBadge Component', () => {
    test('renders the label text', () => {
        render(<LabelBadge label="bug" />);

        expect(screen.getByText('bug')).toBeInTheDocument();
    });

    test('renders a colored dot matching the label', () => {
        const { container } = render(<LabelBadge label="bug" />);

        const dot = container.querySelector('span > span');
        expect(dot).toHaveStyle({ backgroundColor: '#f44336' });
    });

    test('renders a different dot color for a different label', () => {
        const { container } = render(<LabelBadge label="feature" />);

        const dot = container.querySelector('span > span');
        expect(dot).toHaveStyle({ backgroundColor: '#2196f3' });
    });

    test('calls onClick when clicked', async () => {
        const handleClick = vi.fn();
        render(<LabelBadge label="bug" onClick={handleClick} />);

        await userEvent.click(screen.getByText('bug'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('merges a custom className', () => {
        render(<LabelBadge label="bug" className="my-custom-class" />);

        expect(screen.getByText('bug').closest('span')).toHaveClass(
            'my-custom-class',
        );
    });
});
