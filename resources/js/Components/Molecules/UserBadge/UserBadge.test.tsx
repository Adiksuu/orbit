import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import UserBadge from './UserBadge';

describe('UserBadge Component', () => {
    test('renders the name', () => {
        render(<UserBadge name="Jane Doe" />);

        expect(screen.getAllByText('Jane Doe')).toHaveLength(2);
    });

    test('renders the initial (first character of the name) as the avatar fallback', () => {
        render(<UserBadge name="Jane Doe" />);

        expect(screen.getAllByText('J')).toHaveLength(2);
    });

    test('hides the email by default even when one is provided', () => {
        render(<UserBadge name="Jane Doe" email="jane@acme.com" />);

        expect(screen.queryByText('jane@acme.com')).not.toBeInTheDocument();
    });

    test('shows the email when showDetails is true and an email is provided', () => {
        render(<UserBadge name="Jane Doe" email="jane@acme.com" showDetails />);

        expect(screen.getAllByText('jane@acme.com')).toHaveLength(2);
    });

    test('does not render an email element when showDetails is true but no email is passed', () => {
        render(<UserBadge name="Jane Doe" showDetails />);

        expect(screen.getAllByText('Jane Doe')).toHaveLength(2);
        expect(screen.queryByText('jane@acme.com')).not.toBeInTheDocument();
    });

    test('renders the avatar image when an avatarSrc is provided', () => {
        render(<UserBadge name="Jane Doe" avatarSrc="/jane.png" />);

        expect(screen.getByRole('img')).toHaveAttribute('src', '/jane.png');
    });
});
