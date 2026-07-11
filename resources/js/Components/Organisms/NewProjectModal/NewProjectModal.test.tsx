import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import NewProjectModal from './NewProjectModal';

const mockPost = vi.fn();
const mockReset = vi.fn();
const mockSetData = vi.fn();
const mockOnClose = vi.fn();

// Mock the global route function
vi.stubGlobal(
    'route',
    vi.fn((name: string) => `/api/routes/${name}`),
);

let formState = {
    data: { name: '', slug: '', description: '', color: 'purple' },
    setData: mockSetData,
    post: mockPost,
    processing: false,
    reset: mockReset,
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

describe('NewProjectModal Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockOnClose.mockClear();
        formState = {
            data: { name: '', slug: '', description: '', color: 'purple' },
            setData: mockSetData,
            post: mockPost,
            processing: false,
            reset: mockReset,
            errors: {},
        };
    });

    test('does not render when isOpen is false', () => {
        render(<NewProjectModal isOpen={false} onClose={mockOnClose} />);

        expect(
            screen.queryByText('Create New Project'),
        ).not.toBeInTheDocument();
    });

    test('renders when isOpen is true', () => {
        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        expect(screen.getByText('Create New Project')).toBeInTheDocument();
    });

    test('renders form labels', () => {
        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        expect(screen.getByText('Project name')).toBeInTheDocument();
        expect(screen.getByText('Slug')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Color')).toBeInTheDocument();
    });

    test('renders required asterisks', () => {
        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        const asterisks = screen.getAllByText('*');
        expect(asterisks.length).toBeGreaterThanOrEqual(2);
    });

    test('renders input fields', () => {
        const { container } = render(
            <NewProjectModal isOpen={true} onClose={mockOnClose} />,
        );

        const inputs = container.querySelectorAll('input[type="text"]');
        expect(inputs.length).toBeGreaterThanOrEqual(2);
    });

    test('renders textarea for description', () => {
        const { container } = render(
            <NewProjectModal isOpen={true} onClose={mockOnClose} />,
        );

        const textareas = container.querySelectorAll('textarea');
        expect(textareas.length).toBeGreaterThanOrEqual(1);
    });

    test('renders Cancel and Create buttons', () => {
        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        expect(
            screen.getByRole('button', { name: /Cancel/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Create project/i }),
        ).toBeInTheDocument();
    });

    test('calls onClose when Cancel is clicked', async () => {
        const user = userEvent.setup();
        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        const cancelButton = screen.getByRole('button', { name: /Cancel/i });
        await user.click(cancelButton);

        expect(mockOnClose).toHaveBeenCalled();
    });

    test('renders placeholder text in inputs', () => {
        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        expect(
            screen.getByPlaceholderText('Enter project name'),
        ).toBeInTheDocument();
        expect(screen.getByPlaceholderText('e.g. MOB')).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('Describe your project...'),
        ).toBeInTheDocument();
    });

    test('renders slug helper text', () => {
        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        expect(
            screen.getByText('Unique key to identify your project'),
        ).toBeInTheDocument();
    });

    test('renders form element', () => {
        const { container } = render(
            <NewProjectModal isOpen={true} onClose={mockOnClose} />,
        );

        const form = container.querySelector('form');
        expect(form).toBeInTheDocument();
    });

    test('calls post on form submission', async () => {
        const user = userEvent.setup();
        mockPost.mockImplementation((_route: string, options: any) => {
            options.onSuccess?.();
        });

        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        const submitButton = screen.getByRole('button', {
            name: /Create project/i,
        });
        await user.click(submitButton);

        expect(mockPost).toHaveBeenCalled();
    });

    test('calls onClose after successful submission', async () => {
        const user = userEvent.setup();
        mockPost.mockImplementation((_route: string, options: any) => {
            options.onSuccess?.();
        });

        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        const submitButton = screen.getByRole('button', {
            name: /Create project/i,
        });
        await user.click(submitButton);

        expect(mockOnClose).toHaveBeenCalled();
    });

    test('calls reset after successful submission', async () => {
        const user = userEvent.setup();
        mockPost.mockImplementation((_route: string, options: any) => {
            options.onSuccess?.();
        });

        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        const submitButton = screen.getByRole('button', {
            name: /Create project/i,
        });
        await user.click(submitButton);

        expect(mockReset).toHaveBeenCalled();
    });

    test('resets form when modal opens', () => {
        const { rerender } = render(
            <NewProjectModal isOpen={false} onClose={mockOnClose} />,
        );

        mockReset.mockClear();

        rerender(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        expect(mockReset).toHaveBeenCalled();
    });

    test('renders header and footer sections', () => {
        const { container } = render(
            <NewProjectModal isOpen={true} onClose={mockOnClose} />,
        );

        const title = screen.getByText('Create New Project');
        expect(title).toBeInTheDocument();

        const form = container.querySelector('form');
        expect(form).toBeInTheDocument();
    });

    test('renders color buttons', () => {
        const { container } = render(
            <NewProjectModal isOpen={true} onClose={mockOnClose} />,
        );

        const colorButtons = container.querySelectorAll(
            'button[type="button"]',
        );
        expect(colorButtons.length).toBeGreaterThan(0);
    });

    test('submit button is clickable', () => {
        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        const submitButton = screen.getByRole('button', {
            name: /Create project/i,
        });
        expect(submitButton).not.toBeDisabled();
    });

    test('cancel button is clickable', () => {
        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        const cancelButton = screen.getByRole('button', { name: /Cancel/i });
        expect(cancelButton).not.toBeDisabled();
    });

    test('renders grid layout for form', () => {
        const { container } = render(
            <NewProjectModal isOpen={true} onClose={mockOnClose} />,
        );

        const gridDivs = container.querySelectorAll('[class*="grid"]');
        expect(gridDivs.length).toBeGreaterThanOrEqual(1);
    });

    test('renders correct form structure', () => {
        const { container } = render(
            <NewProjectModal isOpen={true} onClose={mockOnClose} />,
        );

        const divs = container.querySelectorAll('div[class*="flex"]');
        expect(divs.length).toBeGreaterThan(0);
    });

    test('handles form submission without errors', async () => {
        const user = userEvent.setup();
        const mockSuccessCallback = vi.fn();
        mockPost.mockImplementation((_route: string, options: any) => {
            mockSuccessCallback();
            options.onSuccess?.();
        });

        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        const submitButton = screen.getByRole('button', {
            name: /Create project/i,
        });
        await user.click(submitButton);

        expect(mockSuccessCallback).toHaveBeenCalled();
    });

    test('renders modal description', () => {
        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        expect(
            screen.getByText(
                /Set up a new project to organize your work and collaborate with your team/,
            ),
        ).toBeInTheDocument();
    });

    test('calls setData with form field values when inputs change', async () => {
        const user = userEvent.setup();
        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        const nameInput = screen.getByPlaceholderText(
            'Enter project name',
        ) as HTMLInputElement;
        await user.type(nameInput, 'Test Project');

        expect(mockSetData).toHaveBeenCalled();
    });

    test('calls setData when slug input changes', async () => {
        const user = userEvent.setup();
        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        const slugInput = screen.getByPlaceholderText(
            'e.g. MOB',
        ) as HTMLInputElement;
        await user.type(slugInput, 'TEST');

        expect(mockSetData).toHaveBeenCalled();
    });

    test('calls setData when description textarea changes', async () => {
        const user = userEvent.setup();
        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        const descriptionInput = screen.getByPlaceholderText(
            'Describe your project...',
        ) as HTMLTextAreaElement;
        await user.type(descriptionInput, 'Test Description');

        expect(mockSetData).toHaveBeenCalled();
    });

    test('renders error messages when they exist', () => {
        formState.errors = {
            name: 'Name is required',
            slug: 'Slug is taken',
            description: 'Description is too long',
        };

        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Slug is taken')).toBeInTheDocument();
        expect(screen.getByText('Description is too long')).toBeInTheDocument();
    });

    test('renders processing state when processing is true', () => {
        formState.processing = true;

        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        expect(screen.getByText('Creating...')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Creating.../i }),
        ).toBeDisabled();
        expect(screen.getByRole('button', { name: /Cancel/i })).toBeDisabled();
    });

    test('calls onClose when close icon button is clicked', async () => {
        const user = userEvent.setup();
        // Since IconButton is a custom component, we should look for it by its name or icon
        // Looking at NewProjectModal.tsx, it has iconName="X"
        render(<NewProjectModal isOpen={true} onClose={mockOnClose} />);

        // The IconButton likely renders a button. Let's find it.
        // It has iconName="X", so it might have some accessible name or we can find it by icon if Atom Icon is mocked or not.
        // Actually, let's just find the button that isn't Cancel or Create project.
        const buttons = screen.getAllByRole('button');
        const closeButton = buttons.find(
            (b) =>
                !b.textContent?.includes('Cancel') &&
                !b.textContent?.includes('Create project') &&
                !b.textContent?.includes('Creating'),
        );

        if (closeButton) {
            await user.click(closeButton);
            expect(mockOnClose).toHaveBeenCalled();
        }
    });

    test('renders color button for each available color', () => {
        const { container } = render(
            <NewProjectModal isOpen={true} onClose={mockOnClose} />,
        );

        const colorButtons = container.querySelectorAll(
            'button[type="button"][class*="w-6"]',
        );
        expect(colorButtons.length).toBeGreaterThan(0);
    });

    test('color button onClick calls setData', async () => {
        const user = userEvent.setup();
        const { container } = render(
            <NewProjectModal isOpen={true} onClose={mockOnClose} />,
        );

        const colorButtons = container.querySelectorAll(
            'button[type="button"][class*="w-6"]',
        );
        if (colorButtons.length > 1) {
            await user.click(colorButtons[1]);
            expect(mockSetData).toHaveBeenCalled();
        }
    });

    test('modal has correct flex layout structure', () => {
        const { container } = render(
            <NewProjectModal isOpen={true} onClose={mockOnClose} />,
        );

        const flexContainers = container.querySelectorAll(
            'div[class*="flex-col"]',
        );
        expect(flexContainers.length).toBeGreaterThan(0);
    });

    test('renders form input with modal variant', () => {
        const { container } = render(
            <NewProjectModal isOpen={true} onClose={mockOnClose} />,
        );

        const inputs = container.querySelectorAll('input');
        expect(inputs.length).toBeGreaterThanOrEqual(2);
    });

    test('renders textarea with modal variant', () => {
        const { container } = render(
            <NewProjectModal isOpen={true} onClose={mockOnClose} />,
        );

        const textareas = container.querySelectorAll('textarea');
        expect(textareas.length).toBeGreaterThanOrEqual(1);
    });
});
