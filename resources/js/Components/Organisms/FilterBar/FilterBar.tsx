import React from 'react';
import Icon from '../../Atoms/Icon/Icon';
import FilterButton from '../../Molecules/FilterButton/FilterButton';
import styles from './FilterBar.module.scss';

const FilterBar: React.FC = () => {
    return (
        <div className={styles.filterBar}>
            <div className={styles.left}>
                <FilterButton icon="ListFilter" label="Filter" />
                <FilterButton label="Labels" />
                <FilterButton label="Status" />
                <FilterButton label="Assignee" />
                <FilterButton label="Priority" />
            </div>
            <div className={styles.right}>
                <button className={styles.saveView}>
                    <Icon name="Save" size={14} color="#999" />
                    <span>Save view</span>
                </button>
            </div>
        </div>
    );
};

export default FilterBar;
