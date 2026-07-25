import { describe, expect, test } from 'vitest';
import { tableSortingAvailables } from './tableSorting';

describe('tableSortingAvailables', () => {
    test('lists each sortable column exactly once', () => {
        expect(tableSortingAvailables).toEqual([
            'id',
            'title',
            'status',
            'assignee',
            'priority',
            'labels',
        ]);
        expect(new Set(tableSortingAvailables).size).toBe(
            tableSortingAvailables.length,
        );
    });
});
