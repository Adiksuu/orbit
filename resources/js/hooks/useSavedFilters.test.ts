import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const mockRouter = vi.hoisted(() => ({
    post: vi.fn(),
    delete: vi.fn(),
}));

vi.mock('@inertiajs/react', () => ({
    router: mockRouter,
}));

import { SavedFilter, useSavedFilters } from './useSavedFilters';

beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('useSavedFilters', () => {
    test('returns the initial saved filters unchanged', () => {
        const initial: SavedFilter[] = [
            {
                id: 1,
                project_id: 1,
                name: 'Mine',
                context: 'project_1',
                query_params: {},
            },
        ];
        const { result } = renderHook(() => useSavedFilters(initial, 1));

        expect(result.current.savedFilters).toBe(initial);
    });

    test('saveFilter posts the project scoped context when a projectId is given', () => {
        const { result } = renderHook(() => useSavedFilters([], 42));

        result.current.saveFilter('My filter', { status: 'open' });

        expect(mockRouter.post).toHaveBeenCalledWith(
            '/saved-filters',
            {
                project_id: 42,
                name: 'My filter',
                context: 'project_42',
                query_params: { status: 'open' },
            },
            expect.objectContaining({
                preserveScroll: true,
                preserveState: true,
            }),
        );
    });

    test('saveFilter falls back to the "project_issues" context without a projectId', () => {
        const { result } = renderHook(() => useSavedFilters([], undefined));

        result.current.saveFilter('My filter', {});

        expect(mockRouter.post).not.toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith(
            'SavedFilterError: Lack of projectId',
        );
    });

    test('saveFilter logs validation errors returned by the server', () => {
        const { result } = renderHook(() => useSavedFilters([], 42));

        result.current.saveFilter('My filter', {});

        const options = mockRouter.post.mock.calls[0][2];
        const errors = { name: 'Name is required' };
        options.onError(errors);

        expect(console.error).toHaveBeenCalledWith(
            'Validation errors:',
            errors,
        );
    });

    test('deleteFilter sends a delete request for the given id', () => {
        const { result } = renderHook(() => useSavedFilters([], 42));

        result.current.deleteFilter(7);

        expect(mockRouter.delete).toHaveBeenCalledWith(
            '/saved-filters/7',
            expect.objectContaining({
                preserveScroll: true,
                preserveState: true,
            }),
        );
    });
});
