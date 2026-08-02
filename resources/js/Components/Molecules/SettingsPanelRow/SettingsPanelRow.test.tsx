import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import SettingsPanelRow from './SettingsPanelRow';

describe('SettingsPanelRow', () => {
    test('renders title, description and action', () => {
        render(
            <SettingsPanelRow
                title="Default home view"
                description="Choose your default page."
                action={<button type="button">Manage</button>}
            />,
        );

        expect(screen.getByText('Default home view')).toBeInTheDocument();
        expect(
            screen.getByText('Choose your default page.'),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Manage' }),
        ).toBeInTheDocument();
    });
});
