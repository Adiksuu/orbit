import { useCallback, useEffect, useState } from 'react';

export interface SavedFilter {
    id: string;
    name: string;
    filters: Record<string, string>;
    createdAt: number;
}

export const useSavedFilters = (projectId: number | string | undefined) => {
    const storageKey = `orbit_saved_filters_${projectId ?? 'all'}`;

    const [savedFilters, setSavedFilters] = useState<SavedFilter[]>(() => {
        try {
            const saved =
                typeof localStorage !== 'undefined'
                    ? localStorage.getItem(storageKey)
                    : null;
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to parse saved filters', e);
            return [];
        }
    });

    useEffect(() => {
        if (typeof localStorage === 'undefined') return;
        localStorage.setItem(storageKey, JSON.stringify(savedFilters));
    }, [savedFilters, storageKey]);

    const saveFilter = useCallback(
        (name: string, filters: Record<string, string>) => {
            const entry: SavedFilter = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                name,
                filters,
                createdAt: Date.now(),
            };
            setSavedFilters((prev) => [entry, ...prev]);
            return entry;
        },
        [],
    );

    const deleteFilter = useCallback((id: string) => {
        setSavedFilters((prev) => prev.filter((f) => f.id !== id));
    }, []);

    return { savedFilters, saveFilter, deleteFilter };
};
