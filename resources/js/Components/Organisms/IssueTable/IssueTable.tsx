import EmptyStateCard from '@/Components/Molecules/EmptyStateCard/EmptyStateCard';
import { IssueElement } from '@/Components/Molecules/IssueElement/IssueElement';
import { IssueTableProps } from '@/types/Components';

const IssueTable = ({
    issues,
    activeIssue,
    setActiveIssue,
}: IssueTableProps) => {
    const hasIssues = issues && issues.length > 0;

    return (
        <div className="flex-1 overflow-y-auto bg-[var(--bg-color)]">
            <table className="w-full border-collapse text-left text-sm">
                <thead>
                    <tr className="border-b border-solid border-[var(--bg-light-color)]">
                        <th className="w-[100px] px-4 py-3 font-medium text-zinc-400">
                            ID
                        </th>
                        <th className="px-4 py-3 font-medium text-zinc-400">
                            Title
                        </th>
                        <th className="px-4 py-3 font-medium text-zinc-400">
                            Status
                        </th>
                        <th className="px-4 py-3 font-medium text-zinc-400">
                            Assignee
                        </th>
                        <th className="px-4 py-3 font-medium text-zinc-400">
                            Priority
                        </th>
                        <th className="px-4 py-3 font-medium text-zinc-400">
                            Labels
                        </th>
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
