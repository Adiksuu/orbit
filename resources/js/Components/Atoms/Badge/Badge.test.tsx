import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Badge from './Badge';

describe('Badge Component', () => {
    test('renders its children', () => {
        render(<Badge>New</Badge>);

        expect(screen.getByText('New')).toBeInTheDocument();
    });

    test('applies the default variant classes when no variant is passed', () => {
        render(<Badge>Default</Badge>);

        expect(screen.getByText('Default')).toHaveClass(
            'bg-[var(--bg-light-color)]',
            'text-[var(--text-gray-color)]',
        );
    });

    test('applies the outline variant classes', () => {
        render(<Badge variant="outline">Outline</Badge>);

        const badge = screen.getByText('Outline');
        expect(badge).toHaveClass('bg-transparent', 'border');
        expect(badge).not.toHaveClass('bg-zinc-800');
    });

    test('applies color classes for a label color', () => {
        render(<Badge color="bug">bug</Badge>);

        expect(screen.getByText('bug')).toHaveClass(
            'text-[#f44336]',
            'bg-[#f44336]/10',
        );
    });

    test('merges an additional className with the variant classes', () => {
        render(<Badge className="rounded-full">Merged</Badge>);

        const badge = screen.getByText('Merged');
        expect(badge).toHaveClass('rounded-full', 'inline-flex');
    });

    test('forwards standard HTML span attributes', () => {
        render(<Badge title="A tooltip">Hover</Badge>);

        expect(screen.getByText('Hover')).toHaveAttribute('title', 'A tooltip');
    });
});
