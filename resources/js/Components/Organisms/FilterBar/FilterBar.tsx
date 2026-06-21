import React from 'react';
import FilterButton from '../../Molecules/FilterButton/FilterButton';
import styles from './FilterBar.module.scss';

const FilterBar: React.FC = () => {
    return (
        <div className={styles.filterBar}>
            <FilterButton icon="ListFilter" label="Filter" />
            <FilterButton label="Labels" />
            <FilterButton label="Status" />
            <FilterButton label="Assignee" />
            <FilterButton label="Priority" />
        </div>
    );
};

export default FilterBar;
