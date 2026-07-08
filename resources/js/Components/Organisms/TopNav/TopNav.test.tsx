import { Project } from '@/types/Projects';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import TopNav from './TopNav';

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
            const reset = React.useCallback(
                () => setDataState(initialRef.current),
                [],
            );
            return {
                data,
                setData,
                post: vi.fn(),
                patch: vi.fn(),
                processing: false,
                reset,
                errors: {},
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
});

describe('TopNav Component', () => {
    test('renders the project name', () => {
        render(
            <TopNav
                selectedLook="List"
                setSelectedLook={() => {}}
                project={project}
            />,
        );

        expect(
            screen.getByRole('heading', { name: 'Orbit' }),
        ).toBeInTheDocument();
    });

    test('renders the List and Board view toggles', () => {
        render(
            <TopNav
                selectedLook="List"
                setSelectedLook={() => {}}
                project={project}
            />,
        );

        expect(
            screen.getByRole('button', { name: /list/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /board/i }),
        ).toBeInTheDocument();
    });

    test('highlights the currently selected view', () => {
        render(
            <TopNav
                selectedLook="List"
                setSelectedLook={() => {}}
                project={project}
            />,
        );

        expect(screen.getByRole('button', { name: /list/i })).toHaveClass(
            'text-white',
        );
        expect(screen.getByRole('button', { name: /board/i })).toHaveClass(
            'text-zinc-400',
        );
    });

    test('switches the view when a toggle is clicked', async () => {
        const setSelectedLook = vi.fn();
        render(
            <TopNav
                selectedLook="List"
                setSelectedLook={setSelectedLook}
                project={project}
            />,
        );

        fireEvent.click(screen.getByRole('button', { name: /board/i }));

        expect(setSelectedLook).toHaveBeenCalledWith('Board');
    });

    test('switches back to the List view when the List toggle is clicked', async () => {
        const setSelectedLook = vi.fn();
        render(
            <TopNav
                selectedLook="Board"
                setSelectedLook={setSelectedLook}
                project={project}
            />,
        );

        fireEvent.click(screen.getByRole('button', { name: /list/i }));

        expect(setSelectedLook).toHaveBeenCalledWith('List');
    });

    test('opens the new issue modal when the "New issue" button is clicked', async () => {
        render(
            <TopNav
                selectedLook="List"
                setSelectedLook={() => {}}
                project={project}
            />,
        );

        expect(
            document.querySelector('.backdrop-blur-sm'),
        ).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /new issue/i }));

        await waitFor(() => {
            expect(
                document.querySelector('.backdrop-blur-sm'),
            ).toBeInTheDocument();
        });
    });

    test('closes the new issue modal when the backdrop is clicked', async () => {
        render(
            <TopNav
                selectedLook="List"
                setSelectedLook={() => {}}
                project={project}
            />,
        );

        fireEvent.click(screen.getByRole('button', { name: /new issue/i }));

        const backdrop = await waitFor(() => {
            const el = document.querySelector('.backdrop-blur-sm');
            expect(el).toBeInTheDocument();
            return el as Element;
        });

        fireEvent.click(backdrop);

        await waitFor(() => {
            expect(
                document.querySelector('.backdrop-blur-sm'),
            ).not.toBeInTheDocument();
        });
    });
});
