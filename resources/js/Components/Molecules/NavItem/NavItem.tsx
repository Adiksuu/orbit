import Keybind from '@/Components/Atoms/Keybind/Keybind';
import { NavItemProps } from '@/types/Components';
import { Link } from '@inertiajs/react';
import { cva } from 'class-variance-authority';
import React from 'react';
import Icon from '../../Atoms/Icon/Icon';

const classVariants = cva(
    'flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition-all duration-100 ease-in-out mb-[2px] hover:bg-[var(--bg-light-color)] hover:text-white',
    {
        variants: {
            isActive: {
                true: 'bg-[var(--accent-color-opacity)] text-white',
                false: 'text-zinc-400',
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
    link,
}) => {
    return (
        <Link
            className={classVariants({ isActive })}
            onClick={onClick}
            href={link}
        >
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
                <Keybind
                    tooltipText={`Press ${badge}`}
                    keybind={badge.toString()}
                />
            )}
        </Link>
    );
};

export default NavItem;
