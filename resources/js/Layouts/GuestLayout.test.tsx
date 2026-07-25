import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import GuestLayout from './GuestLayout';

vi.mock('@inertiajs/react', () => ({
    Link: ({
        children,
        href,
        className,
    }: {
        children: React.ReactNode;
        href?: string;
        className?: string;
    }) => (
        <a href={href} className={className}>
            {children}
        </a>
    ),
}));

vi.mock('@/Components/Organisms/AuthShowcase/AuthShowcase', () => ({
    default: ({
        title,
        description,
    }: {
        title: React.ReactNode;
        description: React.ReactNode;
    }) => (
        <div data-testid="auth-showcase">
            <div data-testid="showcase-title">{title}</div>
            <div data-testid="showcase-description">{description}</div>
        </div>
    ),
}));

describe('GuestLayout Component', () => {
    test('renders the children passed to it', () => {
        render(
            <GuestLayout
                showcaseTitle="Title"
                showcaseDescription="Description"
            >
                <div>Form contents</div>
            </GuestLayout>,
        );

        expect(screen.getByText('Form contents')).toBeInTheDocument();
    });

    test('renders the Orbit brand link pointing home', () => {
        render(
            <GuestLayout
                showcaseTitle="Title"
                showcaseDescription="Description"
            >
                <div>Form contents</div>
            </GuestLayout>,
        );

        const brandLink = screen.getByText('Orbit').closest('a');
        expect(brandLink).toHaveAttribute('href', '/');
    });

    test('passes the showcase title and description through to AuthShowcase', () => {
        render(
            <GuestLayout
                showcaseTitle="Plan Better, Ship Faster"
                showcaseDescription="Bring your whole team into one orbit."
            >
                <div>Form contents</div>
            </GuestLayout>,
        );

        expect(screen.getByTestId('showcase-title')).toHaveTextContent(
            'Plan Better, Ship Faster',
        );
        expect(screen.getByTestId('showcase-description')).toHaveTextContent(
            'Bring your whole team into one orbit.',
        );
    });

    test('renders a copyright notice with the current year', () => {
        render(
            <GuestLayout
                showcaseTitle="Title"
                showcaseDescription="Description"
            >
                <div>Form contents</div>
            </GuestLayout>,
        );

        const year = new Date().getFullYear();
        expect(
            screen.getByText(`© ${year} Orbit. All rights reserved.`, {
                normalizer: (text) => text.replace(/\s+/g, ' ').trim(),
            }),
        ).toBeInTheDocument();
    });
});
