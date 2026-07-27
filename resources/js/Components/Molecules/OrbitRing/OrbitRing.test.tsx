import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { OrbitRing } from './OrbitRing';

describe('OrbitRing Component', () => {
    test('renders an icon for each item', () => {
        render(
            <OrbitRing
                radius={90}
                duration={32}
                items={[
                    { name: 'ListChecks', angle: 0 },
                    { name: 'Bell', angle: 120 },
                ]}
            />,
        );

        expect(document.querySelectorAll('svg')).toHaveLength(2);
    });

    test('positions each item at its angle', () => {
        render(
            <OrbitRing
                radius={90}
                duration={32}
                items={[{ name: 'Bell', angle: 45 }]}
            />,
        );

        const item = screen.getByText('', {
            selector: 'div.absolute.left-1\\/2.top-1\\/2',
        });
        expect(item).toHaveStyle({
            transform:
                'translate(-50%, -50%) rotate(45deg) translateX(90px) rotate(-45deg)',
        });
    });
});
