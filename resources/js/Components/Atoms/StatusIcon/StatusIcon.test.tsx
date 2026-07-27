import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { StatusIcon } from './StatusIcon';

describe('StatusIcon Component', () => {
    test('renders a completed icon for "Done" status', () => {
        render(<StatusIcon status="Done" />);

        const icons = screen.getAllByTitle('Done');
        expect(icons[0]).toHaveClass('text-indigo-500');
    });

    test('renders a completed icon for "Closed" status', () => {
        render(<StatusIcon status="Closed" />);

        const icons = screen.getAllByTitle('Closed');
        expect(icons[0]).toHaveClass('text-indigo-500');
    });

    test('renders the default icon for other statuses', () => {
        render(<StatusIcon status="Open" />);

        const icons = screen.getAllByTitle('Open');
        expect(icons[0]).toHaveClass('text-amber-500');
    });

    test('applies an additional className to the icon span', () => {
        render(<StatusIcon status="Open" className="custom-class" />);

        const span = document.querySelector('span.custom-class');
        expect(span).toBeInTheDocument();
    });
});
