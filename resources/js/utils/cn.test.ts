import { describe, expect, test } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
    test('joins plain string class names', () => {
        expect(cn('flex', 'items-center')).toBe('flex items-center');
    });

    test('drops falsy values', () => {
        expect(cn('flex', false, undefined, null, '', 'gap-2')).toBe(
            'flex gap-2',
        );
    });

    test('applies conditional classes from an object', () => {
        expect(cn('base', { active: true, hidden: false })).toBe('base active');
    });

    test('flattens arrays of class values', () => {
        expect(cn(['flex', 'gap-2'], 'items-center')).toBe(
            'flex gap-2 items-center',
        );
    });

    test('resolves conflicting Tailwind classes by keeping the last one', () => {
        expect(cn('p-2', 'p-4')).toBe('p-4');
        expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });

    test('keeps non-conflicting classes while resolving conflicts', () => {
        expect(cn('flex p-2', 'p-4 items-center')).toBe(
            'flex p-4 items-center',
        );
    });

    test('returns an empty string when given no usable input', () => {
        expect(cn()).toBe('');
        expect(cn(false, undefined, null)).toBe('');
    });
});
