import { act, renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const pageState = vi.hoisted(() => ({
    flash: {} as Record<string, string | undefined>,
}));

vi.mock('@inertiajs/react', () => ({
    usePage: () => ({ props: { flash: pageState.flash } }),
}));

vi.mock('@/Components/Organisms/AlertContainer/AlertContainer', () => ({
    AlertContainer: () => null,
}));

import { AlertProvider, useAlert } from './AlertContext';

const wrapper = ({ children }: { children: ReactNode }) => (
    <AlertProvider>{children}</AlertProvider>
);

beforeEach(() => {
    pageState.flash = {};
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
});

describe('useAlert', () => {
    test('throws when used outside of an AlertProvider', () => {
        expect(() => renderHook(() => useAlert())).toThrow(
            'useAlert must be used within an AlertProvider',
        );
    });

    test('starts with no alerts', () => {
        const { result } = renderHook(() => useAlert(), { wrapper });
        expect(result.current.alerts).toEqual([]);
    });

    test('addAlert defaults to a success type', () => {
        const { result } = renderHook(() => useAlert(), { wrapper });

        act(() => {
            result.current.addAlert('Saved!');
        });

        expect(result.current.alerts).toHaveLength(1);
        expect(result.current.alerts[0]).toMatchObject({
            message: 'Saved!',
            type: 'success',
        });
    });

    test('addAlert respects an explicit type and action url', () => {
        const { result } = renderHook(() => useAlert(), { wrapper });

        act(() => {
            result.current.addAlert(
                'Something broke',
                'error',
                4000,
                '/issues/1',
            );
        });

        expect(result.current.alerts[0]).toMatchObject({
            message: 'Something broke',
            type: 'error',
            actionUrl: '/issues/1',
        });
    });

    test('assigns each alert a unique id', () => {
        const { result } = renderHook(() => useAlert(), { wrapper });

        act(() => {
            result.current.addAlert('First');
            result.current.addAlert('Second');
        });

        const [first, second] = result.current.alerts;
        expect(first.id).not.toBe(second.id);
    });

    test('removeAlert removes only the matching alert', () => {
        const { result } = renderHook(() => useAlert(), { wrapper });

        act(() => {
            result.current.addAlert('First');
            result.current.addAlert('Second');
        });
        const [first, second] = result.current.alerts;

        act(() => {
            result.current.removeAlert(first.id);
        });

        expect(result.current.alerts).toEqual([second]);
    });

    test('auto-removes an alert after its duration elapses', () => {
        const { result } = renderHook(() => useAlert(), { wrapper });

        act(() => {
            result.current.addAlert('Bye soon', 'success', 4000);
        });
        expect(result.current.alerts).toHaveLength(1);

        act(() => {
            vi.advanceTimersByTime(4000);
        });

        expect(result.current.alerts).toHaveLength(0);
    });

    test('does not schedule auto-removal when duration is 0', () => {
        const { result } = renderHook(() => useAlert(), { wrapper });

        act(() => {
            result.current.addAlert('Stays forever', 'success', 0);
        });

        act(() => {
            vi.advanceTimersByTime(60_000);
        });

        expect(result.current.alerts).toHaveLength(1);
    });

    test.each([
        ['success', 'success'],
        ['error', 'error'],
        ['warning', 'warning'],
        ['information', 'information'],
    ] as const)(
        'surfaces a flash.%s message as an alert on mount',
        (flashKey, expectedType) => {
            pageState.flash = {
                [flashKey]: 'From the server',
                action_url: '/x',
            };

            const { result } = renderHook(() => useAlert(), { wrapper });

            expect(result.current.alerts).toHaveLength(1);
            expect(result.current.alerts[0]).toMatchObject({
                message: 'From the server',
                type: expectedType,
                actionUrl: '/x',
            });
        },
    );
});
