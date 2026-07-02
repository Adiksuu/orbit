import Badge from '@/Components/Atoms/Badge/Badge';
import DropdownItem from '@/Components/Atoms/DropdownItem/DropdownItem';
import DropdownMenu from '@/Components/Atoms/DropdownMenu/DropdownMenu';
import DropdownTrigger from '@/Components/Atoms/DropdownTrigger/DropdownTrigger';
import Icon from '@/Components/Atoms/Icon/Icon';
import Modal from '@/Components/Atoms/Modal/Modal';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import ModalFooter from '@/Components/Molecules/ModalFooter/ModalFooter';
import ModalHeader from '@/Components/Molecules/ModalHeader/ModalHeader';
import SidebarField from '@/Components/Molecules/SidebarField/SidebarField';
import { IssueLabel } from '@/types/Issues';
import { Project } from '@/types/Projects';
import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

interface NewIssueModalProps {
    isOpen: boolean;
    onClose: () => void;
    projects: Project[];
}

const PRIORITIES = ['low', 'medium', 'high'] as const;
const LABELS: IssueLabel[] = [
    'bug',
    'feature',
    'performance',
    'design',
    'ux',
    'chore',
];

const NewIssueModal: React.FC<NewIssueModalProps> = ({
    isOpen,
    onClose,
    projects,
}) => {
    const { users } = usePage<any>().props;
    const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] =
        useState<boolean>(false);
    const [isUsersDropdownOpen, setIsUsersDropdownOpen] =
        useState<boolean>(false);

    console.log(projects);

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
        project_id: projects?.[0]?.id || '',
        status: 'open',
        priority: 'medium',
        assignee_id: '',
        labels: [] as IssueLabel[],
    });

    useEffect(() => {
        if (isOpen) {
            reset();
            if (projects?.length > 0) {
                setData('project_id', projects[0].id);
            }
        }
    }, [isOpen, projects]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('issues.store'), {
            onSuccess: () => {
                onClose();
                reset();
            },
        });
    };

    const toggleLabel = (label: IssueLabel) => {
        const next = data.labels.includes(label)
            ? data.labels.filter((x) => x !== label)
            : [...data.labels, label];
        setData('labels', next);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalHeader
                title="Create New Issue"
                onClose={onClose}
                icon={
                    <div className="bg-[var(--accent-color)]/15 flex h-8 w-8 items-center justify-center rounded-lg">
                        <Icon name="Plus" size={18} color="#8844da" />
                    </div>
                }
            />

            <form
                onSubmit={handleSubmit}
                className="grid flex-1 grid-cols-[1fr_280px] grid-rows-[1fr_auto] overflow-hidden"
            >
                <div className="flex flex-col gap-5 overflow-y-auto p-6">
                    <div className="flex flex-col gap-1.5">
                        <input
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Issue title"
                            className="w-full border-none bg-transparent text-xl font-semibold text-[var(--text-color)] outline-none placeholder:text-zinc-600 focus:border-none focus:outline-none focus:ring-0"
                        />
                        {errors.title && (
                            <span className="text-xs text-[var(--error-color)]">
                                {errors.title}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            id={'description'}
                            placeholder="Add a description..."
                            className="min-h-[200px] w-full resize-none border-none bg-transparent text-sm leading-relaxed text-[var(--text-color)] placeholder:text-zinc-600 focus:border-none focus:outline-none focus:ring-0"
                        />
                        {errors.description && (
                            <span className="text-xs text-[var(--error-color)]">
                                {errors.description}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-6 overflow-y-auto border-l border-[var(--bg-light-color)] bg-white/[0.02] p-6">
                    <SidebarField label="Project">
                        <div className="relative">
                            <DropdownTrigger
                                label={<span>{data.project_id}</span>}
                                onClick={() =>
                                    setIsProjectsDropdownOpen(
                                        !isProjectsDropdownOpen,
                                    )
                                }
                            />
                            {isProjectsDropdownOpen && (
                                <DropdownMenu>
                                    {projects?.map((option: Project) => (
                                        <DropdownItem
                                            key={option.id}
                                            label={<span>{option.name}</span>}
                                            isActive={
                                                data.project_id === option.id
                                            }
                                            onClick={() => {
                                                setData(
                                                    'project_id',
                                                    option.id as number,
                                                );
                                                setIsProjectsDropdownOpen(
                                                    false,
                                                );
                                            }}
                                        />
                                    ))}
                                </DropdownMenu>
                            )}
                        </div>
                        {errors.project_id && (
                            <span className="text-xs text-[var(--error-color)]">
                                {errors.project_id}
                            </span>
                        )}
                    </SidebarField>
                    <SidebarField label="Assignee">
                        <div className="relative">
                            <DropdownTrigger
                                label={<span>{data.assignee_id}</span>}
                                onClick={() =>
                                    setIsUsersDropdownOpen(!isUsersDropdownOpen)
                                }
                            />
                            {isUsersDropdownOpen && (
                                <DropdownMenu>
                                    {users?.map((option: string) => (
                                        <DropdownItem
                                            key={option.valueOf()}
                                            label={<span>{option}</span>}
                                            isActive={
                                                data.assignee_id === option
                                            }
                                            onClick={() => {
                                                setData(
                                                    'assignee_id',
                                                    option as string,
                                                );
                                                setIsUsersDropdownOpen(
                                                    !isUsersDropdownOpen,
                                                );
                                            }}
                                        />
                                    ))}
                                </DropdownMenu>
                            )}
                        </div>
                    </SidebarField>
                    <SidebarField label="Priority">
                        <div className="flex flex-col gap-1">
                            {PRIORITIES.map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm capitalize transition-all duration-150 ${
                                        data.priority === p
                                            ? 'bg-[var(--bg-light-color)] font-medium text-[var(--text-color)]'
                                            : 'bg-transparent text-[var(--text-gray-color)] hover:bg-white/[0.04]'
                                    }`}
                                    onClick={() =>
                                        setData('priority', p as string)
                                    }
                                >
                                    <StatusDot status={p} size="sm" />
                                    {p}
                                </button>
                            ))}
                        </div>
                    </SidebarField>
                    <SidebarField label="Labels">
                        <div className="flex flex-wrap gap-2">
                            {LABELS.map((l) => (
                                <button
                                    key={l}
                                    type="button"
                                    className="cursor-pointer border-none bg-transparent p-0 transition-transform duration-100 hover:scale-105"
                                    onClick={() => toggleLabel(l)}
                                >
                                    <Badge
                                        color={l}
                                        variant={
                                            data.labels.includes(l)
                                                ? 'default'
                                                : 'outline'
                                        }
                                    >
                                        {l}
                                    </Badge>
                                </button>
                            ))}
                        </div>
                    </SidebarField>
                </div>
                <div className="col-span-full">
                    <ModalFooter
                        onCancel={onClose}
                        submitLabel="Create issue"
                        isSubmitting={processing}
                    />
                </div>
            </form>
        </Modal>
    );
};

export default NewIssueModal;
