import IconButton from '@/Components/Atoms/IconButton/IconButton';
import EmptyStateCard from '@/Components/Molecules/EmptyStateCard/EmptyStateCard';
import { IssueElement } from '@/Components/Molecules/IssueElement/IssueElement';
import { useAlert } from '@/context/AlertContext';
import { IssueTableProps } from '@/types/Components';
import { Issue, Sorting, SortingColumn } from '@/types/Issues';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const IssueTable = ({
    issues,
    activeIssue,
    setActiveIssue,
    queryParams,
    pagination,
}: IssueTableProps) => {
    const { addAlert } = useAlert();

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

    const headers: { label: string; value: SortingColumn }[] = [
        { label: 'ID', value: 'id' },
        { label: 'Title', value: 'title' },
        { label: 'Status', value: 'status' },
        { label: 'Assignee', value: 'assignee' },
        { label: 'Priority', value: 'priority' },
        { label: 'Labels', value: 'labels' },
        { label: 'Updated', value: 'updated' },
    ];

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
            <div className="relative flex max-h-[calc(100vh-240px)] min-h-[300px] flex-1 flex-col overflow-hidden rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] shadow-xl">
                <div className="flex-1 overflow-auto">
                    <table className="w-full min-w-[900px] border-separate border-spacing-0 text-left text-xs">
                        <thead>
                            <tr>
                                <th className="sticky top-0 z-30 w-[48px] border-b border-[var(--bg-light-color)] bg-[var(--bg-color)] px-4 py-3 text-center">
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
                                </th>
                                {headers.map((header) => (
                                    <th
                                        key={header.value}
                                        className={`sticky top-0 z-30 border-b border-[var(--bg-light-color)] bg-[var(--bg-color)] ${header.value === 'id' ? 'w-[70px]' : ''} ${header.value === 'title' ? 'w-[28%]' : ''} ${queryParams !== undefined ? 'cursor-pointer' : ''} group select-none px-4 py-3 text-left font-medium text-zinc-400 transition-colors hover:text-zinc-200`}
                                        onClick={() =>
                                            queryParams !== undefined &&
                                            handleSort(header.value)
                                        }
                                    >
                                        <div className="flex items-center justify-start gap-1.5 text-left">
                                            <span>{header.label}</span>
                                            {queryParams !== undefined &&
                                                renderSortIcon(header.value)}
                                        </div>
                                    </th>
                                ))}
                                <th className="sticky top-0 z-30 w-[50px] border-b border-[var(--bg-light-color)] bg-[var(--bg-color)] px-4 py-3 text-right">
                                    <IconButton
                                        iconName="Settings"
                                        iconSize={13}
                                        className="text-zinc-500 opacity-40 transition-opacity hover:opacity-100"
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
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="p-0">
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
