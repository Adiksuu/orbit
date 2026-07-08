import { ProjectColors } from '@/types/Projects';
import { describe, expect, test } from 'vitest';
import { getColorTheme } from './colors';

describe('getColorTheme', () => {
    test('returns the theme matching a known color name', () => {
        expect(getColorTheme('red').accent).toBe('bg-red-500');
        expect(getColorTheme('blue').accent).toBe('bg-blue-500');
    });

    test('falls back to the purple theme for an unknown color', () => {
        // Cast an invalid value to exercise the `|| colors.purple` fallback.
        expect(getColorTheme('turquoise' as ProjectColors)).toEqual(
            getColorTheme('purple'),
        );
    });
});
