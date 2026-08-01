import Input from '@/Components/Atoms/Input/Input';
import TextArea from '@/Components/Atoms/TextArea/TextArea';
import { EditableTextProps } from '@/types/Components';
import { cn } from '@/utils/cn';
import React, { useEffect, useRef, useState } from 'react';

const EditableText: React.FC<EditableTextProps> = ({
    value,
    onSave,
    placeholder,
    emptyText = 'No content',
    multiline = false,
    as: Tag = 'div',
    displayClassName,
    inputClassName,
    disabled = false,
    renderDisplay,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!isEditing) return;

        const el = multiline ? textareaRef.current : inputRef.current;
        el?.focus();
        el?.setSelectionRange(el.value.length, el.value.length);
    }, [isEditing, multiline]);

    const startEditing = () => {
        if (disabled) return;
        setDraft(value);
        setIsEditing(true);
    };

    const commit = () => {
        setIsEditing(false);
        if (draft !== value) {
            onSave(draft);
        }
    };

    const cancel = () => {
        setDraft(value);
        setIsEditing(false);
    };

    if (isEditing) {
        if (multiline) {
            return (
                <TextArea
                    ref={textareaRef}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={placeholder}
                    className={inputClassName}
                    onBlur={commit}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            e.preventDefault();
                            cancel();
                        }
                    }}
                />
            );
        }

        return (
            <Input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={placeholder}
                className={inputClassName}
                onBlur={commit}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        commit();
                    } else if (e.key === 'Escape') {
                        e.preventDefault();
                        cancel();
                    }
                }}
            />
        );
    }

    return (
        <Tag
            role="button"
            tabIndex={disabled ? -1 : 0}
            onClick={startEditing}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    startEditing();
                }
            }}
            className={cn(!disabled && 'cursor-text', displayClassName)}
        >
            {value ? (
                renderDisplay ? (
                    renderDisplay(value)
                ) : (
                    value
                )
            ) : (
                <span className="italic text-[var(--text-gray-color)]">
                    {placeholder || emptyText}
                </span>
            )}
        </Tag>
    );
};

export default EditableText;
