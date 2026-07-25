import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import DropdownMenu from './DropdownMenu';

describe('DropdownMenu Component', () => {
    test('renders its children', () => {
        render(
            <DropdownMenu>
                <span>Menu item</span>
            </DropdownMenu>,
        );

        expect(screen.getByText('Menu item')).toBeInTheDocument();
    });

    test('positions below the trigger by default', () => {
        render(
            <DropdownMenu>
                <span>Menu item</span>
            </DropdownMenu>,
        );

        expect(screen.getByText('Menu item').parentElement).toHaveClass(
            'top-[calc(100%+6px)]',
        );
    });

    test('positions above the trigger when direction is top', () => {
        render(
            <DropdownMenu direction="top">
                <span>Menu item</span>
            </DropdownMenu>,
        );

        expect(screen.getByText('Menu item').parentElement).toHaveClass(
            'bottom-[calc(100%+6px)]',
        );
    });

    test('positions below the trigger when direction is bottom', () => {
        render(
            <DropdownMenu direction="bottom">
                <span>Menu item</span>
            </DropdownMenu>,
        );

        expect(screen.getByText('Menu item').parentElement).toHaveClass(
            'top-[calc(100%+6px)]',
        );
    });
});
