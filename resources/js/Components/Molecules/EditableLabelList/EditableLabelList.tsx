import Icon from '@/Components/Atoms/Icon/Icon';
import LabelBadge from '@/Components/Atoms/LabelBadge/LabelBadge';
import { EditableLabelListProps } from '@/types/Components';
import { IssueLabel } from '@/types/Issues';
import { cn } from '@/utils/cn';
import { LABEL_COLORS } from '@/utils/labelColors';
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
                <div className="absolute left-0 top-[calc(100%+6px)] z-[100] w-64 overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4),_0_8px_10px_-6px_rgba(0,0,0,0.4)]">
                    <div className="border-b border-[var(--border-color)] p-2">
                        <input
                            ref={searchRef}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Change or add labels..."
                            className="w-full bg-transparent px-1 py-1 text-sm text-[var(--text-color)] outline-none placeholder:text-[var(--text-gray-color)]"
                        />
                    </div>
                    <div className="max-h-64 overflow-y-auto p-1">
                        <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-gray-color)]">
                            Labels
                        </div>
                        {filteredLabels.length === 0 ? (
                            <p className="px-3 py-2 text-sm text-[var(--text-gray-color)]">
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
                                        className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-[var(--text-color)] transition-colors hover:bg-[var(--bg-light-color-hover)]"
                                    >
                                        <span
                                            className={cn(
                                                'flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[var(--border-color)]',
                                                isSelected &&
                                                    'border-[var(--accent-color)] bg-[var(--accent-color)]',
                                            )}
                                        >
                                            {isSelected && (
                                                <Icon
                                                    name="Check"
                                                    size={10}
                                                    color="white"
                                                />
                                            )}
                                        </span>
                                        <span
                                            className="h-2 w-2 shrink-0 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    LABEL_COLORS[label],
                                            }}
                                        />
                                        <span className="capitalize">
                                            {label}
                                        </span>
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
