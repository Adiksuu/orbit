import Button from '@/Components/Atoms/Button/Button';
import LabelBadge from '@/Components/Atoms/LabelBadge/LabelBadge';
import { PriorityIcon } from '@/Components/Atoms/PriorityIcon/PriorityIcon';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import ToggleSwitch from '@/Components/Atoms/ToggleSwitch/ToggleSwitch';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import SettingsPanelRow from '@/Components/Molecules/SettingsPanelRow/SettingsPanelRow';
import { IssueLabel } from '@/types/Issues';
import { WorkspaceSettingsTabId } from '@/types/Settings';
import { useState } from 'react';

interface WorkspaceSettingsContentProps {
    tabId: WorkspaceSettingsTabId;
}

const selectActionClass =
    'rounded-md border border-[var(--bg-light-color)] bg-[var(--bg-color)] px-3 py-1.5 text-sm text-zinc-200 transition-colors hover:border-zinc-500';

const sampleLabels: IssueLabel[] = [
    'bug',
    'feature',
    'performance',
    'design',
    'ux',
    'chore',
];

export default function WorkspaceSettingsContent({
    tabId,
}: WorkspaceSettingsContentProps) {
    const [workspaceConfig, setWorkspaceConfig] = useState({
        autoLabelColor: true,
        statusModel: 'Kanban flow',
        priorityScale: 'Three levels',
        templateVisibility: 'Workspace',
        documentAccess: 'Members only',
        guestInvites: true,
        roleApproval: true,
    });

    if (tabId === 'labels') {
        return (
            <div className="space-y-5">
                <SettingsPanel
                    title="Label taxonomy"
                    description="Maintain consistent issue categorization across the workspace."
                >
                    <div className="space-y-4 px-5 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                            {sampleLabels.map((label) => (
                                <LabelBadge key={label} label={label} />
                            ))}
                            <button
                                type="button"
                                className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[var(--bg-light-color)] px-2 py-0.5 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
                            >
                                + Add label
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-3">
                                <p className="text-sm font-medium text-white">
                                    Label groups
                                </p>
                                <p className="mt-1 text-xs text-zinc-400">
                                    Organize labels into product, design, and
                                    operations categories.
                                </p>
                            </div>
                            <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-3">
                                <div className="mb-2 flex items-center justify-between">
                                    <p className="text-sm font-medium text-white">
                                        Auto-assign label colors
                                    </p>
                                    <ToggleSwitch
                                        checked={workspaceConfig.autoLabelColor}
                                        onChange={(checked) =>
                                            setWorkspaceConfig((prev) => ({
                                                ...prev,
                                                autoLabelColor: checked,
                                            }))
                                        }
                                    />
                                </div>
                                <p className="text-xs text-zinc-400">
                                    Apply balanced color choices for newly
                                    created labels.
                                </p>
                            </div>
                        </div>
                    </div>
                </SettingsPanel>
                <SettingsPanel
                    title="Governance"
                    description="Keep naming standards and ownership clear."
                >
                    <SettingsPanelRow
                        title="Required naming pattern"
                        description="Encourage label names that map to product or domain taxonomy."
                        action={
                            <Button type="button" isBox className="px-3 py-1.5">
                                Configure
                            </Button>
                        }
                    />
                </SettingsPanel>
            </div>
        );
    }

    if (tabId === 'statuses') {
        return (
            <div className="space-y-5">
                <SettingsPanel
                    title="Workflow statuses"
                    description="Define the lifecycle model and visible status lanes."
                >
                    <div className="space-y-4 px-5 py-4">
                        <div className="flex items-center justify-between rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-3">
                            <div>
                                <p className="text-sm font-medium text-white">
                                    Status model
                                </p>
                                <p className="text-xs text-zinc-400">
                                    Choose the default progression model for all
                                    projects.
                                </p>
                            </div>
                            <button
                                type="button"
                                className={selectActionClass}
                                onClick={() =>
                                    setWorkspaceConfig((prev) => ({
                                        ...prev,
                                        statusModel:
                                            prev.statusModel === 'Kanban flow'
                                                ? 'Custom flow'
                                                : 'Kanban flow',
                                    }))
                                }
                            >
                                {workspaceConfig.statusModel}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            {[
                                { key: 'open', label: 'Open', count: 14 },
                                {
                                    key: 'in_progress',
                                    label: 'In progress',
                                    count: 8,
                                },
                                { key: 'closed', label: 'Closed', count: 21 },
                            ].map((status) => (
                                <div
                                    key={status.key}
                                    className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-3"
                                >
                                    <div className="mb-1 flex items-center gap-2">
                                        <StatusDot
                                            status={
                                                status.key as
                                                    | 'open'
                                                    | 'in_progress'
                                                    | 'closed'
                                            }
                                        />
                                        <p className="text-sm font-medium text-white">
                                            {status.label}
                                        </p>
                                    </div>
                                    <p className="text-xs text-zinc-400">
                                        {status.count} items in current snapshot
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </SettingsPanel>
                <SettingsPanel
                    title="Status maintenance"
                    description="Manage transitions and historical consistency."
                >
                    <SettingsPanelRow
                        title="Reorder statuses"
                        description="Set the order used in boards, lists, and automation."
                        action={
                            <Button type="button" isBox className="px-3 py-1.5">
                                Reorder
                            </Button>
                        }
                    />
                </SettingsPanel>
            </div>
        );
    }

    if (tabId === 'priorities') {
        return (
            <div className="space-y-5">
                <SettingsPanel
                    title="Priority framework"
                    description="Standardize urgency levels for consistent planning."
                >
                    <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-3">
                        {[
                            {
                                key: 'high',
                                label: 'High',
                                info: 'Immediate attention required',
                            },
                            {
                                key: 'medium',
                                label: 'Medium',
                                info: 'Important but not blocking',
                            },
                            {
                                key: 'low',
                                label: 'Low',
                                info: 'Can be planned flexibly',
                            },
                        ].map((priority) => (
                            <div
                                key={priority.key}
                                className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-3"
                            >
                                <div className="mb-2 flex items-center gap-2">
                                    <PriorityIcon
                                        priority={priority.key}
                                        tooltip={false}
                                    />
                                    <p className="text-sm font-medium text-white">
                                        {priority.label}
                                    </p>
                                </div>
                                <p className="text-xs text-zinc-400">
                                    {priority.info}
                                </p>
                            </div>
                        ))}
                    </div>
                    <SettingsPanelRow
                        title="Priority scale"
                        description="Select how many priority levels your workspace uses."
                        action={
                            <button
                                type="button"
                                className={selectActionClass}
                                onClick={() =>
                                    setWorkspaceConfig((prev) => ({
                                        ...prev,
                                        priorityScale:
                                            prev.priorityScale ===
                                            'Three levels'
                                                ? 'Four levels'
                                                : 'Three levels',
                                    }))
                                }
                            >
                                {workspaceConfig.priorityScale}
                            </button>
                        }
                    />
                </SettingsPanel>
                <SettingsPanel
                    title="Default policy"
                    description="Control workspace defaults for newly created issues."
                >
                    <SettingsPanelRow
                        title="Default issue priority"
                        description="Used when no explicit priority is selected."
                        action={
                            <button type="button" className={selectActionClass}>
                                Medium
                            </button>
                        }
                    />
                </SettingsPanel>
            </div>
        );
    }

    if (tabId === 'templates') {
        return (
            <div className="space-y-5">
                <SettingsPanel
                    title="Issue templates"
                    description="Create reusable structures to speed up issue creation."
                >
                    <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-2">
                        {[
                            {
                                title: 'Bug report',
                                fields: [
                                    'Summary',
                                    'Steps to reproduce',
                                    'Logs',
                                ],
                            },
                            {
                                title: 'Feature request',
                                fields: ['Problem', 'Proposal', 'Acceptance'],
                            },
                        ].map((template) => (
                            <div
                                key={template.title}
                                className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4"
                            >
                                <p className="text-sm font-medium text-white">
                                    {template.title}
                                </p>
                                <div className="mt-2 space-y-1">
                                    {template.fields.map((field) => (
                                        <div
                                            key={field}
                                            className="rounded-md bg-[var(--bg-light-color)] px-2 py-1 text-xs text-zinc-400"
                                        >
                                            {field}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <SettingsPanelRow
                        title="Template library"
                        description="Create and manage workspace-wide issue templates."
                        action={
                            <Button type="button" isBox className="px-3 py-1.5">
                                Open library
                            </Button>
                        }
                    />
                    <SettingsPanelRow
                        title="Default visibility"
                        description="Control who can use new templates by default."
                        action={
                            <button
                                type="button"
                                className={selectActionClass}
                                onClick={() =>
                                    setWorkspaceConfig((prev) => ({
                                        ...prev,
                                        templateVisibility:
                                            prev.templateVisibility ===
                                            'Workspace'
                                                ? 'Project only'
                                                : 'Workspace',
                                    }))
                                }
                            >
                                {workspaceConfig.templateVisibility}
                            </button>
                        }
                    />
                </SettingsPanel>
                <SettingsPanel
                    title="Quality controls"
                    description="Keep templates clear and reliable."
                >
                    <SettingsPanelRow
                        title="Review before publishing"
                        description="Require approval from admins before templates are available."
                        action={<ToggleSwitch checked onChange={() => {}} />}
                    />
                </SettingsPanel>
            </div>
        );
    }

    if (tabId === 'documents') {
        return (
            <div className="space-y-5">
                <SettingsPanel
                    title="Documentation defaults"
                    description="Set structure and access defaults for workspace docs."
                >
                    <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-2">
                        <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                            <p className="text-sm font-medium text-white">
                                Default access level
                            </p>
                            <p className="mt-1 text-xs text-zinc-400">
                                Applied to newly created documents.
                            </p>
                            <button
                                type="button"
                                className={`${selectActionClass} mt-3`}
                                onClick={() =>
                                    setWorkspaceConfig((prev) => ({
                                        ...prev,
                                        documentAccess:
                                            prev.documentAccess ===
                                            'Members only'
                                                ? 'Workspace and guests'
                                                : 'Members only',
                                    }))
                                }
                            >
                                {workspaceConfig.documentAccess}
                            </button>
                        </div>
                        <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                            <p className="text-sm font-medium text-white">
                                Document structure preview
                            </p>
                            <div className="mt-2 space-y-1.5">
                                {['Product', 'Engineering', 'Operations'].map(
                                    (folder) => (
                                        <div
                                            key={folder}
                                            className="flex items-center justify-between rounded-md bg-[var(--bg-light-color)] px-2 py-1 text-xs text-zinc-400"
                                        >
                                            <span>{folder}</span>
                                            <span>Folder</span>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </SettingsPanel>
                <SettingsPanel
                    title="Knowledge operations"
                    description="Improve organization and long-term discoverability."
                >
                    <SettingsPanelRow
                        title="Content indexing"
                        description="Continuously index workspace documents for fast search."
                        action={<ToggleSwitch checked onChange={() => {}} />}
                    />
                </SettingsPanel>
            </div>
        );
    }

    if (tabId === 'members') {
        return (
            <div className="space-y-5">
                <SettingsPanel
                    title="Member access"
                    description="Manage invites, directory controls, and workspace onboarding."
                >
                    <div className="space-y-2 px-5 py-4">
                        {[
                            { initials: 'JD', name: 'John Doe', role: 'Admin' },
                            {
                                initials: 'AK',
                                name: 'Anna Kowalska',
                                role: 'Member',
                            },
                            {
                                initials: 'MK',
                                name: 'Marek Kowal',
                                role: 'Member',
                            },
                        ].map((member) => (
                            <div
                                key={member.name}
                                className="flex items-center justify-between rounded-lg border border-[var(--bg-light-color)] bg-[var(--bg-color)] px-3 py-2"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-color-opacity)] text-xs font-semibold text-white">
                                        {member.initials}
                                    </span>
                                    <div>
                                        <p className="text-sm text-white">
                                            {member.name}
                                        </p>
                                        <p className="text-xs text-zinc-400">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="rounded-md border border-[var(--bg-light-color)] px-2 py-1 text-xs text-zinc-300"
                                >
                                    Manage
                                </button>
                            </div>
                        ))}
                    </div>
                    <SettingsPanelRow
                        title="Invite members"
                        description="Add teammates and assign default role at invitation time."
                        action={
                            <Button type="button" isBox className="px-3 py-1.5">
                                Invite
                            </Button>
                        }
                    />
                    <SettingsPanelRow
                        title="Allow guest invites"
                        description="Allow members to invite external collaborators."
                        action={
                            <ToggleSwitch
                                checked={workspaceConfig.guestInvites}
                                onChange={(checked) =>
                                    setWorkspaceConfig((prev) => ({
                                        ...prev,
                                        guestInvites: checked,
                                    }))
                                }
                            />
                        }
                    />
                </SettingsPanel>
                <SettingsPanel
                    title="Directory"
                    description="Centralized directory controls for teams."
                >
                    <SettingsPanelRow
                        title="SCIM sync"
                        description="Manage automatic membership provisioning."
                        action={
                            <Button type="button" isBox className="px-3 py-1.5">
                                Configure
                            </Button>
                        }
                    />
                </SettingsPanel>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <SettingsPanel
                title="Roles and permissions"
                description="Define permission boundaries and admin responsibilities."
            >
                <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-2">
                    <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                        <p className="text-sm font-medium text-white">
                            Permission matrix preview
                        </p>
                        <div className="mt-2 space-y-1.5 text-xs">
                            {[
                                { role: 'Admin', access: 'Full access' },
                                { role: 'Member', access: 'Edit + comment' },
                                { role: 'Guest', access: 'Read only' },
                            ].map((row) => (
                                <div
                                    key={row.role}
                                    className="flex items-center justify-between rounded-md bg-[var(--bg-light-color)] px-2 py-1 text-zinc-300"
                                >
                                    <span>{row.role}</span>
                                    <span>{row.access}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                        <p className="text-sm font-medium text-white">
                            Role change policy
                        </p>
                        <p className="mt-1 text-xs text-zinc-400">
                            Require admin approval before privileged role
                            assignments.
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-xs text-zinc-400">
                                Approval workflow
                            </span>
                            <ToggleSwitch
                                checked={workspaceConfig.roleApproval}
                                onChange={(checked) =>
                                    setWorkspaceConfig((prev) => ({
                                        ...prev,
                                        roleApproval: checked,
                                    }))
                                }
                            />
                        </div>
                    </div>
                </div>
                <SettingsPanelRow
                    title="Role matrix"
                    description="Review and update permissions for each workspace role."
                    action={
                        <Button type="button" isBox className="px-3 py-1.5">
                            Edit matrix
                        </Button>
                    }
                />
            </SettingsPanel>
            <SettingsPanel
                title="Administration"
                description="Operational controls for workspace governance."
            >
                <SettingsPanelRow
                    title="Audit logs"
                    description="Inspect security-sensitive role and policy changes."
                    action={
                        <Button type="button" isBox className="px-3 py-1.5">
                            View logs
                        </Button>
                    }
                />
            </SettingsPanel>
        </div>
    );
}
