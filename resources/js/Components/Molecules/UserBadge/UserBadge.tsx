import { UserBadgeProps } from '@/types/Components';
import { cva } from 'class-variance-authority';
import React from 'react';
import Avatar from '../../Atoms/Avatar/Avatar';

const classVariants = cva('flex items-center gap-2.5 text-white', {
    variants: {
        size: {
            sm: 'gap-1.5',
            md: 'gap-2.5',
            lg: 'gap-3.5',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

const UserBadge: React.FC<UserBadgeProps> = ({
    name,
    email,
    avatarSrc,
    size = 'md',
    showDetails = false,
}) => {
    return (
        <div className={classVariants({ size })}>
            <Avatar src={avatarSrc} initials={name.charAt(0)} size={size} />
            <div className={'flex min-w-0 flex-col'}>
                <span
                    className={
                        'overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-normal text-zinc-400'
                    }
                >
                    {name}
                </span>
                {showDetails && email && (
                    <span
                        className={
                            'overflow-hidden overflow-ellipsis whitespace-nowrap text-xs font-normal text-zinc-400'
                        }
                    >
                        {email}
                    </span>
                )}
            </div>
        </div>
    );
};

export default UserBadge;
