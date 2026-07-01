import DropdownItem from '@/Components/Atoms/DropdownItem/DropdownItem';
import DropdownMenu from '@/Components/Atoms/DropdownMenu/DropdownMenu';
import DropdownTrigger from '@/Components/Atoms/DropdownTrigger/DropdownTrigger';
import { IssueLabel } from '@/types/Issues';
import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Badge from '../../Atoms/Badge/Badge';
import Button from '../../Atoms/Button/Button';
import Icon from '../../Atoms/Icon/Icon';
import Input from '../../Atoms/Input/Input';
import StatusDot from '../../Atoms/StatusDot/StatusDot';
import TextArea from '../../Atoms/TextArea/TextArea';
import styles from './NewIssueModal.module.scss';

interface NewIssueModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NewIssueModal: React.FC<NewIssueModalProps> = ({ isOpen, onClose }) => {
    const { projects, users } = usePage<any>().props;
    const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] =
        useState<boolean>();

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

    if (!isOpen) return null;

    const priorities = ['low', 'medium', 'high'];
    const labels: IssueLabel[] = [
        'bug',
        'feature',
        'performance',
        'design',
        'ux',
        'chore',
    ];

    console.log(`Projects: ` + projects);

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <header className={styles.header}>
                    <div className={styles.titleGroup}>
                        <Icon name="Plus" size={20} color="#8844da" />
                        <h2>Create New Issue</h2>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <Icon name="X" size={20} color="#999" />
                    </button>
                </header>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.mainContent}>
                        <div className={styles.field}>
                            <Input
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                placeholder="Issue title"
                                className={styles.titleInput}
                            />
                            {errors.title && (
                                <span className={styles.error}>
                                    {errors.title}
                                </span>
                            )}
                        </div>

                        <div className={styles.field}>
                            <TextArea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                placeholder="Add a description..."
                                className={styles.descriptionInput}
                            />
                            {errors.description && (
                                <span className={styles.error}>
                                    {errors.description}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={styles.sidebar}>
                        <div className={styles.sideField}>
                            <label>Project</label>
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
                                    {projects?.map((option: string) => (
                                        <DropdownItem
                                            key={option.valueOf()}
                                            label={<span>{option}</span>}
                                            isActive={
                                                data.project_id === option
                                            }
                                            onClick={() => {
                                                setData(
                                                    'project_id',
                                                    option as string,
                                                );
                                                setIsProjectsDropdownOpen(
                                                    false,
                                                );
                                            }}
                                        />
                                    ))}
                                </DropdownMenu>
                            )}
                            {errors.project_id && (
                                <span className={styles.error}>
                                    {errors.project_id}
                                </span>
                            )}
                        </div>

                        <div className={styles.sideField}>
                            <label>Assignee</label>
                            <select
                                value={data.assignee_id}
                                onChange={(e) =>
                                    setData('assignee_id', e.target.value)
                                }
                                className={styles.select}
                            >
                                <option value="">Unassigned</option>
                                {users?.map((u: any) => (
                                    <option key={u.id} value={u.id}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.sideField}>
                            <label>Priority</label>
                            <div className={styles.btnGroup}>
                                {priorities.map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        className={`${styles.toggleBtn} ${data.priority === p ? styles.active : ''}`}
                                        onClick={() =>
                                            setData('priority', p as any)
                                        }
                                    >
                                        <StatusDot
                                            status={p as any}
                                            size="sm"
                                        />
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.sideField}>
                            <label>Labels</label>
                            <div className={styles.labelsGrid}>
                                {labels.map((l) => (
                                    <button
                                        key={l}
                                        type="button"
                                        className={`${styles.labelItem} ${data.labels.includes(l) ? styles.selected : ''}`}
                                        onClick={() => {
                                            const next = data.labels.includes(l)
                                                ? data.labels.filter(
                                                      (x) => x !== l,
                                                  )
                                                : [...data.labels, l];
                                            setData('labels', next);
                                        }}
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
                        </div>
                    </div>

                    <footer className={styles.footer}>
                        <button
                            type="button"
                            className={styles.cancelBtn}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <Button
                            className={styles.submitBtn}
                            isDisabled={processing}
                        >
                            {processing ? 'Creating...' : 'Create issue'}
                        </Button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default NewIssueModal;
