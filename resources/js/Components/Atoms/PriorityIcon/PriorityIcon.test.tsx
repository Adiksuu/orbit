import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { PriorityIcon } from './PriorityIcon';

describe('PriorityIcon Component', () => {
    test('renders the high priority tooltip', () => {
        render(<PriorityIcon priority="High" />);

        expect(screen.getByText('high')).toBeInTheDocument();
    });

    test('renders the medium priority tooltip', () => {
        render(<PriorityIcon priority="Medium" />);

        expect(screen.getByText('medium')).toBeInTheDocument();
    });

    test('renders the low priority tooltip', () => {
        render(<PriorityIcon priority="Low" />);

        expect(screen.getByText('low')).toBeInTheDocument();
    });

    test('renders "No priority" for an unrecognized priority', () => {
        render(<PriorityIcon priority="unknown" />);

        expect(screen.getByText('No priority')).toBeInTheDocument();
    });

    test('applies an additional className to the icon span', () => {
        render(<PriorityIcon priority="High" className="custom-class" />);

        const span = document.querySelector('span.custom-class');
        expect(span).toBeInTheDocument();
    });
});
