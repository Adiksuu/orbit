import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ProjectOnboardingHeader from './ProjectOnboardingHeader';

describe('ProjectOnboardingHeader Component', () => {
    test('renders the title', () => {
        render(<ProjectOnboardingHeader userName="Dave" />);

        expect(
            screen.getByText('Create your first project'),
        ).toBeInTheDocument();
    });

    test('renders the eyebrow label', () => {
        render(<ProjectOnboardingHeader userName="Dave" />);

        expect(screen.getByText('One last step')).toBeInTheDocument();
    });

    test('greets the user by name', () => {
        render(<ProjectOnboardingHeader userName="Dave" />);

        expect(screen.getByText(/Welcome aboard, Dave/)).toBeInTheDocument();
    });
});
