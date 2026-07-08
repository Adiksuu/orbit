import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { PriorityBreakdownCard } from './PriorityBreakdownCard';

describe('PriorityBreakdownCard Component', () => {
    const defaultProps = {
        high: 3,
        medium: 5,
        low: 2,
        highPct: 30,
        mediumPct: 50,
        lowPct: 20,
    };

    test('renders the card title and description', () => {
        render(<PriorityBreakdownCard {...defaultProps} />);

        expect(screen.getByText('Priority Breakdown')).toBeInTheDocument();
        expect(
            screen.getByText('Issues distribution by level of urgency'),
        ).toBeInTheDocument();
    });

    test('renders a row for each priority level', () => {
        render(<PriorityBreakdownCard {...defaultProps} />);

        expect(screen.getByText('High Priority')).toBeInTheDocument();
        expect(screen.getByText('Medium Priority')).toBeInTheDocument();
        expect(screen.getByText('Low Priority')).toBeInTheDocument();
    });

    test('renders the counts and percentages for each level', () => {
        render(<PriorityBreakdownCard {...defaultProps} />);

        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('(30%)')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('(50%)')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('(20%)')).toBeInTheDocument();
    });

    test('sizes each segment of the distribution bar by its percentage', () => {
        const { container } = render(
            <PriorityBreakdownCard {...defaultProps} />,
        );

        const high = container.querySelector('[title="High: 30%"]');
        const medium = container.querySelector('[title="Medium: 50%"]');
        const low = container.querySelector('[title="Low: 20%"]');

        expect(high).toHaveStyle({ width: '30%' });
        expect(medium).toHaveStyle({ width: '50%' });
        expect(low).toHaveStyle({ width: '20%' });
    });
});
