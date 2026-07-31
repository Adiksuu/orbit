import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { CompletionRatioCard } from './CompletionRatioCard';

describe('CompletionRatioCard Component', () => {
    test('renders the card title and description', () => {
        render(
            <CompletionRatioCard
                open={4}
                inProgress={0}
                closed={6}
                total={10}
                closedPct={60}
            />,
        );

        expect(screen.getByText('Completion Ratio')).toBeInTheDocument();
        expect(
            screen.getByText('Resolution status of all logged tasks'),
        ).toBeInTheDocument();
    });

    test('renders the closed percentage in the centre of the ring', () => {
        render(
            <CompletionRatioCard
                open={4}
                inProgress={0}
                closed={6}
                total={10}
                closedPct={60}
            />,
        );

        expect(screen.getByText('60%')).toBeInTheDocument();
        expect(screen.getByText('Resolved')).toBeInTheDocument();
    });

    test('renders the open, closed and total counts', () => {
        render(
            <CompletionRatioCard
                open={4}
                inProgress={0}
                closed={6}
                total={10}
                closedPct={60}
            />,
        );

        expect(screen.getByText('Open')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('Closed')).toBeInTheDocument();
        expect(screen.getByText('6')).toBeInTheDocument();
        expect(screen.getByText('Total')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
    });

    test('renders the in progress count', () => {
        render(
            <CompletionRatioCard
                open={2}
                inProgress={3}
                closed={5}
                total={10}
                closedPct={50}
            />,
        );

        expect(screen.getByText('In Progress')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    test('renders a progress ring (svg)', () => {
        const { container } = render(
            <CompletionRatioCard
                open={0}
                inProgress={0}
                closed={0}
                total={0}
                closedPct={0}
            />,
        );

        expect(container.querySelector('svg')).toBeInTheDocument();
    });
});
