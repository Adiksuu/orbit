import Badge from '@/Components/Atoms/Badge/Badge';
import { IssueLabel } from '@/types/Issues';
import { cn } from '@/utils/cn';
import React, { useEffect, useRef, useState } from 'react';

interface LabelListProps {
    labels: IssueLabel[];
    variant?: 'default' | 'outline' | 'ghost';
    badgeClassName?: string;
}

const LabelList: React.FC<LabelListProps> = ({
    labels,
    variant = 'default',
    badgeClassName,
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
                <Badge
                    key={idx}
                    color={label}
                    variant={variant}
                    tooltip={true}
                    className={badgeClassName}
                >
                    {label}
                </Badge>
            ))}
            {remainingLabels.length > 0 && (
                <div className="relative">
                    <Badge
                        variant={variant}
                        className={cn(
                            'cursor-pointer transition-colors hover:bg-zinc-700',
                            badgeClassName,
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                    >
                        +{remainingLabels.length}
                    </Badge>
                    {isOpen && (
                        <div className="absolute bottom-[calc(100%+8px)] left-0 z-[100] flex max-h-48 min-w-[140px] flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900/95 p-3 shadow-2xl backdrop-blur-md">
                            <div className="mb-1 flex items-center justify-between border-b border-zinc-800 pb-2">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                                    More Labels
                                </span>
                                <span className="text-[10px] font-medium text-zinc-400">
                                    {remainingLabels.length}
                                </span>
                            </div>
                            <div className="scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent flex max-h-32 flex-wrap gap-1.5 overflow-y-scroll pr-2">
                                {remainingLabels.map((label, idx) => (
                                    <Badge
                                        key={idx}
                                        color={label}
                                        variant={variant}
                                        tooltip={false}
                                        className={cn(
                                            'hover:brightness-110',
                                            badgeClassName,
                                        )}
                                    >
                                        {label}
                                    </Badge>
                                ))}
                            </div>
                            <div className="absolute -bottom-1.5 left-4 h-3 w-3 rotate-45 border-b border-r border-zinc-800 bg-zinc-900/95"></div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LabelList;
