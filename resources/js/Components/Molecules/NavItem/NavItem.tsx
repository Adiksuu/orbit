import { cva } from 'class-variance-authority';
import { icons } from 'lucide-react';
import React from 'react';
import Icon from '../../Atoms/Icon/Icon';

interface NavItemProps {
    icon: keyof typeof icons;
    label: string;
    isActive?: boolean;
    badge?: string | number;
    onClick?: () => void;
    iconClassName?: string;
}

const classVariants = cva(
    'flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition-all duration-100 ease-in-out text-zinc-400 mb-[2px] hover:bg-[var(--bg-light-color)] hover:text-white',
    {
        variants: {
            isActive: {
                true: 'bg-[var(--accent-color-opacity)] text-white',
                false: '',
            },
        },
        defaultVariants: {
            isActive: false,
        },
    },
);

const NavItem: React.FC<NavItemProps> = ({
    icon,
    label,
    isActive,
    badge,
    onClick,
    iconClassName,
}) => {
    return (
        <div className={classVariants({ isActive })} onClick={onClick}>
            <div className={'flex items-center gap-3'}>
                <Icon
                    name={icon}
                    size={18}
                    className={iconClassName}
                    color={'#fff'}
                />
                <span className={'text-sm font-normal'}>{label}</span>
            </div>
            {badge !== undefined && (
                <span
                    className={
                        'rounded-full bg-[var(--bg-light-color)] px-3 py-0.5 text-xs text-zinc-300'
                    }
                >
                    {badge}
                </span>
            )}
        </div>
    );
};

export default NavItem;
