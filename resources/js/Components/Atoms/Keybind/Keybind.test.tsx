import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Keybind from './Keybind';

describe('Keybind Component', () => {
    test('renders the keybind text', () => {
        render(<Keybind tooltipText="Save" keybind="Ctrl+S" />);

        expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
    });

    test('renders the tooltip text when tooltip is enabled (default)', () => {
        render(<Keybind tooltipText="Save changes" keybind="Ctrl+S" />);

        expect(screen.getByText('Save changes')).toBeInTheDocument();
    });

    test('does not render tooltip content when tooltip is disabled', () => {
        render(
            <Keybind
                tooltipText="Save changes"
                keybind="Ctrl+S"
                tooltip={false}
            />,
        );

        expect(screen.queryByText('Save changes')).not.toBeInTheDocument();
        expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
    });
});
