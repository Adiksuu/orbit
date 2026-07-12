import IconButton from '@/Components/Atoms/IconButton/IconButton';
import EmptyStateCard from '@/Components/Molecules/EmptyStateCard/EmptyStateCard';
import { IssueElement } from '@/Components/Molecules/IssueElement/IssueElement';
import { useAlert } from '@/context/AlertContext';
import { IssueTableProps } from '@/types/Components';
import { Sorting, SortingColumn } from '@/types/Issues';
import { router } from '@inertiajs/react';

const IssueTable = ({
    issues,
    activeIssue,
    setActiveIssue,
    queryParams,
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
                iconSize={16}
                className={`inline-block transform transition-transform duration-300 ${
                    isAscending ? 'rotate-180' : 'rotate-0'
                } ${
                    isCurrent
                        ? 'font-bold text-[--accent-color] opacity-100'
                        : 'opacity-20 group-hover:opacity-50'
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

    return (
        <div className="flex-1 overflow-y-auto bg-[var(--bg-color)]">
            <table className="w-full border-collapse text-left text-sm">
                <thead>
                    <tr className="border-b border-solid border-[var(--bg-light-color)]">
                        {headers.map((header) => (
                            <th
                                key={header.value}
                                className={`${header.value === 'id' ? 'w-[100px]' : ''} ${queryParams !== undefined ? 'cursor-pointer' : ''} group select-none px-4 py-3 font-medium text-zinc-400`}
                                onClick={() =>
                                    queryParams !== undefined &&
                                    handleSort(header.value)
                                }
                            >
                                <div className="flex items-center gap-1.5">
                                    <span>{header.label}</span>
                                    {queryParams !== undefined &&
                                        renderSortIcon(header.value)}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hasIssues ? (
                        issues.map((issue) => (
                            <IssueElement
                                key={issue.id}
                                issue={issue}
                                activeIssue={activeIssue}
                                setActiveIssue={setActiveIssue}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="p-0 pt-3">
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
    );
};

export default IssueTable;
