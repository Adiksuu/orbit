import Button from '@/Components/Atoms/Button/Button';
import ToggleSwitch from '@/Components/Atoms/ToggleSwitch/ToggleSwitch';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import SettingsPanelRow from '@/Components/Molecules/SettingsPanelRow/SettingsPanelRow';
import { WorkspaceSettingsTabId } from '@/types/Settings';
import { useState } from 'react';

interface WorkspaceSettingsContentProps {
    tabId: WorkspaceSettingsTabId;
}

const selectActionClass =
    'rounded-md border border-[var(--bg-light-color)] bg-[var(--bg-color)] px-3 py-1.5 text-sm text-zinc-200 transition-colors hover:border-zinc-500';

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
                    <SettingsPanelRow
                        title="Default labels"
                        description="Manage labels available to all projects by default."
                        action={
                            <Button type="button" isBox className="px-3 py-1.5">
                                Manage labels
                            </Button>
                        }
                    />
                    <SettingsPanelRow
                        title="Auto-assign label colors"
                        description="Apply balanced color choices for newly created labels."
                        action={
                            <ToggleSwitch
                                checked={workspaceConfig.autoLabelColor}
                                onChange={(checked) =>
                                    setWorkspaceConfig((prev) => ({
                                        ...prev,
                                        autoLabelColor: checked,
                                    }))
                                }
                            />
                        }
                    />
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
                    <SettingsPanelRow
                        title="Status model"
                        description="Choose the default progression model for all projects."
                        action={
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
                        }
                    />
                    <SettingsPanelRow
                        title="Closed status behavior"
                        description="Control if closed work is hidden from active boards."
                        action={<ToggleSwitch checked onChange={() => {}} />}
                    />
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
                    <SettingsPanelRow
                        title="Escalation highlighting"
                        description="Highlight issues that exceed SLA based on priority."
                        action={<ToggleSwitch checked onChange={() => {}} />}
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
                    <SettingsPanelRow
                        title="Default access level"
                        description="Applied to newly created documents."
                        action={
                            <button
                                type="button"
                                className={selectActionClass}
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
                        }
                    />
                    <SettingsPanelRow
                        title="Version history retention"
                        description="Preserve historical edits for audit and recovery."
                        action={<ToggleSwitch checked onChange={() => {}} />}
                    />
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
                <SettingsPanelRow
                    title="Role matrix"
                    description="Review and update permissions for each workspace role."
                    action={
                        <Button type="button" isBox className="px-3 py-1.5">
                            Edit matrix
                        </Button>
                    }
                />
                <SettingsPanelRow
                    title="Role changes require approval"
                    description="Require admin approval before privileged role assignments."
                    action={
                        <ToggleSwitch
                            checked={workspaceConfig.roleApproval}
                            onChange={(checked) =>
                                setWorkspaceConfig((prev) => ({
                                    ...prev,
                                    roleApproval: checked,
                                }))
                            }
                        />
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
