import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { ShowcaseDots } from './ShowcaseDots';

describe('ShowcaseDots Component', () => {
    test('renders a dot for each count', () => {
        render(<ShowcaseDots count={3} activeIndex={0} onSelect={vi.fn()} />);

        expect(screen.getAllByRole('button')).toHaveLength(3);
    });

    test('marks the active dot with aria-current', () => {
        render(<ShowcaseDots count={3} activeIndex={1} onSelect={vi.fn()} />);

        const dots = screen.getAllByRole('button');
        expect(dots[1]).toHaveAttribute('aria-current', 'true');
        expect(dots[0]).not.toHaveAttribute('aria-current');
        expect(dots[2]).not.toHaveAttribute('aria-current');
    });

    test('calls onSelect with the clicked index', () => {
        const handleSelect = vi.fn();
        render(
            <ShowcaseDots count={3} activeIndex={0} onSelect={handleSelect} />,
        );

        fireEvent.click(screen.getByLabelText('Go to slide 2'));

        expect(handleSelect).toHaveBeenCalledWith(1);
    });
});
