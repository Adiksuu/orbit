import { Project } from '@/types/Projects';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import NewIssueModal from './NewIssueModal';

// Shared, hoisted mock state so tests can drive `processing` / `errors` and
// assert on the form's `post` / `reset` calls.
const formState = vi.hoisted(() => ({
    processing: false,
    errors: {} as Record<string, string>,
}));
const mockPost = vi.hoisted(() =>
    vi.fn((_url: string, opts?: { onSuccess?: () => void }) =>
        opts?.onSuccess?.(),
    ),
);
const mockReset = vi.hoisted(() => vi.fn());
const mockRoute = vi.hoisted(() => vi.fn((name: string) => `/${name}`));

vi.mock('@inertiajs/react', async () => {
    const React = await import('react');
    return {
        Link: ({ children, href, ...props }: Record<string, unknown>) =>
            React.createElement('a', { href, ...props }, children as never),
        useForm: (initial: Record<string, unknown>) => {
            const initialRef = React.useRef(initial);
            const [data, setDataState] =
                React.useState<Record<string, unknown>>(initial);
            const setData = React.useCallback(
                (key: string | Record<string, unknown>, value?: unknown) => {
                    setDataState((prev) =>
                        typeof key === 'object'
                            ? key
                            : { ...prev, [key]: value },
                    );
                },
                [],
            );
            const reset = React.useCallback(() => {
                mockReset();
                setDataState(initialRef.current);
            }, []);
            return {
                data,
                setData,
                post: mockPost,
                patch: vi.fn(),
                processing: formState.processing,
                reset,
                errors: formState.errors,
            };
        },
    };
});

const project: Project = {
    id: 1,
    name: 'Orbit',
    slug: 'orbit',
    description: '',
    color: 'purple',
    created_at: 0,
    updated_at: 0,
};

beforeEach(() => {
    vi.stubGlobal('route', mockRoute);
});

afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
    formState.processing = false;
    formState.errors = {};
});

const getPanel = () =>
    screen
        .getByText('Create New Issue')
        .closest('div[class*="translate-x-"]') as HTMLElement;

describe('NewIssueModal Component', () => {
    test('renders the modal header', () => {
        render(<NewIssueModal isOpen onClose={() => {}} project={project} />);

        expect(
            screen.getByRole('heading', { name: /create new issue/i }),
        ).toBeInTheDocument();
    });

    test('slides the panel into view when open', () => {
        render(<NewIssueModal isOpen onClose={() => {}} project={project} />);

        expect(getPanel()).toHaveClass('translate-x-0');
        expect(document.querySelector('.backdrop-blur-sm')).toBeInTheDocument();
    });

    test('slides the panel off-screen and hides the backdrop when closed', () => {
        render(
            <NewIssueModal
                isOpen={false}
                onClose={() => {}}
                project={project}
            />,
        );

        expect(getPanel()).toHaveClass('translate-x-full');
        expect(
            document.querySelector('.backdrop-blur-sm'),
        ).not.toBeInTheDocument();
    });

    test('renders a button for every priority and label option', () => {
        render(<NewIssueModal isOpen onClose={() => {}} project={project} />);

        ['low', 'medium', 'high'].forEach((p) =>
            expect(
                screen.getByRole('button', { name: new RegExp(p, 'i') }),
            ).toBeInTheDocument(),
        );
        ['bug', 'feature', 'performance', 'design', 'ux', 'chore'].forEach(
            (l) => expect(screen.getByText(l)).toBeInTheDocument(),
        );
    });

    test('lets the user type a title', async () => {
        render(<NewIssueModal isOpen onClose={() => {}} project={project} />);

        const title = screen.getByPlaceholderText('Issue title');
        await userEvent.type(title, 'Broken login');

        expect(title).toHaveValue('Broken login');
    });

    test('lets the user type a description', async () => {
        render(<NewIssueModal isOpen onClose={() => {}} project={project} />);

        const description = screen.getByPlaceholderText('Add a description...');
        await userEvent.type(description, 'Fails on submit');

        expect(description).toHaveValue('Fails on submit');
    });

    test('toggles a label on and off when its badge is clicked', async () => {
        render(<NewIssueModal isOpen onClose={() => {}} project={project} />);

        const badge = screen.getByText('bug');
        // Unselected labels render with the "outline" variant.
        expect(badge.parentElement).toHaveClass('group');

        await userEvent.click(badge);
        // Selecting switches to the "default" variant.
        expect(badge.parentElement).toHaveClass('group');

        await userEvent.click(badge);
        // Clicking again removes it, restoring the outline variant.
        expect(badge.parentElement).toHaveClass('group');
    });

    test('highlights the priority button the user selects', async () => {
        render(<NewIssueModal isOpen onClose={() => {}} project={project} />);

        const high = screen.getByRole('button', { name: /high/i });
        expect(high).not.toHaveClass('bg-[var(--bg-light-color)]');

        await userEvent.click(high);

        expect(high).toHaveClass('bg-[var(--bg-light-color)]');
    });

    test('submits the form, posting to the issues.store route and closing on success', async () => {
        const handleClose = vi.fn();
        render(
            <NewIssueModal isOpen onClose={handleClose} project={project} />,
        );

        await userEvent.click(
            screen.getByRole('button', { name: /create issue/i }),
        );

        expect(mockRoute).toHaveBeenCalledWith('issues.store');
        expect(mockPost).toHaveBeenCalledTimes(1);
        // The mocked post fires onSuccess, which closes the modal and resets.
        expect(handleClose).toHaveBeenCalledTimes(1);
        expect(mockReset).toHaveBeenCalled();
    });

    test('disables the submit button and shows a pending label while submitting', () => {
        formState.processing = true;
        render(<NewIssueModal isOpen onClose={() => {}} project={project} />);

        const submit = screen.getByRole('button', { name: /creating/i });
        expect(submit).toBeInTheDocument();
        expect(submit).toBeDisabled();
    });

    test('shows validation errors returned from the server', () => {
        formState.errors = { title: 'The title field is required.' };
        render(<NewIssueModal isOpen onClose={() => {}} project={project} />);

        expect(
            screen.getByText('The title field is required.'),
        ).toBeInTheDocument();
    });

    test('shows a validation error for the description field', () => {
        formState.errors = { description: 'The description is too long.' };
        render(<NewIssueModal isOpen onClose={() => {}} project={project} />);

        expect(
            screen.getByText('The description is too long.'),
        ).toBeInTheDocument();
    });
});
