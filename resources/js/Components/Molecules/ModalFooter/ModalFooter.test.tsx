import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import ModalFooter from './ModalFooter';

describe('ModalFooter Component', () => {
    const noop = () => {};

    test('renders default Cancel and Submit labels', () => {
        render(<ModalFooter onCancel={noop} />);

        expect(
            screen.getByRole('button', { name: /cancel/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /submit/i }),
        ).toBeInTheDocument();
    });

    test('renders custom cancel and submit labels', () => {
        render(
            <ModalFooter
                onCancel={noop}
                cancelLabel="Discard"
                submitLabel="Create issue"
            />,
        );

        expect(
            screen.getByRole('button', { name: /discard/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /create issue/i }),
        ).toBeInTheDocument();
    });

    test('calls onCancel when the cancel button is clicked', async () => {
        const handleCancel = vi.fn();
        render(<ModalFooter onCancel={handleCancel} />);

        await userEvent.click(screen.getByRole('button', { name: /cancel/i }));

        expect(handleCancel).toHaveBeenCalledTimes(1);
    });

    test('shows a "Creating..." label and disables the submit button while submitting', () => {
        render(<ModalFooter onCancel={noop} isSubmitting />);

        const submit = screen.getByRole('button', { name: /creating/i });
        expect(submit).toBeInTheDocument();
        expect(submit).toBeDisabled();
    });

    test('renders custom children instead of the default buttons', () => {
        render(
            <ModalFooter onCancel={noop}>
                <button>Custom action</button>
            </ModalFooter>,
        );

        expect(
            screen.getByRole('button', { name: /custom action/i }),
        ).toBeInTheDocument();
        expect(
            screen.queryByRole('button', { name: /submit/i }),
        ).not.toBeInTheDocument();
    });
});
