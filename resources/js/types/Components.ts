import { badgeVariants } from '@/Components/Atoms/Badge/Badge';
import { dropdownItemVariants } from '@/Components/Atoms/DropdownItem/DropdownItem';
import { iconButtonVariants } from '@/Components/Atoms/IconButton/IconButton';
import { inputVariants } from '@/Components/Atoms/Input/Input';
import { statusDotVariants } from '@/Components/Atoms/StatusDot/StatusDot';
import { textareaVariants } from '@/Components/Atoms/TextArea/TextArea';
import { statCardVariants } from '@/Components/Molecules/StatCard/StatCard';
import { AlertItem } from '@/types/Alert';
import {
    Issue,
    IssuePageLooks,
    IssuePriority,
    ProductivityTrendProps,
} from '@/types/Issues';
import { Project } from '@/types/Projects';
import type { VariantProps } from 'class-variance-authority';
import { icons } from 'lucide-react';
import React, {
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
    tooltip?: boolean;
    tooltipText?: ReactNode;
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
export interface DropdownMenuProps extends ChildrenItemProps {
    direction?: 'top' | 'bottom';
}
export interface DropdownTriggerProps {
    label: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
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
export interface InputProps extends VariantProps<typeof inputVariants> {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    isDisabled?: boolean;
    type?: string;
    className?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    id?: string;
    ref?: React.Ref<HTMLInputElement> | null;
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
export interface TextAreaProps extends VariantProps<typeof textareaVariants> {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    isDisabled?: boolean;
}
export interface VisualCardProps {
    children: ReactNode;
    className?: string;
}
export interface KeybindProps {
    tooltipText: string;
    keybind: string;
    tooltip?: boolean;
}
// MOLECULES COMPONENTS
export interface BoardColumnProps {
    issues: Issue[];
    priority: IssuePriority;
    activeIssue: Issue | null;
    setActiveIssue: (issue: Issue | null) => void;
}
export interface FilterButtonProps {
    icon?: keyof typeof icons;
    label: string;
    value?: string;
    onClick?: () => void;
}
export interface IssueElementProps {
    issue: Issue;
    activeIssue: Issue | null;
    setActiveIssue: (issue: Issue | null) => void;
    type?: 'list' | 'board';
    handleSelectIssueCheckbox?: (issue: Issue | string) => void;
    enabledColumns?: Record<string, boolean>;
    rowHeight?: number;
}
export interface IssuePropertyProps {
    label: string;
    children: ReactNode;
}
export interface ModalFooterProps {
    onCancel: () => void;
    submitLabel?: string;
    cancelLabel?: string;
    isSubmitting?: boolean;
    children?: ReactNode;
}
export interface ModalHeaderProps {
    title: string;
    onClose: () => void;
    icon?: ReactNode;
}
export interface NavItemProps {
    icon: keyof typeof icons;
    label: string;
    isActive?: boolean;
    badge?: string | number;
    onClick?: () => void;
    iconClassName?: string;
    link?: string;
}
export interface PaginationProps {
    links: Array<{ url: string | null; label: string; active: boolean }>;
    from: number;
    to: number;
    total: number;
    queryParams?: { perPage?: string; page?: string; [key: string]: any };
}
export interface ProjectCardProps {
    project: Project;
    issues: Issue[];
}
export interface SidebarFieldProps {
    label: string;
    children: React.ReactNode;
}
export interface StatCardProps extends VariantProps<typeof statCardVariants> {
    title: string;
    value: string | number;
    icon: keyof typeof icons;
    description?: string;
    trend?: {
        value: number;
        label: string;
        isPositive: boolean;
    };
    progress?: number;
    color?: 'accent' | 'success' | 'warning' | 'error' | 'info';
    className?: string;
}
export interface UserBadgeProps {
    name: string;
    email?: string;
    avatarSrc?: string;
    size?: 'sm' | 'md' | 'lg';
    showDetails?: boolean;
    showName?: boolean;
    showTooltip?: boolean;
    className?: string;
}
export interface VisualCardHeaderProps {
    title: string;
    description: string;
}
export interface CompletionRatioCardProps {
    open: number;
    closed: number;
    total: number;
    closedPct: number;
}
export interface PriorityItem {
    label: string;
    status: IssuePriority;
    count: number;
    pct: number;
}

export interface PriorityBreakdownCardProps {
    high: number;
    medium: number;
    low: number;
    highPct: number;
    mediumPct: number;
    lowPct: number;
}
export interface ProductivityTrendCardProps {
    trendData: ProductivityTrendProps[];
    className?: string;
}
export interface DashboardEmptyStateProps {
    iconName: keyof typeof icons;
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
}
export interface SelectionDropdownProps {
    options: { label: string; value: string; disabled?: boolean }[];
    selectedValues: string[];
    onChange: (value: string) => void;
    trigger: ReactNode;
}
// ORGANISMS COMPONENTS
export interface DashboardVisualsProps {
    issues: Issue[];
    productivity_trend: ProductivityTrendProps[];
}
export interface IssueBoardProps {
    issues: Issue[];
    activeIssue: Issue | null;
    setActiveIssue: (issue: Issue | null) => void;
}
export interface IssueDetailProps {
    isOpen: boolean;
    onClose: () => void;
    activeIssue: Issue;
}
export interface IssueTableProps {
    issues: Issue[];
    activeIssue: Issue | null;
    setActiveIssue: (issue: Issue | null) => void;
    queryParams?: { sort?: string; direction?: string; [key: string]: any };
    pagination?: ReactNode;
    project?: Project;
}
export interface NewIssueModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project;
}
export interface NewProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export interface TopNavProps {
    selectedLook: IssuePageLooks;
    setSelectedLook: (look: IssuePageLooks) => void;
    project: Project;
}
export interface PageHeaderProps {
    title: string;
    children?: ReactNode;
}
export interface AlertContainerProps {
    alerts: AlertItem[];
    removeAlert: (id: string) => void;
}
export interface BoardCardProps {
    issue: Issue;
    isActive: boolean;
    onClick: () => void;
    isClosed: boolean;
}
export interface ListRowProps {
    issue: Issue;
    isActive: boolean;
    onClick: () => void;
    isClosed: boolean;
    handleSelectIssueCheckbox?: (issue: Issue | string) => void;
    enabledColumns?: Record<string, boolean>;
    rowHeight?: number;
}

// OTHER COMPONENTS
export interface MainLayoutProps {
    children: ReactNode;
    selectedLook: IssuePageLooks;
    setSelectedLook: (look: IssuePageLooks) => void;
    projects: Project[];
    project: Project;
}
