import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { VisualCardHeader } from './VisualCardHeader';

describe('VisualCardHeader Component', () => {
    test('renders the title', () => {
        render(<VisualCardHeader title="Overview" description="Details" />);

        expect(screen.getByText('Overview')).toBeInTheDocument();
    });

    test('renders the description', () => {
        render(<VisualCardHeader title="Overview" description="Details" />);

        expect(screen.getByText('Details')).toBeInTheDocument();
    });
});
