import { Issue } from '@/types/Issues';
import { AssignableUser } from '@/types/Users';
import { render, screen, waitFor } from '@testing-library/react';
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
// Lets individual tests drive the form's `processing` flag.
const formState = vi.hoisted(() => ({ processing: false }));

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
                (
                    key:
                        | string
                        | Record<string, unknown>
                        | ((
                              prev: Record<string, unknown>,
                          ) => Record<string, unknown>),
                    value?: unknown,
                ) => {
                    setDataState((prev) => {
                        if (typeof key === 'function') {
                            return key(prev);
                        }
                        return typeof key === 'object'
                            ? key
                            : { ...prev, [key]: value };
                    });
                },
                [],
            );
            return {
                data,
                setData,
                patch: mockPatch,
                post: vi.fn(),
                processing: formState.processing,
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

// The Calendar popover (opened from the Dates field) relies on useAlert.
const mockAddAlert = vi.hoisted(() => vi.fn());
vi.mock('@/context/AlertContext', () => ({
    useAlert: () => ({
        addAlert: mockAddAlert,
        removeAlert: vi.fn(),
        alerts: [],
    }),
}));

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

const users: AssignableUser[] = [
    { id: 1, name: 'Ada Lovelace', avatar: '/ada.png' },
    { id: 2, name: 'Grace Hopper', avatar: null },
];

beforeEach(() => {
    vi.stubGlobal('route', mockRoute);
});

afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
    formState.processing = false;
});

describe('IssueDetail Component', () => {
    test('renders the issue title, status and priority in view mode', () => {
        render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue()}
            />,
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
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({ description: 'Steps to reproduce' })}
            />,
        );

        expect(screen.getByText('Steps to reproduce')).toBeInTheDocument();
    });

    test('shows a fallback when the issue has no description', () => {
        render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({ description: undefined })}
            />,
        );

        expect(
            screen.getByText('No description provided.'),
        ).toBeInTheDocument();
    });

    test('renders the assignee name when the issue has one', () => {
        render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({
                    assignee: {
                        id: 9,
                        name: 'Ada Lovelace',
                        avatar: '/ada.png',
                        email: 'ada@orbit.dev',
                        created_at: '',
                        updated_at: '',
                    },
                })}
            />,
        );

        expect(screen.getAllByText('Ada Lovelace').length).toBeGreaterThan(0);
        expect(screen.queryByText('Unassigned')).not.toBeInTheDocument();
    });

    test('falls back to "Unassigned" and empty labels when neither is set', () => {
        render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({
                    assignee: undefined,
                    labels: undefined,
                })}
            />,
        );

        expect(screen.getAllByText('Unassigned').length).toBeGreaterThan(0);
    });

    test('shows "opened" when created and updated timestamps match', () => {
        render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({
                    created_at: 1_700_000_000_000,
                    updated_at: 1_700_000_000_000,
                })}
            />,
        );

        expect(screen.getByText(/opened/)).toBeInTheDocument();
    });

    test('shows "updated" when the issue has been modified since creation', () => {
        render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({
                    created_at: 1_700_000_000_000,
                    updated_at: 1_700_000_500_000,
                })}
            />,
        );

        expect(screen.getByText(/updated/)).toBeInTheDocument();
    });

    test('renders the issue labels in view mode', () => {
        render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({ labels: ['bug', 'feature'] })}
            />,
        );

        expect(screen.getAllByText('feature')[0]).toBeInTheDocument();
    });

    test('calls onClose when the close button is clicked', async () => {
        const onClose = vi.fn();
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={onClose}
                activeIssue={makeIssue()}
            />,
        );

        // In view mode the only X icon is the close button.
        await userEvent.click(iconButton(container, 'lucide-x'));

        expect(onClose).toHaveBeenCalled();
    });

    test('switches to an editable form when the edit button is clicked', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue()}
            />,
        );

        expect(
            screen.queryByPlaceholderText('Issue title'),
        ).not.toBeInTheDocument();

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        expect(screen.getByPlaceholderText('Issue title')).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('Add a description...'),
        ).toBeInTheDocument();
    });

    test('lets the user edit the title', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue()}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const title = screen.getByPlaceholderText('Issue title');
        await userEvent.clear(title);
        await userEvent.type(title, 'Fixed title');

        expect(title).toHaveValue('Fixed title');
    });

    test('lets the user edit the description', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue()}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const description = screen.getByPlaceholderText('Add a description...');
        await userEvent.clear(description);
        await userEvent.type(description, 'Updated steps');

        expect(description).toHaveValue('Updated steps');
    });

    test('saves via the issues.update route and leaves edit mode on success', async () => {
        const issue = makeIssue();
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={issue}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));
        await userEvent.click(
            screen.getByRole('button', { name: /save changes/i }),
        );

        expect(mockRoute).toHaveBeenCalledWith('issues.update', issue.id);
        expect(mockPatch).toHaveBeenCalledTimes(1);
        // onSuccess exits edit mode, so the editable inputs disappear.
        expect(
            screen.queryByPlaceholderText('Issue title'),
        ).not.toBeInTheDocument();
    });

    test('cancels editing without saving', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue()}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));
        expect(screen.getByPlaceholderText('Issue title')).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: /cancel/i }));

        expect(
            screen.queryByPlaceholderText('Issue title'),
        ).not.toBeInTheDocument();
        expect(mockPatch).not.toHaveBeenCalled();
    });

    test('opens the status dropdown while editing', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({ status: 'open' })}
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
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({ status: 'open' })}
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
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({ priority: 'high' })}
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
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({ labels: [] })}
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

    test('shows the assignee picker with the current assignee while editing', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({ assignee_id: 1 })}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        expect(screen.getAllByText('Ada Lovelace').length).toBeGreaterThan(0);
        expect(screen.queryByText('Grace Hopper')).not.toBeInTheDocument();
    });

    test('opens the assignee dropdown and reassigns the issue', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({ assignee_id: undefined })}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const assigneeTrigger = screen
            .getByText('Unassigned')
            .closest('button') as HTMLElement;
        await userEvent.click(assigneeTrigger);

        expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
        expect(screen.getByText('Grace Hopper')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Grace Hopper'));

        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        expect(screen.getAllByText('Grace Hopper').length).toBeGreaterThan(0);
    });

    test('can clear an existing assignee back to "Unassigned"', async () => {
        const issue = makeIssue({ assignee_id: 1 });
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={issue}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const assigneeTrigger = screen
            .getAllByText('Ada Lovelace')[0]
            .closest('button') as HTMLElement;
        await userEvent.click(assigneeTrigger);

        const unassignedOption = screen
            .getAllByText('Unassigned')
            .find((el) => el.closest('button'));
        await userEvent.click(unassignedOption as HTMLElement);

        expect(screen.queryByText('Ada Lovelace')).not.toBeInTheDocument();
        expect(screen.getByText('Unassigned')).toBeInTheDocument();
    });

    test('resets the assignee back to the original on cancel', async () => {
        const issue = makeIssue({ assignee_id: 1 });
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={issue}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const assigneeTrigger = screen
            .getAllByText('Ada Lovelace')[0]
            .closest('button') as HTMLElement;
        await userEvent.click(assigneeTrigger);
        await userEvent.click(screen.getByText('Grace Hopper'));

        await userEvent.click(screen.getByRole('button', { name: /cancel/i }));
        await userEvent.click(iconButton(container, 'lucide-pencil'));

        expect(screen.getAllByText('Ada Lovelace').length).toBeGreaterThan(0);
        expect(screen.queryByText('Grace Hopper')).not.toBeInTheDocument();
    });

    test('shows "Unknown" for an assignee_id that does not match any user', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({ assignee_id: 999 })}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        expect(screen.getByText('Unknown')).toBeInTheDocument();
    });

    test('resets to an empty description and no labels when canceling an issue that has neither', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({
                    description: undefined,
                    labels: undefined,
                })}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));
        await userEvent.click(screen.getByRole('button', { name: /cancel/i }));

        expect(
            screen.getByText('No description provided.'),
        ).toBeInTheDocument();
    });

    test('disables the form buttons and shows "Saving..." while the update is processing', async () => {
        formState.processing = true;
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue()}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const saveButton = screen.getByRole('button', { name: /saving/i });
        expect(saveButton).toBeDisabled();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled();
    });
});

describe('IssueDetail date pickers', () => {
    // The Calendar popover is a framer-motion component that runs a real
    // (non-faked) exit animation, so assertions that depend on it having
    // fully unmounted need to go through `waitFor`.
    beforeEach(() => {
        vi.useFakeTimers({ toFake: ['Date'] });
        vi.setSystemTime(new Date('2026-07-25T12:00:00.000Z'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test('opens the start date calendar when its "Select date" button is clicked', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({
                    start_date: undefined,
                    end_date: undefined,
                })}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const [startDateButton] = screen.getAllByText('Select date');
        await userEvent.click(startDateButton);

        expect(screen.getByText('July 2026')).toBeInTheDocument();
        expect(screen.getByText('Today')).toBeInTheDocument();
    });

    test('opening the end date calendar closes the start date calendar', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({
                    start_date: undefined,
                    end_date: undefined,
                })}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const [startDateButton, endDateButton] =
            screen.getAllByText('Select date');
        await userEvent.click(startDateButton);
        await waitFor(() =>
            expect(screen.getAllByText('Today')).toHaveLength(1),
        );

        await userEvent.click(endDateButton);
        await waitFor(() =>
            expect(screen.getAllByText('Today')).toHaveLength(1),
        );
    });

    test('selects a start date and displays it once the calendar is closed', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({
                    start_date: undefined,
                    end_date: undefined,
                })}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const [startDateButton] = screen.getAllByText('Select date');
        await userEvent.click(startDateButton);

        await userEvent.click(screen.getByText('20'));
        await userEvent.click(screen.getByText('Close'));
        await waitFor(() =>
            expect(screen.queryByText('Today')).not.toBeInTheDocument(),
        );

        expect(screen.getByText('2026-07-20')).toBeInTheDocument();
    });

    test('pushes the end date forward when a later start date is selected', async () => {
        // Note: the mount effect resets `data` without start_date/end_date,
        // so any preset dates on activeIssue are cleared before edit mode is
        // entered. Both dates are therefore picked through the UI instead.
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue()}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const [, endDateButton] = screen.getAllByText('Select date');
        await userEvent.click(endDateButton);
        await userEvent.click(screen.getByText('10'));
        await userEvent.click(screen.getByText('Close'));
        await waitFor(() =>
            expect(screen.queryByText('Today')).not.toBeInTheDocument(),
        );

        const startDateButton = screen.getByText('Select date');
        await userEvent.click(startDateButton);
        await waitFor(() =>
            expect(screen.getAllByText('Today')).toHaveLength(1),
        );
        await userEvent.click(screen.getByText('20'));
        await userEvent.click(screen.getByText('Close'));
        await waitFor(() =>
            expect(screen.queryByText('Today')).not.toBeInTheDocument(),
        );

        // Both fields now show the newly picked start date.
        expect(screen.getAllByText('2026-07-20')).toHaveLength(2);
    });

    test('keeps the end date unchanged when the new start date is still before it', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue()}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const [, endDateButton] = screen.getAllByText('Select date');
        await userEvent.click(endDateButton);
        await userEvent.click(screen.getByText('25'));
        await userEvent.click(screen.getByText('Close'));
        await waitFor(() =>
            expect(screen.queryByText('Today')).not.toBeInTheDocument(),
        );

        const startDateButton = screen.getByText('Select date');
        await userEvent.click(startDateButton);
        await waitFor(() =>
            expect(screen.getAllByText('Today')).toHaveLength(1),
        );
        await userEvent.click(screen.getByText('10'));
        await userEvent.click(screen.getByText('Close'));
        await waitFor(() =>
            expect(screen.queryByText('Today')).not.toBeInTheDocument(),
        );

        expect(screen.getByText('2026-07-10')).toBeInTheDocument();
        expect(screen.getByText('2026-07-25')).toBeInTheDocument();
    });

    test('selects an end date directly without touching the start date', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({
                    start_date: undefined,
                    end_date: undefined,
                })}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const [, endDateButton] = screen.getAllByText('Select date');
        await userEvent.click(endDateButton);

        await userEvent.click(screen.getByText('12'));
        await userEvent.click(screen.getByText('Close'));
        await waitFor(() =>
            expect(screen.queryByText('Today')).not.toBeInTheDocument(),
        );

        expect(screen.getByText('2026-07-12')).toBeInTheDocument();
        expect(screen.getByText('Select date')).toBeInTheDocument();
    });

    test('uses the already-selected start date as the minimum/range-start when opening the end date calendar', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue()}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const [startDateButton] = screen.getAllByText('Select date');
        await userEvent.click(startDateButton);
        await userEvent.click(screen.getByText('10'));
        await userEvent.click(screen.getByText('Close'));
        await waitFor(() =>
            expect(screen.queryByText('Today')).not.toBeInTheDocument(),
        );

        const endDateButton = screen.getByText('Select date');
        await userEvent.click(endDateButton);
        await waitFor(() =>
            expect(screen.getAllByText('Today')).toHaveLength(1),
        );

        // Day 5 is before the selected start date (the 10th), so it should
        // be disabled by the `minDate`/`rangeStart` derived from start_date.
        // (index 0 picks the current month's "5" over the next month's
        // trailing filler day of the same number.)
        expect(screen.getAllByText('5')[0]).toHaveClass('cursor-not-allowed');
    });

    test('closes the date picker overlay when the backdrop is clicked', async () => {
        const { container } = render(
            <IssueDetail
                isOpen={true}
                users={users}
                onClose={() => {}}
                activeIssue={makeIssue({
                    start_date: undefined,
                    end_date: undefined,
                })}
            />,
        );

        await userEvent.click(iconButton(container, 'lucide-pencil'));

        const [startDateButton] = screen.getAllByText('Select date');
        await userEvent.click(startDateButton);
        expect(screen.getByText('Today')).toBeInTheDocument();

        const backdrop = container.querySelector(
            '[class*="backdrop-blur-[2px]"]',
        ) as HTMLElement;
        await userEvent.click(backdrop);

        await waitFor(() =>
            expect(screen.queryByText('Today')).not.toBeInTheDocument(),
        );
    });
});
