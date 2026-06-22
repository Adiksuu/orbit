import Icon from '@/Components/Atoms/Icon/Icon';
import React from 'react';
import styles from './DropdownTrigger.module.scss';

interface DropdownTriggerProps {
    label: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

export default function DropdownTrigger({
    label,
    onClick,
    disabled,
}: DropdownTriggerProps) {
    return (
        <button
            type="button"
            className={styles.trigger}
            onClick={onClick}
            disabled={disabled}
        >
            <span className={styles.label}>{label}</span>
            <Icon name={'ChevronDown'} />
        </button>
    );
}
