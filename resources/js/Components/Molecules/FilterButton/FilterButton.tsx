import { icons } from 'lucide-react';
import React from 'react';
import Icon from '../../Atoms/Icon/Icon';
import styles from './FilterButton.module.scss';

interface FilterButtonProps {
    icon?: keyof typeof icons;
    label: string;
    value?: string;
    onClick?: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
    icon,
    label,
    value,
    onClick,
}) => {
    return (
        <button className={styles.filterButton} onClick={onClick}>
            {icon && <Icon name={icon} size={14} color="#999" />}
            <span className={styles.label}>{label}</span>
            {value && <span className={styles.value}>{value}</span>}
            <Icon name="ChevronDown" size={12} color="#999" />
        </button>
    );
};

export default FilterButton;
