import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { InfoItem } from './InfoItem';

describe('InfoItem Component', () => {
    test('renders the label text', () => {
        render(
            <InfoItem label="Status">
                <span>Open</span>
            </InfoItem>,
        );

        expect(screen.getByText('Status')).toBeInTheDocument();
    });

    test('renders its children', () => {
        render(
            <InfoItem label="Status">
                <span>Open</span>
            </InfoItem>,
        );

        expect(screen.getByText('Open')).toBeInTheDocument();
    });

    test('renders arbitrary node children, not just text', () => {
        render(
            <InfoItem label="Assignee">
                <div>
                    <strong>Jane Doe</strong>
                </div>
            </InfoItem>,
        );

        expect(
            screen.getByText('Jane Doe', { selector: 'strong' }),
        ).toBeInTheDocument();
    });
});
