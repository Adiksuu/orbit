import { IconButtonProps } from '@/types/Components';
import { Link } from '@inertiajs/react';
import { cva } from 'class-variance-authority';
import Icon from '../Icon/Icon';

export const iconButtonVariants = cva(
    'bg-transparent border-none cursor-pointer p-2 rounded-md flex items-center justify-center hover:bg-[var(--bg-light-color)]/30 transition-colors duration-100',
);

const IconButton = ({
    iconName,
    iconColor,
    iconSize = 14,
    className,
    isLink = false,
    link = '',
    children,
    ...props
}: IconButtonProps) => {
    return !isLink ? (
        <button className={iconButtonVariants({ className })} {...props}>
            <Icon name={iconName} size={iconSize} color={iconColor} />
            {children}
        </button>
    ) : (
        <Link className={iconButtonVariants({ className })} href={link}>
            <Icon name={iconName} size={iconSize} color={iconColor} />
        </Link>
    );
};

export default IconButton;
