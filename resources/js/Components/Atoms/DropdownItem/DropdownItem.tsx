import React from 'react';
import styles from './DropdownItem.module.scss';

interface DropdownItemProps {
    label: React.ReactNode;
    onClick: () => void;
    isActive?: boolean;
}

export default function DropdownItem({
    label,
    onClick,
    isActive,
}: DropdownItemProps) {
    return (
        <button
            type="button"
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
