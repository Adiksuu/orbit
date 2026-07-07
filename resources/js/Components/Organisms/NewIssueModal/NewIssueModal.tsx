import Badge from '@/Components/Atoms/Badge/Badge';
import Icon from '@/Components/Atoms/Icon/Icon';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import ModalFooter from '@/Components/Molecules/ModalFooter/ModalFooter';
import ModalHeader from '@/Components/Molecules/ModalHeader/ModalHeader';
import SidebarField from '@/Components/Molecules/SidebarField/SidebarField';
import { NewIssueModalProps } from '@/types/Components';
import { IssueLabel, IssuePriority } from '@/types/Issues';
import { useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';

const PRIORITIES: IssuePriority[] = ['low', 'medium', 'high'];
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
    project,
}) => {
    // const [isUsersDropdownOpen, setIsUsersDropdownOpen] =
    //     useState<boolean>(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
        project_id: project.id,
        status: 'open',
        priority: 'medium',
        assignee_id: '',
        labels: [] as IssueLabel[],
    });

    useEffect(() => {
        if (isOpen) {
            reset();
            setData('project_id', project.id);
        }
    }, [isOpen, project, reset, setData]);

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
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                    onClick={onClose}
                />
            )}
            <div
                className={`fixed inset-y-0 right-0 z-[110] flex h-screen w-full flex-col border-l border-solid border-[var(--bg-light-color)] bg-[var(--bg-dark-color)] shadow-2xl transition-transform duration-300 ease-in-out sm:w-[500px] md:w-[680px] ${isOpen ? 'translate-x-0' : 'translate-x-full'} `}
            >
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
                    className="flex flex-1 flex-col overflow-hidden"
                >
                    <div className="grid flex-1 grid-cols-1 overflow-y-auto md:grid-cols-[1fr_260px]">
                        <div className="flex flex-col gap-5 p-6">
                            <div className="flex flex-col gap-1.5">
                                <input
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
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
                                    className="min-h-[200px] w-full resize-none border-none bg-transparent text-sm leading-relaxed text-[var(--text-color)] placeholder:text-zinc-600 focus:border-none focus:outline-none focus:ring-0 md:min-h-[300px]"
                                />
                                {errors.description && (
                                    <span className="text-xs text-[var(--error-color)]">
                                        {errors.description}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 border-t border-[var(--bg-light-color)] bg-white/[0.01] p-6 md:border-l md:border-t-0">
                            {/*<SidebarField label="Assignee">*/}
                            {/*    <div className="relative">*/}
                            {/*        <DropdownTrigger*/}
                            {/*            label={<span>{data.assignee_id}</span>}*/}
                            {/*            onClick={() =>*/}
                            {/*                setIsUsersDropdownOpen(*/}
                            {/*                    !isUsersDropdownOpen,*/}
                            {/*                )*/}
                            {/*            }*/}
                            {/*        />*/}
                            {/*        {isUsersDropdownOpen && (*/}
                            {/*            <DropdownMenu>*/}
                            {/*                {users?.map((option: string) => (*/}
                            {/*                    <DropdownItem*/}
                            {/*                        key={option.valueOf()}*/}
                            {/*                        label={*/}
                            {/*                            <span>{option}</span>*/}
                            {/*                        }*/}
                            {/*                        isActive={*/}
                            {/*                            data.assignee_id ===*/}
                            {/*                            option*/}
                            {/*                        }*/}
                            {/*                        onClick={() => {*/}
                            {/*                            setData(*/}
                            {/*                                'assignee_id',*/}
                            {/*                                option as string,*/}
                            {/*                            );*/}
                            {/*                            setIsUsersDropdownOpen(*/}
                            {/*                                !isUsersDropdownOpen,*/}
                            {/*                            );*/}
                            {/*                        }}*/}
                            {/*                    />*/}
                            {/*                ))}*/}
                            {/*            </DropdownMenu>*/}
                            {/*        )}*/}
                            {/*    </div>*/}
                            {/*</SidebarField>*/}
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
                    </div>
                    <div className="shrink-0 border-t border-[var(--bg-light-color)] bg-[var(--bg-dark-color)]">
                        <ModalFooter
                            onCancel={onClose}
                            submitLabel="Create issue"
                            isSubmitting={processing}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default NewIssueModal;
