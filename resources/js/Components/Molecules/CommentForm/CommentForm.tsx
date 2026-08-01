import Button from '@/Components/Atoms/Button/Button';
import TextArea from '@/Components/Atoms/TextArea/TextArea';
import { CommentFormProps } from '@/types/Components';
import React, { useState } from 'react';

const CommentForm: React.FC<CommentFormProps> = ({
    onSubmit,
    isSubmitting = false,
}) => {
    const [body, setBody] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!body.trim()) return;

        onSubmit(body);
        setBody('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <TextArea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Leave a comment..."
                className="min-h-[80px]"
                isDisabled={isSubmitting}
            />
            <Button
                type="submit"
                isDisabled={isSubmitting || !body.trim()}
                className="self-end"
            >
                {isSubmitting ? 'Posting...' : 'Comment'}
            </Button>
        </form>
    );
};

export default CommentForm;
