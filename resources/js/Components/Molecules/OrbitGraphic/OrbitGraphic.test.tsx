import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { OrbitGraphic } from './OrbitGraphic';

describe('OrbitGraphic Component', () => {
    test('renders the logo image', () => {
        render(<OrbitGraphic />);

        expect(screen.getByAltText('Logo')).toBeInTheDocument();
    });

    test('renders orbit ring icons around the logo', () => {
        render(<OrbitGraphic />);

        expect(document.querySelectorAll('svg').length).toBeGreaterThan(0);
    });
});
