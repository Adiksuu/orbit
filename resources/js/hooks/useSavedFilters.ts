import { router } from '@inertiajs/react';
import { useCallback } from 'react';

export interface SavedFilter {
    id: number;
    project_id: number;
    name: string;
    context: string;
    query_params: Record<string, any>;
    created_at?: string;
}

export const useSavedFilters = (
    initialSavedFilters: SavedFilter[] = [],
    projectId?: number | string,
) => {
    const context = projectId ? `project_${projectId}` : 'project_issues';

    const saveFilter = useCallback(
        (name: string, queryParams: Record<string, any>) => {
            if (!projectId) {
                console.error('SavedFilterError: Lack of projectId');
                return;
            }

            router.post(
                '/saved-filters',
                {
                    project_id: projectId,
                    name,
                    context,
                    query_params: queryParams,
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    onError: (errors) => {
                        console.error('Validation errors:', errors);
                    },
                },
            );
        },
        [projectId, context],
    );

    const deleteFilter = useCallback((id: number) => {
        router.delete(`/saved-filters/${id}`, {
            preserveScroll: true,
            preserveState: true,
        });
    }, []);

    return { savedFilters: initialSavedFilters, saveFilter, deleteFilter };
};
