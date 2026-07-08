import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import FilterButton from './FilterButton';

describe('FilterButton Component', () => {
    test('renders the label', () => {
        render(<FilterButton label="Status" />);

        expect(screen.getByText('Status')).toBeInTheDocument();
    });

    test('renders the value when one is provided', () => {
        render(<FilterButton label="Status" value="Open" />);

        expect(screen.getByText('Open')).toBeInTheDocument();
    });

    test('does not render a value span when no value is provided', () => {
        render(<FilterButton label="Status" />);

        // Only the label text is present besides the chevron icon.
        expect(screen.getByText('Status')).toBeInTheDocument();
    });

    test('renders a leading icon when the icon prop is provided', () => {
        const { container } = render(
            <FilterButton label="Filter" icon="ListFilter" />,
        );

        // Leading icon + trailing chevron = 2 svgs.
        expect(container.querySelectorAll('svg')).toHaveLength(2);
    });

    test('renders only the trailing chevron when no icon prop is provided', () => {
        const { container } = render(<FilterButton label="Status" />);

        expect(container.querySelectorAll('svg')).toHaveLength(1);
    });

    test('calls onClick when clicked', async () => {
        const handleClick = vi.fn();
        render(<FilterButton label="Status" onClick={handleClick} />);

        await userEvent.click(screen.getByRole('button'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
