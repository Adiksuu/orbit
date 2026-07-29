import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import ProjectOnboardingModal from './ProjectOnboardingModal';

const mockPost = vi.fn();
const mockSetData = vi.fn();
const mockOnSkip = vi.fn();

vi.stubGlobal(
    'route',
    vi.fn((name: string) => `/api/routes/${name}`),
);

let formState = {
    data: { name: '', slug: '', description: '', color: 'purple' },
    setData: mockSetData,
    post: mockPost,
    processing: false,
    errors: {},
};

vi.mock('@inertiajs/react', async (importOriginal) => {
    const actual = (await importOriginal()) as any;
    return {
        ...actual,
        useForm: (initialData: Record<string, unknown>) => {
            formState.data = { ...initialData } as any;
            return formState;
        },
    };
});

describe('ProjectOnboardingModal Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockOnSkip.mockClear();
        formState = {
            data: { name: '', slug: '', description: '', color: 'purple' },
            setData: mockSetData,
            post: mockPost,
            processing: false,
            errors: {},
        };
    });

    test('composes the header, form and preview sections', () => {
        render(
            <ProjectOnboardingModal userName="Dave" onSkip={mockOnSkip} />,
        );

        expect(
            screen.getByText('Create your first project'),
        ).toBeInTheDocument();
        expect(screen.getByText(/Welcome aboard, Dave/)).toBeInTheDocument();
        expect(screen.getByText('Project name')).toBeInTheDocument();
        expect(screen.getByText('Live preview')).toBeInTheDocument();
    });

    test('submits the project form to the projects.store route', async () => {
        const user = userEvent.setup();
        render(
            <ProjectOnboardingModal userName="Dave" onSkip={mockOnSkip} />,
        );

        await user.click(
            screen.getByRole('button', { name: /Create project/i }),
        );

        expect(mockPost).toHaveBeenCalledWith('/api/routes/projects.store');
    });

    test('calls onSkip when "I\'ll do this later" is clicked', async () => {
        const user = userEvent.setup();
        render(
            <ProjectOnboardingModal userName="Dave" onSkip={mockOnSkip} />,
        );

        await user.click(
            screen.getByRole('button', { name: /I'll do this later/i }),
        );

        expect(mockOnSkip).toHaveBeenCalled();
    });
});
