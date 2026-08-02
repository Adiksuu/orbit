import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import SettingsPanel from './SettingsPanel';

describe('SettingsPanel', () => {
    test('renders title, description and children', () => {
        render(
            <SettingsPanel title="General" description="Primary controls">
                <div>Row content</div>
            </SettingsPanel>,
        );

        expect(screen.getByText('General')).toBeInTheDocument();
        expect(screen.getByText('Primary controls')).toBeInTheDocument();
        expect(screen.getByText('Row content')).toBeInTheDocument();
    });
});
