import { SelectionDropdownProps } from '@/types/Components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import SelectionDropdown from './SelectionDropdown';

vi.mock('@/context/ModalContext', () => ({
    useModal: () => ({ getIfAnyModalIsOpened: () => false }),
}));

vi.mock('@/context/ShortcutContext', () => ({
    useShortcuts: vi.fn(),
}));

const baseOptions: SelectionDropdownProps['options'] = [
    { label: 'Title', value: 'title' },
    { label: 'Status', value: 'status' },
    { label: 'Priority', value: 'priority', disabled: true },
];

describe('SelectionDropdown Component', () => {
    beforeEach(() => {
        vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    test('renders the trigger and keeps the dropdown closed by default', () => {
        render(
            <SelectionDropdown
                options={baseOptions}
                selectedValues={[]}
                onChange={vi.fn()}
                trigger={<span>Columns</span>}
            />,
        );

        expect(screen.getByText('Columns')).toBeInTheDocument();
        expect(screen.queryByText('Display Columns')).not.toBeInTheDocument();
    });

    test('opens the dropdown when the trigger is clicked', async () => {
        const user = userEvent.setup();
        render(
            <SelectionDropdown
                options={baseOptions}
                selectedValues={[]}
                onChange={vi.fn()}
                trigger={<span>Columns</span>}
            />,
        );

        await user.click(screen.getByText('Columns'));

        expect(await screen.findByText('Display Columns')).toBeInTheDocument();
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
    });

    test('closes the dropdown when the trigger is clicked again', async () => {
        const user = userEvent.setup();
        render(
            <SelectionDropdown
                options={baseOptions}
                selectedValues={[]}
                onChange={vi.fn()}
                trigger={<span>Columns</span>}
            />,
        );

        await user.click(screen.getByText('Columns'));
        expect(await screen.findByText('Display Columns')).toBeInTheDocument();

        await user.click(screen.getByText('Columns'));
        expect(screen.queryByText('Display Columns')).not.toBeInTheDocument();
    });

    test('calls onChange with the option value when an enabled option is clicked', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <SelectionDropdown
                options={baseOptions}
                selectedValues={[]}
                onChange={onChange}
                trigger={<span>Columns</span>}
            />,
        );

        await user.click(screen.getByText('Columns'));
        await user.click(await screen.findByText('Title'));

        expect(onChange).toHaveBeenCalledWith('title');
    });

    test('does not call onChange when a disabled option is clicked', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <SelectionDropdown
                options={baseOptions}
                selectedValues={[]}
                onChange={onChange}
                trigger={<span>Columns</span>}
            />,
        );

        await user.click(screen.getByText('Columns'));
        await user.click(await screen.findByText('Priority'));

        expect(onChange).not.toHaveBeenCalled();
    });

    test('renders a checkmark for selected options', async () => {
        const user = userEvent.setup();
        render(
            <SelectionDropdown
                options={baseOptions}
                selectedValues={['title']}
                onChange={vi.fn()}
                trigger={<span>Columns</span>}
            />,
        );

        await user.click(screen.getByText('Columns'));
        await screen.findByText('Display Columns');

        expect(document.querySelector('.lucide-check')).toBeInTheDocument();
    });

    test('renders no checkmarks when nothing is selected', async () => {
        const user = userEvent.setup();
        render(
            <SelectionDropdown
                options={baseOptions}
                selectedValues={[]}
                onChange={vi.fn()}
                trigger={<span>Columns</span>}
            />,
        );

        await user.click(screen.getByText('Columns'));
        await screen.findByText('Display Columns');

        expect(document.querySelectorAll('.lucide-check')).toHaveLength(0);
    });

    test('renders a checkmark for every option when all are selected', async () => {
        const user = userEvent.setup();
        const options: SelectionDropdownProps['options'] = [
            { label: 'Title', value: 'title' },
            { label: 'Status', value: 'status' },
        ];
        render(
            <SelectionDropdown
                options={options}
                selectedValues={['title', 'status']}
                onChange={vi.fn()}
                trigger={<span>Columns</span>}
            />,
        );

        await user.click(screen.getByText('Columns'));
        await screen.findByText('Display Columns');

        expect(document.querySelectorAll('.lucide-check')).toHaveLength(2);
    });

    test('renders a divider instead of a button for separator options', async () => {
        const user = userEvent.setup();
        const options: SelectionDropdownProps['options'] = [
            { label: 'Title', value: 'title' },
            { label: '', value: 'separator' },
            { label: 'Status', value: 'status' },
        ];
        render(
            <SelectionDropdown
                options={options}
                selectedValues={[]}
                onChange={vi.fn()}
                trigger={<span>Columns</span>}
            />,
        );

        await user.click(screen.getByText('Columns'));
        await screen.findByText('Display Columns');

        expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    test('renders the header with no option buttons when the list is empty', async () => {
        const user = userEvent.setup();
        render(
            <SelectionDropdown
                options={[]}
                selectedValues={[]}
                onChange={vi.fn()}
                trigger={<span>Columns</span>}
            />,
        );

        await user.click(screen.getByText('Columns'));

        expect(await screen.findByText('Display Columns')).toBeInTheDocument();
        expect(screen.queryAllByRole('button')).toHaveLength(0);
    });

    test('closes the dropdown when clicking outside', async () => {
        const user = userEvent.setup();
        render(
            <SelectionDropdown
                options={baseOptions}
                selectedValues={[]}
                onChange={vi.fn()}
                trigger={<span>Columns</span>}
            />,
        );

        await user.click(screen.getByText('Columns'));
        await screen.findByText('Display Columns');

        await user.click(document.body);

        expect(screen.queryByText('Display Columns')).not.toBeInTheDocument();
    });
});
