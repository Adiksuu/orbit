import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ProjectOnboardingPreview from './ProjectOnboardingPreview';

describe('ProjectOnboardingPreview Component', () => {
    test('renders the "Live preview" label', () => {
        render(
            <ProjectOnboardingPreview
                data={{
                    name: '',
                    slug: '',
                    description: '',
                    color: 'purple',
                }}
            />,
        );

        expect(screen.getByText('Live preview')).toBeInTheDocument();
    });

    test('falls back to placeholder project name and slug when empty', () => {
        render(
            <ProjectOnboardingPreview
                data={{
                    name: '',
                    slug: '',
                    description: '',
                    color: 'purple',
                }}
            />,
        );

        expect(screen.getByText('Untitled Project')).toBeInTheDocument();
        expect(screen.getByText('SLUG')).toBeInTheDocument();
    });

    test('reflects the entered project name and slug', () => {
        render(
            <ProjectOnboardingPreview
                data={{
                    name: 'Mobile App',
                    slug: 'MOB',
                    description: '',
                    color: 'blue',
                }}
            />,
        );

        expect(screen.getByText('Mobile App')).toBeInTheDocument();
        expect(screen.getByText('MOB')).toBeInTheDocument();
    });

    test('renders the perks list', () => {
        render(
            <ProjectOnboardingPreview
                data={{
                    name: '',
                    slug: '',
                    description: '',
                    color: 'purple',
                }}
            />,
        );

        expect(
            screen.getByText('Track issues on a custom board'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Invite your team to collaborate'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Visualize progress in real time'),
        ).toBeInTheDocument();
    });
});
