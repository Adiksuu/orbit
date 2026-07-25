import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import SidebarField from './SidebarField';

describe('SidebarField Component', () => {
    test('renders the label', () => {
        render(
            <SidebarField label="Status">
                <span>In Progress</span>
            </SidebarField>,
        );

        expect(screen.getByText('Status')).toBeInTheDocument();
    });

    test('renders its children', () => {
        render(
            <SidebarField label="Status">
                <span>In Progress</span>
            </SidebarField>,
        );

        expect(screen.getByText('In Progress')).toBeInTheDocument();
    });
});
