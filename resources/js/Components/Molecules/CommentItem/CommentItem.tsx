import Avatar from '@/Components/Atoms/Avatar/Avatar';
import { CommentItemProps } from '@/types/Components';
import { formatTimeAgo } from '@/utils/time';
import React from 'react';

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    return (
        <div className="flex gap-3">
            <Avatar
                src={comment.user?.avatar}
                initials={comment.user?.name.charAt(0) ?? '?'}
                size="sm"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[var(--text-color)]">
                        {comment.user?.name ?? 'Unknown'}
                    </span>
                    <span className="text-xs text-[var(--text-gray-color)]">
                        {formatTimeAgo(comment.created_at)} ago
                    </span>
                </div>
                <p className="whitespace-pre-wrap text-sm text-[var(--text-color)]">
                    {comment.body}
                </p>
            </div>
        </div>
    );
};

export default CommentItem;
