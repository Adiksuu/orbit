import Icon from '@/Components/Atoms/Icon/Icon';
import { cn } from '@/utils/cn';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface SelectionDropdownProps {
    options: { label: string; value: string }[];
    selectedValues: string[];
    onChange: (value: string) => void;
    trigger: ReactNode;
}

export default function SelectionDropdown({
    options,
    selectedValues,
    onChange,
    trigger,
}: SelectionDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>

            {isOpen && (
                <div className="absolute right-0 z-[100] mt-2 w-56 origin-top-right overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/95 p-1.5 shadow-2xl backdrop-blur-md">
                    <div className="px-2 py-1.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Display Columns
                        </p>
                    </div>
                    <div className="space-y-0.5">
                        {options.map((option) => {
                            const isSelected = selectedValues.includes(
                                option.value,
                            );
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => onChange(option.value)}
                                    className={cn(
                                        'group flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs transition-all duration-200',
                                        isSelected
                                            ? 'bg-[var(--accent-color)]/10 text-zinc-100'
                                            : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200',
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={cn(
                                                'flex h-4 w-4 items-center justify-center rounded border transition-all duration-200',
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
                                        <span className="font-medium">
                                            {option.label}
                                        </span>
                                    </div>
                                    {isSelected && (
                                        <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--accent-color)]" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
