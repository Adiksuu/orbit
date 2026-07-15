import Icon from '@/Components/Atoms/Icon/Icon';
import { useModal } from '@/context/ModalContext';
import { useShortcuts } from '@/context/ShortcutContext';
import { SelectionDropdownProps } from '@/types/Components';
import { ShortcutDefinition } from '@/types/Shortcuts';
import { cn } from '@/utils/cn';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function SelectionDropdown({
    options,
    selectedValues,
    onChange,
    trigger,
}: SelectionDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState<{ top: number; left: number } | null>(
        null,
    );
    const { getIfAnyModalIsOpened } = useModal();
    console.log(getIfAnyModalIsOpened());

    const updateCoords = useCallback(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom,
                left: rect.right,
            });
        }
    }, []);

    const toggleDropdown = useCallback(() => {
        if (!isOpen) {
            updateCoords();
        }
        setIsOpen(!isOpen);
    }, [isOpen, updateCoords]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('resize', updateCoords);
            // Close on scroll to prevent "floating" away from the trigger
            window.addEventListener('scroll', () => setIsOpen(false), {
                capture: true,
                once: true,
            });
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', updateCoords);
            window.removeEventListener('scroll', () => setIsOpen(false), {
                capture: true,
            });
        };
    }, [isOpen, updateCoords]);

    const shortcuts = useMemo(
        (): ShortcutDefinition[] => [
            {
                key: 'alt+s',
                description: 'Open selection dropdown',
                category: 'Search',
                action: () => {
                    if (!getIfAnyModalIsOpened()) {
                        toggleDropdown();
                    }
                },
            },
        ],
        [getIfAnyModalIsOpened, toggleDropdown],
    );

    useShortcuts(shortcuts);

    return (
        <>
            <div
                ref={triggerRef}
                onClick={toggleDropdown}
                className="cursor-pointer"
            >
                {trigger}
            </div>

            {isOpen &&
                coords &&
                createPortal(
                    <div
                        ref={dropdownRef}
                        style={{
                            position: 'fixed',
                            top: `${coords.top + 8}px`,
                            left: `${coords.left - 224}px`, // 224 is w-56
                            zIndex: 9999,
                        }}
                        className="animate-in fade-in zoom-in-95 w-56 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/95 p-1.5 shadow-2xl backdrop-blur-md duration-100"
                    >
                        <div className="px-2 py-1.5">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                Display Columns
                            </p>
                        </div>
                        <div className="space-y-0.5">
                            {options.map((option) => {
                                if (
                                    option.value === 'sep1' ||
                                    option.value === 'sep2' ||
                                    option.value === 'separator'
                                ) {
                                    return (
                                        <div
                                            key={option.value}
                                            className="my-1 border-t border-zinc-800"
                                        />
                                    );
                                }
                                const isSelected = selectedValues.includes(
                                    option.value,
                                );
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() =>
                                            !option.disabled &&
                                            onChange(option.value)
                                        }
                                        disabled={option.disabled}
                                        className={cn(
                                            'group flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs transition-all duration-200',
                                            isSelected
                                                ? 'bg-[var(--accent-color)]/10 text-zinc-100'
                                                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200',
                                            option.disabled &&
                                                'cursor-default opacity-50 hover:bg-transparent',
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            {option.value !== 'reset_sizes' &&
                                                !option.value.startsWith(
                                                    'row_',
                                                ) && (
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
                                                )}
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
                    </div>,
                    document.body,
                )}
        </>
    );
}
