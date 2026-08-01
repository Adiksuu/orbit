import { Issue } from '@/types/Issues';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import CalendarView from './CalendarView';

const mockRouterVisit = vi.fn();
vi.mock('@inertiajs/react', () => ({
    router: { visit: (...args: unknown[]) => mockRouterVisit(...args) },
}));

vi.stubGlobal(
    'route',
    vi.fn(
        (name: string, params: unknown) =>
            `/${name}/${Array.isArray(params) ? params.join('/') : params}`,
    ),
);

const makeIssue = (overrides: Partial<Issue> = {}): Issue => ({
    id: '1',
    title: 'Fix login bug',
    status: 'open',
    priority: 'high',
    project_id: 1,
    user_id: 1,
    ...overrides,
});

describe('CalendarView Component', () => {
    beforeEach(() => {
        vi.useFakeTimers({ toFake: ['Date'] });
        vi.setSystemTime(new Date('2026-07-25T12:00:00.000Z'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test('renders the pinned month and year', () => {
        render(<CalendarView issues={[]} />);

        expect(screen.getByText('July')).toBeInTheDocument();
        expect(screen.getByText('2026')).toBeInTheDocument();
    });

    test('renders all weekday headers', () => {
        render(<CalendarView issues={[]} />);

        // Weekday abbreviations also appear per-cell on mobile, so at least
        // one match (the header row) is expected for each label.
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach((day) => {
            expect(screen.getAllByText(day).length).toBeGreaterThanOrEqual(1);
        });
    });

    test('renders an issue on the day matching its start_date', () => {
        const issue = makeIssue({
            id: '10',
            title: 'Ship the release',
            start_date: '2026-07-15',
        });
        render(<CalendarView issues={[issue]} />);

        expect(screen.getByText('Ship the release')).toBeInTheDocument();
        expect(screen.getByText('1 item')).toBeInTheDocument();
    });

    test('pluralizes the item count for multiple issues on the same day', () => {
        const issues = [
            makeIssue({
                id: '1',
                title: 'First task',
                start_date: '2026-07-15',
            }),
            makeIssue({
                id: '2',
                title: 'Second task',
                start_date: '2026-07-15',
            }),
        ];
        render(<CalendarView issues={issues} />);

        expect(screen.getByText('First task')).toBeInTheDocument();
        expect(screen.getByText('Second task')).toBeInTheDocument();
        expect(screen.getByText('2 items')).toBeInTheDocument();
    });

    test('does not render issues without a start_date', () => {
        const issue = makeIssue({
            title: 'No date issue',
            start_date: undefined,
        });
        render(<CalendarView issues={[issue]} />);

        expect(screen.queryByText('No date issue')).not.toBeInTheDocument();
    });

    test('navigates to the issue page when an issue is clicked', async () => {
        const user = userEvent.setup();
        const issue = makeIssue({
            id: '42',
            title: 'Clickable issue',
            start_date: '2026-07-15',
        });
        render(<CalendarView issues={[issue]} />);

        await user.click(screen.getByText('Clickable issue'));

        expect(mockRouterVisit).toHaveBeenCalledWith('/issues.show/1/42');
    });

    test('highlights today with the accent-colored day number', () => {
        render(<CalendarView issues={[]} />);

        const todayCell = screen.getByText('25');
        expect(todayCell).toHaveClass('bg-[var(--accent-color)]');
    });

    test('navigates to the next month and no longer shows the previous month issue', async () => {
        const user = userEvent.setup();
        const issue = makeIssue({
            title: 'July only issue',
            start_date: '2026-07-15',
        });
        render(<CalendarView issues={[issue]} />);

        expect(screen.getByText('July only issue')).toBeInTheDocument();

        const nextButton = document
            .querySelector('.lucide-chevron-right')
            ?.closest('button') as HTMLElement;
        await user.click(nextButton);

        expect(screen.getByText('August')).toBeInTheDocument();
        expect(screen.queryByText('July only issue')).not.toBeInTheDocument();
    });

    test('navigates to the previous month', async () => {
        const user = userEvent.setup();
        render(<CalendarView issues={[]} />);

        const prevButton = document
            .querySelector('.lucide-chevron-left')
            ?.closest('button') as HTMLElement;
        await user.click(prevButton);

        expect(screen.getByText('June')).toBeInTheDocument();
    });

    test('returns to the current month when "Today" is clicked after navigating away', async () => {
        const user = userEvent.setup();
        render(<CalendarView issues={[]} />);

        const nextButton = document
            .querySelector('.lucide-chevron-right')
            ?.closest('button') as HTMLElement;
        await user.click(nextButton);
        expect(screen.getByText('August')).toBeInTheDocument();

        await user.click(screen.getByText('Today'));

        expect(screen.getByText('July')).toBeInTheDocument();
    });
});
