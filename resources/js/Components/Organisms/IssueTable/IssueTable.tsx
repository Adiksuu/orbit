import IconButton from '@/Components/Atoms/IconButton/IconButton';
import EmptyStateCard from '@/Components/Molecules/EmptyStateCard/EmptyStateCard';
import { IssueElement } from '@/Components/Molecules/IssueElement/IssueElement';
import SelectionDropdown from '@/Components/Molecules/SelectionDropdown/SelectionDropdown';
import { useAlert } from '@/context/AlertContext';
import { useTableResizing } from '@/hooks/useTableResizing';
import { IssueTableProps } from '@/types/Components';
import { Issue, Sorting, SortingColumn } from '@/types/Issues';
import { router } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';

const IssueTable = ({
    issues,
    activeIssue,
    setActiveIssue,
    queryParams,
    pagination,
    project,
}: IssueTableProps) => {
    const { addAlert } = useAlert();
    const tableRef = useRef<HTMLTableElement>(null);

    const defaultWidths = {
        id: 70,
        title: 400,
        status: 120,
        assignee: 140,
        priority: 140,
        labels: 200,
        updated: 150,
        start_date: 150,
        end_date: 150,
    };

    const {
        columnWidths,
        rowHeight,
        updateColumnWidth,
        updateRowHeight,
        resetWidths,
    } = useTableResizing(project?.id, defaultWidths);

    const resolvedColumnWidths = Object.keys(defaultWidths).reduce(
        (acc, key) => {
            acc[key] =
                columnWidths[key] ||
                defaultWidths[key as keyof typeof defaultWidths];
            return acc;
        },
        {} as Record<string, number>,
    );

    const [isResizing, setIsResizing] = useState<string | null>(null);
    const [isResizingHeight, setIsResizingHeight] = useState(false);
    const [expandedIssueId, setExpandedIssueId] = useState<string | null>(null);

    const handleMouseDown = (column: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(column);
    };

    const handleHeightMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizingHeight(true);
    };

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isResizing) {
                const th = document.querySelector(
                    `th[data-column="${isResizing}"]`,
                );
                if (th) {
                    const rect = th.getBoundingClientRect();
                    const newWidth = e.clientX - rect.left;
                    updateColumnWidth(isResizing, newWidth);
                }
            }
            if (isResizingHeight) {
                // Find any row to measure
                const tr = tableRef.current?.querySelector('tbody tr');
                if (tr) {
                    const rect = tr.getBoundingClientRect();
                    const newHeight = e.clientY - rect.top;
                    updateRowHeight(newHeight);
                }
            }
        },
        [isResizing, isResizingHeight, updateColumnWidth, updateRowHeight],
    );

    const handleMouseUp = useCallback(() => {
        setIsResizing(null);
        setIsResizingHeight(false);
    }, []);

    useEffect(() => {
        if (isResizing || isResizingHeight) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, isResizingHeight, handleMouseMove, handleMouseUp]);

    const handleDoubleClick = (column: string) => {
        if (!tableRef.current) return;

        // Auto-fit logic
        const cells = tableRef.current.querySelectorAll(
            `td[data-column="${column}"]`,
        );
        let maxWidth = 80;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
            context.font =
                '12px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

            cells.forEach((cell) => {
                const text = (cell as HTMLElement).innerText;
                const metrics = context.measureText(text);
                maxWidth = Math.max(maxWidth, metrics.width + 48); // Adding padding
            });
        }

        updateColumnWidth(column, maxWidth);
    };

    const [enabledColumns, setEnabledColumns] = useState<
        Record<string, boolean>
    >(() => {
        if (project?.columns) {
            return project.columns;
        }
        return {
            id: true,
            title: true,
            status: true,
            assignee: true,
            priority: true,
            labels: true,
            updated: true,
            start_date: false,
            end_date: false,
        };
    });

    useEffect(() => {
        if (project?.columns) {
            setEnabledColumns(project.columns);
        }
    }, [project?.columns]);

    const handleColumnToggle = (columnValue: string) => {
        if (columnValue === 'reset_sizes') {
            resetWidths();
            addAlert('Column sizes reset', 'information');
            return;
        }

        if (columnValue === 'row_compact') {
            updateRowHeight(32);
            addAlert('Row height: Compact', 'information');
            return;
        }
        if (columnValue === 'row_comfortable') {
            updateRowHeight(44);
            addAlert('Row height: Comfortable', 'information');
            return;
        }
        if (columnValue === 'row_spacious') {
            updateRowHeight(64);
            addAlert('Row height: Spacious', 'information');
            return;
        }

        const nextEnabled = {
            ...enabledColumns,
            [columnValue]: !enabledColumns[columnValue],
        };

        setEnabledColumns(nextEnabled);

        if (project) {
            router.patch(
                `/projects/${project.id}/columns`,
                {
                    columns: nextEnabled,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        addAlert('Table columns updated', 'information');
                    },
                },
            );
        }
    };

    const hasIssues = issues && issues.length > 0;

    const currentSort = queryParams?.sort as SortingColumn | undefined;
    const currentDirection = queryParams?.direction as Sorting | undefined;

    const handleSort = (column: SortingColumn) => {
        let nextDirection: Sorting = 'AZ';

        if (currentSort === column) {
            nextDirection = currentDirection === 'AZ' ? 'ZA' : 'AZ';
        }

        const { page, ...restParams } = queryParams || {};

        const newParams = {
            ...restParams,
            sort: column,
            direction: nextDirection,
        };

        router.get(window.location.pathname, newParams, {
            preserveState: true,
            replace: true,
        });
        addAlert(
            `Sorting by ${column} ${nextDirection === 'AZ' ? 'ascending' : 'descending'}`,
            'information',
        );
    };

    const renderSortIcon = (column: SortingColumn) => {
        const isCurrent = currentSort === column;
        const isAscending = isCurrent && currentDirection === 'AZ';

        return (
            <IconButton
                iconName="ArrowDown"
                iconSize={13}
                className={`inline-block transform transition-transform duration-200 ${
                    isAscending ? 'rotate-180' : 'rotate-0'
                } ${
                    isCurrent
                        ? 'font-bold text-[--accent-color] opacity-100'
                        : 'opacity-0 transition-opacity group-hover:opacity-40'
                } `}
            />
        );
    };

    const headers = (
        [
            { label: 'ID', value: 'id' },
            { label: 'Title', value: 'title' },
            { label: 'Status', value: 'status' },
            { label: 'Assignee', value: 'assignee' },
            { label: 'Priority', value: 'priority' },
            { label: 'Labels', value: 'labels' },
            { label: 'Updated', value: 'updated' },
            { label: 'Start', value: 'start_date' },
            { label: 'End', value: 'end_date' },
        ] as { label: string; value: SortingColumn }[]
    ).filter((h) => enabledColumns[h.value]);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelectIssueCheckbox = (issue: Issue | string) => {
        if (issue === 'all') {
            if (selectedIds.length === issues.length && issues.length > 0) {
                setSelectedIds([]);
            } else {
                setSelectedIds(issues.map((i) => i.id));
            }
        } else {
            const issueId = typeof issue === 'string' ? issue : issue.id;
            setSelectedIds((prev) =>
                prev.includes(issueId)
                    ? prev.filter((id) => id !== issueId)
                    : [...prev, issueId],
            );
        }
    };

    return (
        <div className="flex w-full flex-1 flex-col overflow-hidden bg-[var(--bg-color)] px-4 py-2">
            <div className="relative flex max-h-[calc(100vh-240px)] flex-col overflow-y-hidden rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] shadow-xl">
                <div className="flex-1 overflow-x-auto">
                    <table
                        ref={tableRef}
                        className="w-full table-fixed border-separate border-spacing-0 text-left text-xs"
                    >
                        <thead>
                            <tr>
                                <th className="group/rowheader sticky top-0 z-30 w-[48px] border-b border-[var(--bg-light-color)] bg-[var(--bg-color)] px-4 py-3 text-center">
                                    <input
                                        type="checkbox"
                                        className="h-3.5 w-3.5 cursor-pointer rounded border-zinc-700 bg-zinc-800/50 text-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] focus:ring-offset-zinc-950"
                                        onChange={() =>
                                            handleSelectIssueCheckbox('all')
                                        }
                                        checked={
                                            issues.length > 0 &&
                                            issues.every((issue) =>
                                                selectedIds.includes(issue.id),
                                            )
                                        }
                                    />
                                    <div
                                        className={`absolute bottom-0 left-0 h-1 w-full cursor-row-resize transition-colors hover:bg-[var(--accent-color)] ${isResizingHeight ? 'h-1 bg-[var(--accent-color)]' : 'bg-transparent'}`}
                                        onMouseDown={handleHeightMouseDown}
                                    />
                                </th>
                                {headers.map((header) => (
                                    <th
                                        key={header.value}
                                        data-column={header.value}
                                        style={{
                                            width: resolvedColumnWidths[
                                                header.value
                                            ],
                                        }}
                                        className={`sticky top-0 z-30 border-b border-[var(--bg-light-color)] bg-[var(--bg-color)] ${queryParams !== undefined ? 'cursor-pointer' : ''} group relative select-none px-4 py-3 text-left font-medium text-zinc-400 transition-colors hover:text-zinc-200`}
                                        onClick={() =>
                                            queryParams !== undefined &&
                                            handleSort(header.value)
                                        }
                                    >
                                        <div className="flex items-center justify-start gap-1.5 text-left">
                                            <span className="truncate">
                                                {header.label}
                                            </span>
                                            {queryParams !== undefined &&
                                                renderSortIcon(header.value)}
                                        </div>
                                        <div
                                            className={`absolute right-0 top-0 h-full w-1 cursor-col-resize transition-colors hover:bg-[var(--accent-color)] ${isResizing === header.value ? 'w-1 bg-[var(--accent-color)]' : 'bg-transparent'}`}
                                            onMouseDown={(e) =>
                                                handleMouseDown(header.value, e)
                                            }
                                            onDoubleClick={() =>
                                                handleDoubleClick(header.value)
                                            }
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </th>
                                ))}
                                <th
                                    className="sticky top-0 z-30 border-b border-[var(--bg-light-color)] bg-[var(--bg-color)]"
                                    aria-hidden="true"
                                />
                                <th className="sticky top-0 z-30 w-[50px] border-b border-[var(--bg-light-color)] bg-[var(--bg-color)] px-4 py-3 text-right">
                                    <SelectionDropdown
                                        options={[
                                            {
                                                label: 'Reset Column Sizes',
                                                value: 'reset_sizes',
                                            },
                                            {
                                                label: '---',
                                                value: 'sep1',
                                                disabled: true,
                                            },
                                            {
                                                label: 'Row: Compact',
                                                value: 'row_compact',
                                            },
                                            {
                                                label: 'Row: Comfortable',
                                                value: 'row_comfortable',
                                            },
                                            {
                                                label: 'Row: Spacious',
                                                value: 'row_spacious',
                                            },
                                            {
                                                label: '---',
                                                value: 'sep2',
                                                disabled: true,
                                            },
                                            { label: 'ID', value: 'id' },
                                            { label: 'Title', value: 'title' },
                                            {
                                                label: 'Status',
                                                value: 'status',
                                            },
                                            {
                                                label: 'Assignee',
                                                value: 'assignee',
                                            },
                                            {
                                                label: 'Priority',
                                                value: 'priority',
                                            },
                                            {
                                                label: 'Labels',
                                                value: 'labels',
                                            },
                                            {
                                                label: 'Updated',
                                                value: 'updated',
                                            },
                                            {
                                                label: 'Start Date',
                                                value: 'start_date',
                                            },
                                            {
                                                label: 'End Date',
                                                value: 'end_date',
                                            },
                                        ]}
                                        selectedValues={[
                                            ...Object.entries(enabledColumns)
                                                .filter(([_, v]) => v)
                                                .map(([k]) => k),
                                            rowHeight === 32
                                                ? 'row_compact'
                                                : rowHeight === 44
                                                  ? 'row_comfortable'
                                                  : rowHeight === 64
                                                    ? 'row_spacious'
                                                    : '',
                                        ]}
                                        onChange={handleColumnToggle}
                                        trigger={
                                            <IconButton
                                                iconName="Settings"
                                                iconSize={13}
                                                className="text-zinc-500 opacity-40 transition-opacity hover:opacity-100"
                                            />
                                        }
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {hasIssues ? (
                                issues.map((issue) => (
                                    <IssueElement
                                        key={issue.id}
                                        issue={{
                                            ...issue,
                                            isChecked: selectedIds.includes(
                                                issue.id,
                                            ),
                                        }}
                                        activeIssue={activeIssue}
                                        setActiveIssue={setActiveIssue}
                                        handleSelectIssueCheckbox={
                                            handleSelectIssueCheckbox
                                        }
                                        enabledColumns={enabledColumns}
                                        rowHeight={rowHeight}
                                        isExpanded={expandedIssueId === issue.id}
                                        onToggleExpand={() =>
                                            setExpandedIssueId(
                                                expandedIssueId === issue.id
                                                    ? null
                                                    : issue.id,
                                            )
                                        }
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={headers.length + 3}
                                        className="p-0"
                                    >
                                        <EmptyStateCard
                                            title={'All done!'}
                                            description={
                                                'No issues found in this view. Everything is completed or no tasks have been assigned yet.'
                                            }
                                            iconName={'FolderPlus'}
                                        />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {pagination}
            </div>
        </div>
    );
};

export default IssueTable;
