import { Link } from '@inertiajs/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { icons } from 'lucide-react';
import React from 'react';
import Icon from '../Icon/Icon';

const iconButtonVariants = cva(
    'bg-transparent border-none cursor-pointer p-2 rounded-md flex items-center justify-center hover:bg-[var(--bg-light-color)]/30 transition-colors duration-100',
);

interface IconButtonProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof iconButtonVariants> {
    iconName: keyof typeof icons;
    iconColor?: string;
    iconSize?: number;
    isLink?: boolean;
    link?: string;
}

const IconButton = ({
    iconName,
    iconColor,
    iconSize = 14,
    className,
    isLink = false,
    link = '',
    ...props
}: IconButtonProps) => {
    return !isLink ? (
        <button className={iconButtonVariants({ className })} {...props}>
            <Icon name={iconName} size={iconSize} color={iconColor} />
        </button>
    ) : (
        <Link className={iconButtonVariants({ className })} href={link}>
            <Icon name={iconName} size={iconSize} color={iconColor} />
        </Link>
    );
};

export default IconButton;
