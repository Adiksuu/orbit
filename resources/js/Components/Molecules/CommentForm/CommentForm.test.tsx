import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import CommentForm from './CommentForm';

describe('CommentForm Component', () => {
    test('renders a textarea and submit button', () => {
        render(<CommentForm onSubmit={() => {}} />);

        expect(
            screen.getByPlaceholderText('Leave a comment...'),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Comment' }),
        ).toBeInTheDocument();
    });

    test('submits the typed body and clears the field', async () => {
        const handleSubmit = vi.fn();
        render(<CommentForm onSubmit={handleSubmit} />);

        const textarea = screen.getByPlaceholderText('Leave a comment...');
        await userEvent.type(textarea, 'Nice work');
        await userEvent.click(screen.getByRole('button', { name: 'Comment' }));

        expect(handleSubmit).toHaveBeenCalledWith('Nice work');
        expect(textarea).toHaveValue('');
    });

    test('does not submit an empty or whitespace-only comment', async () => {
        const handleSubmit = vi.fn();
        render(<CommentForm onSubmit={handleSubmit} />);

        await userEvent.type(
            screen.getByPlaceholderText('Leave a comment...'),
            '   ',
        );
        expect(screen.getByRole('button', { name: 'Comment' })).toBeDisabled();
    });

    test('guards against a direct form submit with a whitespace-only body', () => {
        const handleSubmit = vi.fn();
        render(<CommentForm onSubmit={handleSubmit} />);

        const textarea = screen.getByPlaceholderText('Leave a comment...');
        fireEvent.change(textarea, { target: { value: '   ' } });
        fireEvent.submit(textarea.closest('form') as HTMLFormElement);

        expect(handleSubmit).not.toHaveBeenCalled();
    });

    test('disables the textarea and button, and shows "Posting..." while submitting', () => {
        render(<CommentForm onSubmit={() => {}} isSubmitting />);

        expect(
            screen.getByPlaceholderText('Leave a comment...'),
        ).toBeDisabled();
        expect(
            screen.getByRole('button', { name: 'Posting...' }),
        ).toBeDisabled();
    });
});
