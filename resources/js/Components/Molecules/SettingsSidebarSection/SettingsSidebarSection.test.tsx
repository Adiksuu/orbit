import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import SettingsSidebarSection from './SettingsSidebarSection';

describe('SettingsSidebarSection', () => {
    test('renders section title and children', () => {
        render(
            <SettingsSidebarSection title="Account">
                <div>Preferences</div>
            </SettingsSidebarSection>,
        );

        expect(screen.getByText('Account')).toBeInTheDocument();
        expect(screen.getByText('Preferences')).toBeInTheDocument();
    });
});
