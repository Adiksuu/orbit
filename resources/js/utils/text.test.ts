import { describe, expect, test } from 'vitest';
import { formatStatusLabel } from './text';

describe('formatStatusLabel', () => {
    test('replaces underscores with spaces', () => {
        expect(formatStatusLabel('in_progress')).toBe('in progress');
    });

    test('leaves strings without underscores unchanged', () => {
        expect(formatStatusLabel('open')).toBe('open');
    });
});
