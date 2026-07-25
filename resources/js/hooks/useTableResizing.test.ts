import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useTableResizing } from './useTableResizing';

const defaultWidths = { title: 200, status: 120 };

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
});

describe('useTableResizing', () => {
    test('initializes with the default widths and a 44px row height', () => {
        const { result } = renderHook(() => useTableResizing(1, defaultWidths));

        expect(result.current.columnWidths).toEqual(defaultWidths);
        expect(result.current.rowHeight).toBe(44);
    });

    test('loads a saved config and merges in defaults for new columns', () => {
        localStorage.setItem(
            'orbit_table_sizing_1',
            JSON.stringify({
                columnWidths: { title: 300 },
                rowHeight: 60,
            }),
        );

        const { result } = renderHook(() => useTableResizing(1, defaultWidths));

        expect(result.current.columnWidths).toEqual({
            title: 300,
            status: 120,
        });
        expect(result.current.rowHeight).toBe(60);
    });

    test('falls back to defaults and logs an error on corrupt saved JSON', () => {
        const errorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {});
        localStorage.setItem('orbit_table_sizing_1', '{not json');

        const { result } = renderHook(() => useTableResizing(1, defaultWidths));

        expect(result.current.columnWidths).toEqual(defaultWidths);
        expect(result.current.rowHeight).toBe(44);
        expect(errorSpy).toHaveBeenCalled();
    });

    test('clamps updateColumnWidth between 80 and 800', () => {
        const { result } = renderHook(() => useTableResizing(1, defaultWidths));

        act(() => result.current.updateColumnWidth('title', 10));
        expect(result.current.columnWidths.title).toBe(80);

        act(() => result.current.updateColumnWidth('title', 5000));
        expect(result.current.columnWidths.title).toBe(800);

        act(() => result.current.updateColumnWidth('title', 250));
        expect(result.current.columnWidths.title).toBe(250);
    });

    test('clamps updateRowHeight between 32 and 120', () => {
        const { result } = renderHook(() => useTableResizing(1, defaultWidths));

        act(() => result.current.updateRowHeight(10));
        expect(result.current.rowHeight).toBe(32);

        act(() => result.current.updateRowHeight(500));
        expect(result.current.rowHeight).toBe(120);

        act(() => result.current.updateRowHeight(80));
        expect(result.current.rowHeight).toBe(80);
    });

    test('resetWidths restores the original default column widths', () => {
        const { result } = renderHook(() => useTableResizing(1, defaultWidths));

        act(() => result.current.updateColumnWidth('title', 500));
        act(() => result.current.resetWidths());

        expect(result.current.columnWidths).toEqual(defaultWidths);
    });

    test('persists the config to localStorage after the debounce delay', () => {
        const { result } = renderHook(() => useTableResizing(1, defaultWidths));

        act(() => result.current.updateColumnWidth('title', 300));
        expect(localStorage.setItem).not.toHaveBeenCalled();

        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(localStorage.setItem).toHaveBeenCalledWith(
            'orbit_table_sizing_1',
            JSON.stringify({
                columnWidths: { title: 300, status: 120 },
                rowHeight: 44,
            }),
        );
    });

    test('clears the pending debounced save when unmounted before it fires', () => {
        const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
        const { result, unmount } = renderHook(() =>
            useTableResizing(1, defaultWidths),
        );

        act(() => result.current.updateColumnWidth('title', 300));
        unmount();

        expect(clearTimeoutSpy).toHaveBeenCalled();

        act(() => {
            vi.advanceTimersByTime(500);
        });
        expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    test('cancels the previous debounced save when the config changes again quickly', () => {
        const { result } = renderHook(() => useTableResizing(1, defaultWidths));

        act(() => result.current.updateColumnWidth('title', 300));
        act(() => {
            vi.advanceTimersByTime(200);
        });
        act(() => result.current.updateColumnWidth('title', 400));
        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'orbit_table_sizing_1',
            JSON.stringify({
                columnWidths: { title: 400, status: 120 },
                rowHeight: 44,
            }),
        );
    });

    test('does not persist to localStorage when there is no projectId', () => {
        const { result } = renderHook(() =>
            useTableResizing(undefined, defaultWidths),
        );

        act(() => result.current.updateColumnWidth('title', 300));
        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(localStorage.setItem).not.toHaveBeenCalled();
    });
});
