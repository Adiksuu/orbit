import { badgeVariants } from '@/Components/Atoms/Badge/Badge';
import { dropdownItemVariants } from '@/Components/Atoms/DropdownItem/DropdownItem';
import { iconButtonVariants } from '@/Components/Atoms/IconButton/IconButton';
import { statusDotVariants } from '@/Components/Atoms/StatusDot/StatusDot';
import type { VariantProps } from 'class-variance-authority';
import { icons } from 'lucide-react';
import {
    ButtonHTMLAttributes,
    ChangeEvent,
    HTMLAttributes,
    ReactNode,
} from 'react';

export interface AvatarProps {
    src?: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg';
    initials?: string;
}
export interface BadgeProps
    extends
        Omit<HTMLAttributes<HTMLSpanElement>, 'color'>,
        VariantProps<typeof badgeVariants> {
    children: ReactNode;
}
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    isBox?: boolean;
    isDisabled?: boolean;
}
export interface DropdownItemProps
    extends
        ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof dropdownItemVariants> {
    label: ReactNode;
}
export interface ChildrenItemProps {
    children: ReactNode;
}
export interface DropdownTriggerProps {
    label: ReactNode;
    onClick: () => void;
    disabled?: boolean;
}
export interface IconProps {
    name: keyof typeof icons;
    size?: number;
    color?: string;
    className?: string;
}
export interface IconButtonProps
    extends
        ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof iconButtonVariants> {
    iconName: keyof typeof icons;
    iconColor?: string;
    iconSize?: number;
    isLink?: boolean;
    link?: string;
}
export interface InputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    isDisabled?: boolean;
    type?: string;
}
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg';
}
export interface ProgressRingProps {
    radius?: number;
    stroke?: number;
    progress: number;
    colorClass?: string;
    bgColorClass?: string;
}
export interface StatusDotProps extends VariantProps<typeof statusDotVariants> {
    status: 'open' | 'closed' | 'low' | 'medium' | 'high';
    className?: string;
}
export interface TextAreaProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    isDisabled?: boolean;
}
