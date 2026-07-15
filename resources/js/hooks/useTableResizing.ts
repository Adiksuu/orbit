import { useCallback, useEffect, useRef, useState } from 'react';

interface SizingConfig {
    columnWidths: Record<string, number>;
    rowHeight: number;
}

export const useTableResizing = (
    projectId: number | string | undefined,
    defaultWidths: Record<string, number>,
) => {
    const storageKey = `orbit_table_sizing_${projectId}`;

    const [config, setConfig] = useState<SizingConfig>(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Merge with default widths to ensure new columns have a width
                return {
                    ...parsed,
                    columnWidths: { ...defaultWidths, ...parsed.columnWidths },
                };
            } catch (e) {
                console.error('Failed to parse table sizing config', e);
            }
        }
        return {
            columnWidths: defaultWidths,
            rowHeight: 44, // Default comfortable height
        };
    });

    const debouncedSave = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!projectId) return;

        if (debouncedSave.current) {
            clearTimeout(debouncedSave.current);
        }
        debouncedSave.current = setTimeout(() => {
            localStorage.setItem(storageKey, JSON.stringify(config));
        }, 500);

        return () => {
            if (debouncedSave.current) {
                clearTimeout(debouncedSave.current);
            }
        };
    }, [config, storageKey, projectId]);

    const updateColumnWidth = useCallback((column: string, width: number) => {
        const clampedWidth = Math.max(80, Math.min(800, width));
        setConfig((prev) => ({
            ...prev,
            columnWidths: {
                ...prev.columnWidths,
                [column]: clampedWidth,
            },
        }));
    }, []);

    const updateRowHeight = useCallback((height: number) => {
        const clampedHeight = Math.max(32, Math.min(120, height));
        setConfig((prev) => ({
            ...prev,
            rowHeight: clampedHeight,
        }));
    }, []);

    const resetWidths = useCallback(() => {
        setConfig((prev) => ({
            ...prev,
            columnWidths: defaultWidths,
        }));
    }, [defaultWidths]);

    return {
        columnWidths: config.columnWidths,
        rowHeight: config.rowHeight,
        updateColumnWidth,
        updateRowHeight,
        resetWidths,
    };
};
