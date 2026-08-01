import DropdownItem from '@/Components/Atoms/DropdownItem/DropdownItem';
import DropdownMenu from '@/Components/Atoms/DropdownMenu/DropdownMenu';
import { EditableSelectProps } from '@/types/Components';
import { cn } from '@/utils/cn';
import React, { useEffect, useRef, useState } from 'react';

const EditableSelect: React.FC<EditableSelectProps> = ({
    value,
    options,
    onSave,
    renderValue,
    disabled = false,
    className,
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

    const selected = options.find((option) => option.value === value);

    return (
        <div className={cn('relative w-fit', className)} ref={containerRef}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-[var(--bg-light-color)] disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
                {renderValue ? renderValue(value) : (selected?.label ?? value)}
            </button>
            {isOpen && (
                <DropdownMenu>
                    {options.map((option) => (
                        <DropdownItem
                            key={option.value}
                            label={option.label}
                            isActive={option.value === value}
                            onClick={() => {
                                setIsOpen(false);
                                if (option.value !== value) {
                                    onSave(option.value);
                                }
                            }}
                        />
                    ))}
                </DropdownMenu>
            )}
        </div>
    );
};

export default EditableSelect;
