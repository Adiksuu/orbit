import LabelBadge from '@/Components/Atoms/LabelBadge/LabelBadge';
import { IssueLabel } from '@/types/Issues';
import { cn } from '@/utils/cn';
import React, { useEffect, useRef, useState } from 'react';

interface LabelListProps {
    labels: IssueLabel[];
    badgeClassName?: string;
    isClosed?: boolean;
}

const LabelList: React.FC<LabelListProps> = ({
    labels,
    badgeClassName,
    isClosed = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const displayedLabels = labels?.slice(0, 2) || [];
    const remainingLabels = labels?.slice(2) || [];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!labels || labels.length === 0) return null;

    return (
        <div className="relative flex items-center gap-1.5" ref={containerRef}>
            {displayedLabels.map((label, idx) => (
                <LabelBadge
                    key={idx}
                    label={label}
                    className={cn(badgeClassName, isClosed && 'opacity-40')}
                />
            ))}
            {remainingLabels.length > 0 && (
                <div className="relative inline-flex">
                    <span
                        className={cn(
                            'inline-flex cursor-pointer items-center rounded-full bg-[var(--bg-light-color)] px-2 py-0.5 text-xs font-medium text-[var(--text-gray-color)] transition-colors hover:bg-[var(--bg-light-color-hover)]',
                            badgeClassName,
                            isClosed && 'opacity-40',
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                    >
                        +{remainingLabels.length}
                    </span>
                    {isOpen && (
                        <div className="absolute right-0 top-[calc(100%+6px)] z-[100] flex max-h-48 min-w-[150px] flex-col gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-color)] p-3 opacity-100 shadow-2xl">
                            <div className="mb-1 flex items-center justify-between border-b border-[var(--border-color)] pb-2">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-gray-color)]">
                                    More Labels
                                </span>
                                <span className="text-[10px] font-medium text-[var(--text-gray-color)]">
                                    {remainingLabels.length}
                                </span>
                            </div>
                            <div className="flex max-h-32 flex-wrap gap-1.5 overflow-y-auto pr-2">
                                {remainingLabels.map((label, idx) => (
                                    <LabelBadge
                                        key={idx}
                                        label={label}
                                        className={badgeClassName}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LabelList;
