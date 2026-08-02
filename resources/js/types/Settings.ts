import { icons } from 'lucide-react';

export type SettingsSectionId = 'account' | 'workspace';

export type SettingsTabId =
    | 'preferences'
    | 'profile'
    | 'notifications'
    | 'security-access'
    | 'integrations'
    | 'export'
    | 'labels'
    | 'statuses'
    | 'priorities'
    | 'templates'
    | 'documents'
    | 'members'
    | 'roles-management';

export interface SettingsTab {
    id: SettingsTabId;
    label: string;
    icon: keyof typeof icons;
    section: SettingsSectionId;
    description: string;
}

export const SETTINGS_TABS: SettingsTab[] = [
    {
        id: 'preferences',
        label: 'Preferences',
        icon: 'SlidersHorizontal',
        section: 'account',
        description: 'Control personal experience defaults and display behavior.',
    },
    {
        id: 'profile',
        label: 'Profile',
        icon: 'User',
        section: 'account',
        description: 'Manage your personal details and profile visibility.',
    },
    {
        id: 'notifications',
        label: 'Notifications',
        icon: 'Bell',
        section: 'account',
        description: 'Adjust delivery channels and activity notification rules.',
    },
    {
        id: 'security-access',
        label: 'Security & access',
        icon: 'ShieldCheck',
        section: 'account',
        description: 'Review authentication, sessions, and access controls.',
    },
    {
        id: 'integrations',
        label: 'Integrations',
        icon: 'Plug',
        section: 'account',
        description: 'Connect third-party tools and external workflows.',
    },
    {
        id: 'export',
        label: 'Export',
        icon: 'Download',
        section: 'account',
        description: 'Prepare and download your account-related data exports.',
    },
    {
        id: 'labels',
        label: 'Labels',
        icon: 'Tag',
        section: 'workspace',
        description: 'Define label taxonomy used across issues and projects.',
    },
    {
        id: 'statuses',
        label: 'Statuses',
        icon: 'ListTodo',
        section: 'workspace',
        description: 'Configure lifecycle statuses for work tracking.',
    },
    {
        id: 'priorities',
        label: 'Priorities',
        icon: 'Flag',
        section: 'workspace',
        description: 'Standardize priority levels and urgency definitions.',
    },
    {
        id: 'templates',
        label: 'Templates',
        icon: 'FileText',
        section: 'workspace',
        description: 'Create reusable templates for consistent issue creation.',
    },
    {
        id: 'documents',
        label: 'Documents',
        icon: 'File',
        section: 'workspace',
        description: 'Manage workspace documentation structure and defaults.',
    },
    {
        id: 'members',
        label: 'Members',
        icon: 'Users',
        section: 'workspace',
        description: 'View and manage team members in your workspace.',
    },
    {
        id: 'roles-management',
        label: 'Roles & management',
        icon: 'Shield',
        section: 'workspace',
        description: 'Define roles, permissions, and administrative policies.',
    },
];

export const SETTINGS_DEFAULT_TAB: SettingsTabId = 'preferences';

export const isSettingsTabId = (value: string): value is SettingsTabId => {
    return SETTINGS_TABS.some((tab) => tab.id === value);
};
