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

        expect(
            screen.getByText('Menu item').parentElement?.parentElement,
        ).toHaveClass('top-[calc(100%+6px)]');
    });

    test('positions above the trigger when direction is top', () => {
        render(
            <DropdownMenu direction="top">
                <span>Menu item</span>
            </DropdownMenu>,
        );

        expect(
            screen.getByText('Menu item').parentElement?.parentElement,
        ).toHaveClass('bottom-[calc(100%+6px)]');
    });

    test('positions below the trigger when direction is bottom', () => {
        render(
            <DropdownMenu direction="bottom">
                <span>Menu item</span>
            </DropdownMenu>,
        );

        expect(
            screen.getByText('Menu item').parentElement?.parentElement,
        ).toHaveClass('top-[calc(100%+6px)]');
    });

    test('stretches to fill the trigger width by default', () => {
        render(
            <DropdownMenu>
                <span>Menu item</span>
            </DropdownMenu>,
        );

        expect(
            screen.getByText('Menu item').parentElement?.parentElement,
        ).toHaveClass('right-0');
    });

    test('sizes to content with a minimum width when stretch is false', () => {
        render(
            <DropdownMenu stretch={false}>
                <span>Menu item</span>
            </DropdownMenu>,
        );

        const menu = screen.getByText('Menu item').parentElement
            ?.parentElement as HTMLElement;
        expect(menu).toHaveClass('w-max', 'min-w-[180px]');
        expect(menu).not.toHaveClass('right-0');
    });

    test('renders a header above the items when provided', () => {
        render(
            <DropdownMenu header="Change status to...">
                <span>Menu item</span>
            </DropdownMenu>,
        );

        expect(screen.getByText('Change status to...')).toBeInTheDocument();
    });

    test('renders no header block when none is provided', () => {
        const { container } = render(
            <DropdownMenu>
                <span>Menu item</span>
            </DropdownMenu>,
        );

        expect(
            container.querySelector('.uppercase.tracking-wider'),
        ).not.toBeInTheDocument();
    });
});
