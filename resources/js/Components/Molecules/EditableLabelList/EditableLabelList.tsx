import Badge from '@/Components/Atoms/Badge/Badge';
import LabelList from '@/Components/Molecules/LabelList/LabelList';
import { EditableLabelListProps } from '@/types/Components';
import { IssueLabel } from '@/types/Issues';
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
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

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

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex min-h-[26px] cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1 transition-colors hover:bg-[var(--bg-light-color)] disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
                {labels.length > 0 ? (
                    <LabelList labels={labels} />
                ) : (
                    <span className="text-sm text-[var(--text-gray-color)]">
                        None
                    </span>
                )}
            </button>
            {isOpen && (
                <div className="absolute left-0 top-[calc(100%+6px)] z-[100] flex w-max flex-wrap gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] p-3 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4),_0_8px_10px_-6px_rgba(0,0,0,0.4)]">
                    {AVAILABLE_LABELS.map((label) => {
                        const isSelected = labels.includes(label);
                        return (
                            <button
                                key={label}
                                type="button"
                                className="cursor-pointer transition-transform duration-100 ease-out hover:scale-105"
                                onClick={() => toggleLabel(label)}
                            >
                                <Badge
                                    color={label}
                                    variant={isSelected ? 'default' : 'outline'}
                                >
                                    {label}
                                </Badge>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default EditableLabelList;
