import { describe, expect, test } from 'vitest';
import { LABEL_COLORS } from './labelColors';

describe('LABEL_COLORS', () => {
    test('defines a hex color for every issue label', () => {
        const labels: (keyof typeof LABEL_COLORS)[] = [
            'bug',
            'feature',
            'performance',
            'design',
            'ux',
            'chore',
        ];

        labels.forEach((label) => {
            expect(LABEL_COLORS[label]).toMatch(/^#[0-9a-f]{6}$/i);
        });
    });

    test('assigns a distinct color to each label', () => {
        const values = Object.values(LABEL_COLORS);
        expect(new Set(values).size).toBe(values.length);
    });
});
