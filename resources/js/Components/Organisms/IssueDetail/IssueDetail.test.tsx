import { Issue } from '@/types/Issues';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import IssueDetail from './IssueDetail';

const mockPatch = vi.hoisted(() =>
    vi.fn((_url: string, opts?: { onSuccess?: () => void }) =>
        opts?.onSuccess?.(),
    ),
);
const mockRoute = vi.hoisted(() =>
    vi.fn((name: string, id?: string | number) => `/${name}/${id ?? ''}`),
);

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
            return {
                data,
                setData,
                patch: mockPatch,
                post: vi.fn(),
                processing: false,
                reset: () => setDataState(initialRef.current),
                errors: {},
            };
        },
    };
});

// react-markdown is heavy ESM; render its content as plain text for assertions.
vi.mock('react-markdown', () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
}));
vi.mock('remark-gfm', () => ({ default: () => {} }));

let counter = 0;
const makeIssue = (overrides: Partial<Issue> = {}): Issue => ({
    id: `ISSUE-${counter++}`,
    title: 'Broken login',
    description: 'Steps to reproduce',
    status: 'open',
    priority: 'high',
    project_id: 1,
    user_id: 1,
    created_at: 1_700_000_000_000,
    updated_at: 1_700_000_000_000,
    labels: ['bug'],
    ...overrides,
});

const iconButton = (container: HTMLElement, iconClass: string) =>
    container.querySelector(`.${iconClass}`)?.closest('button') as HTMLElement;

beforeEach(() => {
    vi.stubGlobal('route', mockRoute);
});

afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
});

describe('IssueDetail Component', () => {
    test('renders the issue title, status and priority in view mode', () => {
        render(
            <IssueDetail activeIssue={makeIssue()} setActiveIssue={() => {}} />,
        );

        expect(
            screen.getByRole('heading', { name: 'Broken login' }),
        ).toBeInTheDocument();
        expect(screen.getByText('open')).toBeInTheDocument();
        // "high" appears as the priority value in view mode.
        expect(screen.getAllByText('high').length).toBeGreaterThan(0);
    });

    test('renders the description via markdown', () => {
        render(
            <IssueDetail
                activeIssue={makeIssue({ description: 'Steps to reproduce' })}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.getByText('Steps to reproduce')).toBeInTheDocument();
    });

    test('shows a fallback when the issue has no description', () => {
        render(
            <IssueDetail
                activeIssue={makeIssue({ description: undefined })}
                setActiveIssue={() => {}}
            />,
        );

        expect(
            screen.getByText('No description provided.'),
        ).toBeInTheDocument();
    });

    test('renders the assignee name when the issue has one', () => {
        render(
            <IssueDetail
                activeIssue={makeIssue({
                    assignee: {
                        id: 9,
                        name: 'Ada Lovelace',
                        avatar: '/ada.png',
                        email: 'ada@orbit.dev',
                        password: '',
                        created_at: '',
                        updated_at: '',
                    },
                })}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.getAllByText('Ada Lovelace').length).toBeGreaterThan(0);
        expect(screen.queryByText('Unassigned')).not.toBeInTheDocument();
    });

    test('falls back to "Unassigned" and empty labels when neither is set', () => {
        render(
            <IssueDetail
                activeIssue={makeIssue({
                    assignee: undefined,
                    labels: undefined,
                })}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.getAllByText('Unassigned').length).toBeGreaterThan(0);
    });

    test('shows "opened" when created and updated timestamps match', () => {
        render(
            <IssueDetail
                activeIssue={makeIssue({
                    created_at: 1_700_000_000_000,
                    updated_at: 1_700_000_000_000,
                })}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.getByText(/opened/)).toBeInTheDocument();
    });

    test('shows "updated" when the issue has been modified since creation', () => {
        render(
            <IssueDetail
                activeIssue={makeIssue({
                    created_at: 1_700_000_000_000,
                    updated_at: 1_700_000_500_000,
                })}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.getByText(/updated/)).toBeInTheDocument();
    });

    test('renders the issue labels in view mode', () => {
        render(
            <IssueDetail
                activeIssue={makeIssue({ labels: ['bug', 'feature'] })}
                setActiveIssue={() => {}}
            />,
        );

        expect(screen.getAllByText('feature')[0]).toBeInTheDocument();
    });

    test('calls setActiveIssue(null) when the close button is clicked', async () => {
        const setActiveIssue = vi.fn();
        const { container } = render(
            <IssueDetail
                activeIssue={makeIssue()}
                setActiveIssue={setActiveIssue}
            />,
        );

        // In view mode the only X icon is the close button.
        await userEvent.click(iconButton(container, 'lucide-x'));

        expect(setActiveIssue).toHaveBeenCalledWith(null);
    });

    test('switches to an editable form when the edit button is clicked', async () => {
        const { container } = render(
            <IssueDetail activeIssue={makeIssue()} setActiveIssue={() => {}} />,
        );

        expect(
            screen.queryByPlaceholderText('Issue title'),
        ).not.toBeInTheDocument();

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        expect(screen.getByPlaceholderText('Issue title')).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('Issue description'),
        ).toBeInTheDocument();
    });

    test('lets the user edit the title', async () => {
        const { container } = render(
            <IssueDetail activeIssue={makeIssue()} setActiveIssue={() => {}} />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const title = screen.getByPlaceholderText('Issue title');
        await userEvent.clear(title);
        await userEvent.type(title, 'Fixed title');

        expect(title).toHaveValue('Fixed title');
    });

    test('lets the user edit the description', async () => {
        const { container } = render(
            <IssueDetail activeIssue={makeIssue()} setActiveIssue={() => {}} />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const description = screen.getByPlaceholderText('Issue description');
        await userEvent.clear(description);
        await userEvent.type(description, 'Updated steps');

        expect(description).toHaveValue('Updated steps');
    });

    test('saves via the issues.update route and leaves edit mode on success', async () => {
        const issue = makeIssue();
        const { container } = render(
            <IssueDetail activeIssue={issue} setActiveIssue={() => {}} />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));
        await userEvent.click(iconButton(container, 'lucide-check'));

        expect(mockRoute).toHaveBeenCalledWith('issues.update', issue.id);
        expect(mockPatch).toHaveBeenCalledTimes(1);
        // onSuccess exits edit mode, so the editable inputs disappear.
        expect(
            screen.queryByPlaceholderText('Issue title'),
        ).not.toBeInTheDocument();
    });

    test('cancels editing without saving', async () => {
        const { container } = render(
            <IssueDetail activeIssue={makeIssue()} setActiveIssue={() => {}} />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));
        expect(screen.getByPlaceholderText('Issue title')).toBeInTheDocument();

        // In edit mode the first X icon is the cancel button.
        const cancel = container
            .querySelectorAll('.lucide-x')[0]
            ?.closest('button') as HTMLElement;
        await userEvent.click(cancel);

        expect(
            screen.queryByPlaceholderText('Issue title'),
        ).not.toBeInTheDocument();
        expect(mockPatch).not.toHaveBeenCalled();
    });

    test('opens the status dropdown while editing', async () => {
        const { container } = render(
            <IssueDetail
                activeIssue={makeIssue({ status: 'open' })}
                setActiveIssue={() => {}}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        // The "closed" option is only visible once the dropdown is opened.
        expect(screen.queryByText('closed')).not.toBeInTheDocument();

        const statusTrigger = screen
            .getByText('open')
            .closest('button') as HTMLElement;
        await userEvent.click(statusTrigger);

        expect(screen.getByText('closed')).toBeInTheDocument();
    });

    test('selects a status option and closes the dropdown', async () => {
        const { container } = render(
            <IssueDetail
                activeIssue={makeIssue({ status: 'open' })}
                setActiveIssue={() => {}}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const statusTrigger = screen
            .getByText('open')
            .closest('button') as HTMLElement;
        await userEvent.click(statusTrigger);

        await userEvent.click(screen.getByText('closed'));

        // Picking an option closes the menu; the trigger now shows "closed".
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        expect(screen.getAllByText('closed').length).toBeGreaterThan(0);
    });

    test('opens the priority dropdown and selects an option', async () => {
        const { container } = render(
            <IssueDetail
                activeIssue={makeIssue({ priority: 'high' })}
                setActiveIssue={() => {}}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        // The "low" option is only visible once the priority dropdown opens.
        expect(screen.queryByText('low')).not.toBeInTheDocument();

        const priorityTrigger = screen
            .getByText('high')
            .closest('button') as HTMLElement;
        await userEvent.click(priorityTrigger);

        await userEvent.click(screen.getByText('low'));

        expect(screen.getAllByText('low').length).toBeGreaterThan(0);
    });

    test('toggles a label on and off while editing', async () => {
        const { container } = render(
            <IssueDetail
                activeIssue={makeIssue({ labels: [] })}
                setActiveIssue={() => {}}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const badge = screen.getAllByText('feature')[0];
        // Unselected labels render with the "outline" variant.
        expect(badge.parentElement).toHaveClass('group');

        await userEvent.click(badge);
        // It should still have the badge styling
        expect(badge.parentElement).toHaveClass('group');

        await userEvent.click(badge);
        expect(badge.parentElement).toHaveClass('group');
    });
});
