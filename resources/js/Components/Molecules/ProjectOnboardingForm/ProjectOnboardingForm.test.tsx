import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import ProjectOnboardingForm from './ProjectOnboardingForm';

const mockSetData = vi.fn();
const mockOnSubmit = vi.fn((e) => e.preventDefault());
const mockOnSkip = vi.fn();

const baseProps = {
    data: {
        name: '',
        slug: '',
        description: '',
        color: 'purple' as const,
    },
    setData: mockSetData,
    errors: {},
    processing: false,
    onSubmit: mockOnSubmit,
    onSkip: mockOnSkip,
};

describe('ProjectOnboardingForm Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders form labels', () => {
        render(<ProjectOnboardingForm {...baseProps} />);

        expect(screen.getByText('Project name')).toBeInTheDocument();
        expect(screen.getByText('Slug')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Color')).toBeInTheDocument();
    });

    test('calls setData when the name input changes', async () => {
        const user = userEvent.setup();
        render(<ProjectOnboardingForm {...baseProps} />);

        await user.type(
            screen.getByPlaceholderText('e.g. Mobile App Revamp'),
            'A',
        );

        expect(mockSetData).toHaveBeenCalledWith('name', 'A');
    });

    test('calls setData when a color swatch is clicked', async () => {
        const user = userEvent.setup();
        const { container } = render(<ProjectOnboardingForm {...baseProps} />);

        const colorButtons = container.querySelectorAll(
            'button[type="button"][class*="w-6"]',
        );
        expect(colorButtons.length).toBeGreaterThan(1);

        await user.click(colorButtons[1]);
        expect(mockSetData).toHaveBeenCalledWith('color', expect.any(String));
    });

    test('calls onSubmit when the form is submitted', async () => {
        const user = userEvent.setup();
        render(<ProjectOnboardingForm {...baseProps} />);

        await user.click(
            screen.getByRole('button', { name: /Create project/i }),
        );

        expect(mockOnSubmit).toHaveBeenCalled();
    });

    test('calls onSkip when "I\'ll do this later" is clicked', async () => {
        const user = userEvent.setup();
        render(<ProjectOnboardingForm {...baseProps} />);

        await user.click(
            screen.getByRole('button', { name: /I'll do this later/i }),
        );

        expect(mockOnSkip).toHaveBeenCalled();
    });

    test('disables actions while processing', () => {
        render(<ProjectOnboardingForm {...baseProps} processing={true} />);

        expect(screen.getByText('Creating...')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Creating.../i }),
        ).toBeDisabled();
        expect(
            screen.getByRole('button', { name: /I'll do this later/i }),
        ).toBeDisabled();
    });

    test('renders validation errors', () => {
        render(
            <ProjectOnboardingForm
                {...baseProps}
                errors={{ name: 'Name is required', slug: 'Slug is taken' }}
            />,
        );

        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Slug is taken')).toBeInTheDocument();
    });
});
