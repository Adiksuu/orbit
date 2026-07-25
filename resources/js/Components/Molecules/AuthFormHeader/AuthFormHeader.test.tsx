import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import AuthFormHeader from './AuthFormHeader';

describe('AuthFormHeader Component', () => {
    test('renders the title and description', () => {
        render(
            <AuthFormHeader
                icon="LogIn"
                title="Welcome back"
                description="Enter your credentials to continue"
            />,
        );

        expect(
            screen.getByRole('heading', { name: 'Welcome back' }),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Enter your credentials to continue'),
        ).toBeInTheDocument();
    });
});
