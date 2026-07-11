import IconButton from '@/Components/Atoms/IconButton/IconButton';
import Input from '@/Components/Atoms/Input/Input';
import Modal from '@/Components/Atoms/Modal/Modal';
import TextArea from '@/Components/Atoms/TextArea/TextArea';
import ProjectCard from '@/Components/Molecules/ProjectCard/ProjectCard';
import SidebarField from '@/Components/Molecules/SidebarField/SidebarField';
import { NewProjectModalProps } from '@/types/Components';
import { AVAILABLE_COLORS } from '@/types/Projects';
import { getColorTheme } from '@/utils/colors';
import React, { useEffect, useState } from 'react';

const NewProjectModal: React.FC<NewProjectModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [projectName, setProjectName] = useState('');
    const [projectKey, setProjectKey] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColor, setSelectedColor] = useState(AVAILABLE_COLORS[0]);

    useEffect(() => {
        if (isOpen) {
            setProjectName('');
            setProjectKey('');
            setDescription('');
            setSelectedColor(AVAILABLE_COLORS[0]);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission will be handled by parent via onClose callback
        // User will integrate with Inertia form submission
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <div className="flex h-full flex-col">
                <div className="flex items-start justify-between border-b border-[var(--bg-light-color)] p-6">
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-[var(--text-color)]">
                            Create New Project
                        </h2>
                        <p className="mt-1 text-sm text-zinc-400">
                            Set up a new project to organize your work and
                            collaborate with your team
                        </p>
                    </div>
                    <IconButton iconName="X" onClick={onClose} iconSize={20} />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-1 flex-col overflow-hidden"
                >
                    <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto p-6 md:grid-cols-[1fr_50%]">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-[var(--text-color)]">
                                    Project name
                                    <span className="text-[var(--error-color)]">
                                        {' '}
                                        *
                                    </span>
                                </label>
                                <Input
                                    value={projectName}
                                    onChange={(e) =>
                                        setProjectName(e.target.value)
                                    }
                                    placeholder="Enter project name"
                                    variant="modal"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-[var(--text-color)]">
                                    Slug
                                    <span className="text-[var(--error-color)]">
                                        {' '}
                                        *
                                    </span>
                                </label>
                                <Input
                                    value={projectKey}
                                    onChange={(e) =>
                                        setProjectKey(e.target.value)
                                    }
                                    placeholder="e.g. MOB"
                                    variant="modal"
                                />
                                <p className="text-xs text-[var(--text-gray-color)]">
                                    Unique key to identify your project
                                </p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-[var(--text-color)]">
                                    Description
                                </label>
                                <TextArea
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Describe your project..."
                                    variant="modal"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <SidebarField label="Color">
                                <div className="flex flex-wrap gap-3">
                                    {AVAILABLE_COLORS.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() =>
                                                setSelectedColor(color)
                                            }
                                            className={`h-6 w-6 rounded-full border border-solid transition-transform ${getColorTheme(color).accent} ${
                                                selectedColor === color
                                                    ? 'scale-110 border-white'
                                                    : 'border-transparent hover:scale-110'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </SidebarField>
                            <ProjectCard
                                project={{
                                    id: 0,
                                    name: projectName,
                                    slug: projectKey,
                                    description: description,
                                    color: selectedColor,
                                    created_at: 0,
                                    updated_at: 0,
                                }}
                                issues={[]}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-3 border-t border-[var(--bg-light-color)] px-6 py-4">
                        <button
                            type="button"
                            className="cursor-pointer rounded-lg border-none bg-transparent px-4 py-2 text-sm font-medium text-zinc-400 transition-colors duration-150 hover:text-white"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--accent-color)] px-6 py-2 text-sm font-medium text-[var(--text-color)] transition-all duration-150 ease-in-out hover:bg-[var(--accent-light-color)]"
                        >
                            Create project
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default NewProjectModal;
