import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { TableHeaderCell } from './TableHeaderCell';

describe('TableHeaderCell Component', () => {
    const baseProps = {
        column: 'title' as any,
        label: 'Title',
        width: 200,
        isResizing: false,
        canSort: true,
        onSort: vi.fn(),
        onMouseDown: vi.fn(),
        onDoubleClick: vi.fn(),
    };

    test('renders the label', () => {
        render(<TableHeaderCell {...baseProps} />);

        expect(screen.getByText('Title')).toBeInTheDocument();
    });

    test('calls onSort with the column when sortable and clicked', () => {
        const handleSort = vi.fn();
        render(<TableHeaderCell {...baseProps} onSort={handleSort} />);

        fireEvent.click(screen.getByText('Title'));

        expect(handleSort).toHaveBeenCalledWith('title');
    });

    test('does not call onSort when canSort is false', () => {
        const handleSort = vi.fn();
        render(
            <TableHeaderCell
                {...baseProps}
                canSort={false}
                onSort={handleSort}
            />,
        );

        fireEvent.click(screen.getByText('Title'));

        expect(handleSort).not.toHaveBeenCalled();
    });

    test('applies the width style', () => {
        const { container } = render(<TableHeaderCell {...baseProps} />);

        const th = container.querySelector('th');
        expect(th).toHaveStyle({ width: '200px' });
    });

    test('calls onMouseDown on the resize handle', () => {
        const handleMouseDown = vi.fn();
        const { container } = render(
            <TableHeaderCell {...baseProps} onMouseDown={handleMouseDown} />,
        );

        const handle = container.querySelector(
            '.cursor-col-resize',
        ) as HTMLElement;
        fireEvent.mouseDown(handle);

        expect(handleMouseDown).toHaveBeenCalledWith(
            'title',
            expect.anything(),
        );
    });

    test('calls onDoubleClick on the resize handle', () => {
        const handleDoubleClick = vi.fn();
        const { container } = render(
            <TableHeaderCell
                {...baseProps}
                onDoubleClick={handleDoubleClick}
            />,
        );

        const handle = container.querySelector(
            '.cursor-col-resize',
        ) as HTMLElement;
        fireEvent.doubleClick(handle);

        expect(handleDoubleClick).toHaveBeenCalledWith('title');
    });
});
