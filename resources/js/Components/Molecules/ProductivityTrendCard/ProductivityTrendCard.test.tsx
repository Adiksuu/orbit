import { ProductivityTrendProps } from '@/types/Issues';
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { ProductivityTrendCard } from './ProductivityTrendCard';

describe('ProductivityTrendCard Component', () => {
    beforeEach(() => {
        // Pin "today" to Monday 2024-01-01 so the active-day logic is deterministic.
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-01-01T12:00:00'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const trendData: ProductivityTrendProps[] = [
        { day: 'Mon', count: 4 },
        { day: 'Tue', count: 2 },
        { day: 'Wed', count: 0 },
    ];

    test('renders the card title and description', () => {
        render(<ProductivityTrendCard trendData={trendData} />);

        expect(screen.getByText('Productivity Trend')).toBeInTheDocument();
        expect(
            screen.getByText('Daily issue updates and fixes from this week'),
        ).toBeInTheDocument();
    });

    test('renders a labelled bar for each day', () => {
        render(<ProductivityTrendCard trendData={trendData} />);

        expect(screen.getByText('Mon')).toBeInTheDocument();
        expect(screen.getByText('Tue')).toBeInTheDocument();
        expect(screen.getByText('Wed')).toBeInTheDocument();
    });

    test('scales bar heights relative to the busiest day', () => {
        const { container } = render(
            <ProductivityTrendCard trendData={trendData} />,
        );

        const bars = container.querySelectorAll('.rounded-t-sm');
        // max count is 4 => Mon is 100%, Tue is 50%, Wed is 0%.
        expect(bars[0]).toHaveStyle({ height: '100%' });
        expect(bars[1]).toHaveStyle({ height: '50%' });
        expect(bars[2]).toHaveStyle({ height: '0%' });
    });

    test('highlights the bar for the current day of the week', () => {
        const { container } = render(
            <ProductivityTrendCard trendData={trendData} />,
        );

        const bars = container.querySelectorAll('.rounded-t-sm');
        // Today is mocked to Monday, so only the "Mon" bar is highlighted.
        expect(bars[0]).toHaveClass('bg-gradient-to-t');
        expect(bars[1]).not.toHaveClass('bg-gradient-to-t');
    });

    test('does not divide by zero when every day has a count of zero', () => {
        const zeroData: ProductivityTrendProps[] = [
            { day: 'Mon', count: 0 },
            { day: 'Tue', count: 0 },
        ];
        const { container } = render(
            <ProductivityTrendCard trendData={zeroData} />,
        );

        const bars = container.querySelectorAll('.rounded-t-sm');
        expect(bars[0]).toHaveStyle({ height: '0%' });
        expect(bars[1]).toHaveStyle({ height: '0%' });
    });
});
