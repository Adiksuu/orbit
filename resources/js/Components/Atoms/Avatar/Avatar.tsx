import { cva } from 'class-variance-authority';
import React from 'react';

interface AvatarProps {
    src?: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg';
    initials?: string;
}

const classVariants = cva(
    'flex items-center justify-center rounded-md overflow-hidden bg-zinc-100 shrink-0',
    {
        variants: {
            size: {
                sm: 'w-4 h-4 text-[10px]',
                md: 'w-6 h-6 text-xs',
                lg: 'w-8 h-8 text-sm',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    },
);

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', initials }) => {
    return (
        <div className={classVariants({ size })}>
            {src ? (
                <img
                    src={src}
                    alt={alt || 'Avatar'}
                    className={'h-full w-full object-cover'}
                />
            ) : (
                <span className="font-medium text-zinc-800">{initials}</span>
            )}
        </div>
    );
};

export default Avatar;
