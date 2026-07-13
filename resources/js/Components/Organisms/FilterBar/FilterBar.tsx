import Badge from '@/Components/Atoms/Badge/Badge';
import Icon from '@/Components/Atoms/Icon/Icon';
import Input from '@/Components/Atoms/Input/Input';
import { router } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import FilterButton from '../../Molecules/FilterButton/FilterButton';

interface FilterBarProps {
    queryParams?: Record<string, any>;
}

const FilterBar: React.FC<FilterBarProps> = ({ queryParams = {} }) => {
    const [searchQuery, setSearchQuery] = useState(queryParams?.search || '');
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setSearchQuery(queryParams?.search || '');
    }, [queryParams?.search]);

    const activeFilterCount = Object.keys(queryParams || {}).filter((key) =>
        ['labels', 'status', 'assignee', 'priority'].includes(key),
    ).length;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('global-search-input')?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        router.get(
            window.location.pathname,
            { ...queryParams, search: value, page: 1 },
            { preserveState: true, replace: true },
        );
    };

    const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            input?.current?.blur();
        }
    };

    return (
        <div className="sticky top-0 z-40 flex w-full flex-col gap-3 border-b border-solid border-zinc-800 bg-[var(--bg-color)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center">
                <div className="relative flex w-full max-w-md items-center rounded-lg border border-zinc-800 bg-zinc-900/30 px-3 py-1.5 transition-all duration-150 focus-within:border-zinc-700 focus-within:bg-zinc-900/60 focus-within:ring-1 focus-within:ring-zinc-700">
                    <Icon name={'Search'} />
                    <Input
                        id="global-search-input"
                        type="text"
                        placeholder="Search issue title, ID, labels..."
                        value={searchQuery}
                        onChange={handleSearch}
                        onKeyDown={handleSearchSubmit}
                        variant={'modal'}
                        ref={input}
                        className="ml-2.5 w-full border-none bg-transparent p-0 text-sm text-zinc-200 placeholder-zinc-500 shadow-none outline-none ring-0 focus:border-none focus:outline-none focus:ring-0"
                    />
                    <div className="hidden select-none items-center gap-1 pl-2 sm:flex">
                        <Badge tooltip={true} tooltipText={'Control + K'}>
                            ⌘ K
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <div className="flex shrink-0 items-center gap-2 pl-1">
                    <FilterButton
                        icon="ListFilter"
                        label={`Filters ${activeFilterCount > 0 ? `(${activeFilterCount})` : ''}`}
                    />
                    <div className="hidden items-center gap-2 lg:flex">
                        <FilterButton label="Labels" />
                        <FilterButton label="Status" />
                        <FilterButton label="Assignee" />
                        <FilterButton label="Priority" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
