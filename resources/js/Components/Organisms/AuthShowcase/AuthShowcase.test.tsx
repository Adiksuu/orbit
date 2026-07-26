import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import AuthShowcase from './AuthShowcase';

describe('AuthShowcase Component', () => {
    test('renders the provided title and description', () => {
        render(
            <AuthShowcase
                title="Welcome back"
                description="Sign in to keep tracking your work."
            />,
        );

        expect(screen.getByText('Welcome back')).toBeInTheDocument();
        expect(
            screen.getByText('Sign in to keep tracking your work.'),
        ).toBeInTheDocument();
    });

    test('renders ReactNode title and description content', () => {
        render(
            <AuthShowcase
                title={<span>Custom title</span>}
                description={<span>Custom description</span>}
            />,
        );

        expect(screen.getByText('Custom title')).toBeInTheDocument();
        expect(screen.getByText('Custom description')).toBeInTheDocument();
    });

    test('renders the central Orbit icon', () => {
        const { container } = render(
            <AuthShowcase title="Title" description="Description" />,
        );

        expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    });

    test('renders every orbit item icon for both orbit rings', () => {
        const { container } = render(
            <AuthShowcase title="Title" description="Description" />,
        );

        const expectedIconClasses = [
            'lucide-list-checks',
            'lucide-folder-git-2',
            'lucide-bell',
            'lucide-layout-dashboard',
            'lucide-users',
            'lucide-calendar',
            'lucide-activity',
            'lucide-git-branch',
        ];

        expectedIconClasses.forEach((iconClass) => {
            expect(
                container.querySelector(`.${iconClass}`),
            ).toBeInTheDocument();
        });
    });

    test('renders the footer tagline copy', () => {
        render(<AuthShowcase title="Title" description="Description" />);

        expect(
            screen.getByText(
                /Built for teams who plan, ship, and track work together/,
            ),
        ).toBeInTheDocument();
        expect(screen.getByText(/all in one orbit\./)).toBeInTheDocument();
    });
});
