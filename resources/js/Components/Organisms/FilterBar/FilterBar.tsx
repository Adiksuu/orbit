import React from 'react';
import FilterButton from '../../Molecules/FilterButton/FilterButton';

const FilterBar: React.FC = () => {
    return (
        <div
            className={
                'flex items-center justify-start gap-2 overflow-x-auto border-b border-solid border-[var(--bg-light-color)] px-4 py-3'
            }
        >
            <FilterButton icon="ListFilter" label="Filter" />
            <FilterButton label="Labels" />
            <FilterButton label="Status" />
            <FilterButton label="Assignee" />
            <FilterButton label="Priority" />
        </div>
    );
};

export default FilterBar;
