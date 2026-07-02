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
}

const IconButton = ({
    iconName,
    iconColor = '#999',
    iconSize = 14,
    className,
    ...props
}: IconButtonProps) => {
    return (
        <button className={iconButtonVariants({ className })} {...props}>
            <Icon name={iconName} size={iconSize} color={iconColor} />
        </button>
    );
};

export default IconButton;
