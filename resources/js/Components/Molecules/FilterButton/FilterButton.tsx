import { icons } from 'lucide-react';
import React from 'react';
import Icon from '../../Atoms/Icon/Icon';

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
        <button
            className={
                'flex cursor-pointer items-center gap-1.5 rounded-md border border-dashed border-[var(--bg-light-color)] bg-transparent px-2.5 py-1 text-sm text-zinc-400 transition-all duration-100 ease-in-out hover:border-solid hover:bg-[var(--bg-light-color)] hover:text-white'
            }
            onClick={onClick}
        >
            {icon && <Icon name={icon} size={14} color="#999" />}
            <span className={'font-normal'}>{label}</span>
            {value && <span className={'font-medium text-white'}>{value}</span>}
            <Icon name="ChevronDown" size={12} color="#999" />
        </button>
    );
};

export default FilterButton;
