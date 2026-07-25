import { Issue } from '@/types/Issues';
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { DetailSystemInfo } from './DetailSystemInfo';

const NOW = new Date('2026-07-25T12:00:00.000Z').getTime();
const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const makeIssue = (overrides: Partial<Issue> = {}): Issue => ({
    id: 'ISSUE-1',
    title: 'Fix the bug',
    status: 'open',
    priority: 'high',
    project_id: 1,
    user_id: 1,
    ...overrides,
});

beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
});

afterEach(() => {
    vi.useRealTimers();
});

describe('DetailSystemInfo Component', () => {
    test('renders the section heading', () => {
        render(<DetailSystemInfo issue={makeIssue()} />);

        expect(screen.getByText('System Info')).toBeInTheDocument();
    });

    test('renders a formatted "created" time-ago value', () => {
        render(
            <DetailSystemInfo
                issue={makeIssue({ created_at: NOW - 2 * DAY })}
            />,
        );

        expect(screen.getByText('2d')).toBeInTheDocument();
    });

    test('renders a formatted "updated" time-ago value', () => {
        render(
            <DetailSystemInfo
                issue={makeIssue({ updated_at: NOW - 3 * HOUR })}
            />,
        );

        expect(screen.getByText('3h')).toBeInTheDocument();
    });

    test('shows "N/A" for created_at when missing', () => {
        render(
            <DetailSystemInfo
                issue={makeIssue({
                    created_at: undefined,
                    updated_at: NOW,
                })}
            />,
        );

        expect(screen.getAllByText('N/A')).toHaveLength(1);
    });

    test('shows "N/A" for updated_at when missing', () => {
        render(
            <DetailSystemInfo
                issue={makeIssue({
                    created_at: NOW,
                    updated_at: undefined,
                })}
            />,
        );

        expect(screen.getAllByText('N/A')).toHaveLength(1);
    });

    test('shows "N/A" for both dates when neither is set', () => {
        render(
            <DetailSystemInfo
                issue={makeIssue({
                    created_at: undefined,
                    updated_at: undefined,
                })}
            />,
        );

        expect(screen.getAllByText('N/A')).toHaveLength(2);
    });

    test('renders the creator name when present', () => {
        render(
            <DetailSystemInfo
                issue={makeIssue({
                    creator: { avatar: '/jane.png', name: 'Jane Doe' },
                })}
            />,
        );

        expect(screen.getAllByText('Jane Doe').length).toBeGreaterThan(0);
    });

    test('falls back to "Unknown" when there is no creator', () => {
        render(<DetailSystemInfo issue={makeIssue({ creator: undefined })} />);

        expect(screen.getAllByText('Unknown').length).toBeGreaterThan(0);
    });

    test('renders the milestone name when present', () => {
        render(
            <DetailSystemInfo issue={makeIssue({ milestone: 'Sprint 4' })} />,
        );

        expect(screen.getByText('Sprint 4')).toBeInTheDocument();
    });

    test('shows "Not scheduled" when there is no milestone', () => {
        render(
            <DetailSystemInfo issue={makeIssue({ milestone: undefined })} />,
        );

        expect(screen.getByText('Not scheduled')).toBeInTheDocument();
    });
});
