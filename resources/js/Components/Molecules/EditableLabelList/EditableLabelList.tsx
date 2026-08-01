import Icon from '@/Components/Atoms/Icon/Icon';
import LabelBadge from '@/Components/Atoms/LabelBadge/LabelBadge';
import { EditableLabelListProps } from '@/types/Components';
import { IssueLabel } from '@/types/Issues';
import { cn } from '@/utils/cn';
import React, { useEffect, useRef, useState } from 'react';

const AVAILABLE_LABELS: IssueLabel[] = [
    'bug',
    'feature',
    'performance',
    'design',
    'ux',
    'chore',
];

const EditableLabelList: React.FC<EditableLabelListProps> = ({
    labels,
    onSave,
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        searchRef.current?.focus();

        const handleClickOutside = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const toggleLabel = (label: IssueLabel) => {
        const next = labels.includes(label)
            ? labels.filter((l) => l !== label)
            : [...labels, label];
        onSave(next);
    };

    const filteredLabels = AVAILABLE_LABELS.filter((label) =>
        label.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="relative" ref={containerRef}>
            <div className="flex flex-wrap items-center gap-1.5">
                {labels.length === 0 && (
                    <span className="text-sm text-[var(--text-gray-color)]">
                        None
                    </span>
                )}
                {labels.map((label) => (
                    <LabelBadge key={label} label={label} />
                ))}
                <button
                    type="button"
                    disabled={disabled}
                    aria-label="Edit labels"
                    onClick={() => {
                        setSearch('');
                        setIsOpen((prev) => !prev);
                    }}
                    className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--text-gray-color)] transition-colors hover:bg-[var(--bg-light-color)] hover:text-[var(--text-color)] disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                    <Icon name="Plus" size={12} />
                </button>
            </div>
            {isOpen && (
                <div className="absolute left-0 top-[calc(100%+6px)] z-[100] w-64 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/95 p-1.5 shadow-2xl backdrop-blur-md">
                    <div className="flex items-center justify-between px-2 py-1.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Labels
                        </p>
                        {labels.length > 0 && (
                            <button
                                type="button"
                                onClick={() => onSave([])}
                                className="cursor-pointer text-[10px] font-medium text-zinc-500 transition-colors hover:text-zinc-200"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                    <div className="px-2 pb-1.5">
                        <input
                            ref={searchRef}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Change or add labels..."
                            className="w-full rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-100 outline-none placeholder:text-zinc-500"
                        />
                    </div>
                    <div className="max-h-64 space-y-0.5 overflow-y-auto">
                        {filteredLabels.length === 0 ? (
                            <p className="px-2 py-2 text-xs text-zinc-500">
                                No labels found.
                            </p>
                        ) : (
                            filteredLabels.map((label) => {
                                const isSelected = labels.includes(label);
                                return (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() => toggleLabel(label)}
                                        className={cn(
                                            'group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-all duration-150',
                                            isSelected
                                                ? 'bg-[var(--accent-color)]/10 text-zinc-100'
                                                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200',
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all duration-150',
                                                isSelected
                                                    ? 'border-[var(--accent-color)] bg-[var(--accent-color)]'
                                                    : 'border-zinc-700 bg-zinc-800 group-hover:border-zinc-600',
                                            )}
                                        >
                                            {isSelected && (
                                                <Icon
                                                    name="Check"
                                                    size={10}
                                                    className="text-white"
                                                />
                                            )}
                                        </div>
                                        <LabelBadge
                                            label={label}
                                            className="pointer-events-none"
                                        />
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditableLabelList;
