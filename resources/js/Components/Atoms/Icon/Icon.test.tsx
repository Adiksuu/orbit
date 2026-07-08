import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import Icon from './Icon';

describe('Icon Component', () => {
    beforeEach(() => {
        vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('renders an svg for a valid icon name', () => {
        const { container } = render(<Icon name="Check" />);

        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    test('applies the size prop to the rendered svg', () => {
        const { container } = render(<Icon name="Check" size={32} />);

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('width', '32');
        expect(svg).toHaveAttribute('height', '32');
    });

    test('forwards a className to the svg', () => {
        const { container } = render(
            <Icon name="Check" className="text-red-500" />,
        );

        expect(container.querySelector('svg')).toHaveClass('text-red-500');
    });

    test('renders a fallback icon and warns when the icon name is unknown', () => {
        const warnSpy = vi.spyOn(console, 'warn');
        const { container } = render(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <Icon name={'NotARealIcon' as any} />,
        );

        expect(container.querySelector('svg')).toBeInTheDocument();
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining('NotARealIcon'),
        );
    });
});
