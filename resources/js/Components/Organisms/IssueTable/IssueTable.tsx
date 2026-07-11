import IconButton from '@/Components/Atoms/IconButton/IconButton';
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
                            <div className="flex items-center gap-1.5">
                                <span>ID</span>
                                <IconButton iconName="ArrowUp" iconSize={16} />
                            </div>
                        </th>
                        <th className="px-4 py-3 font-medium text-zinc-400">
                            <div className="flex items-center gap-1.5">
                                <span>Title</span>
                                <IconButton iconName="ArrowUp" iconSize={16} />
                            </div>
                        </th>
                        <th className="px-4 py-3 font-medium text-zinc-400">
                            <div className="flex items-center gap-1.5">
                                <span>Status</span>
                                <IconButton iconName="ArrowUp" iconSize={16} />
                            </div>
                        </th>
                        <th className="px-4 py-3 font-medium text-zinc-400">
                            <div className="flex items-center gap-1.5">
                                <span>Assignee</span>
                                <IconButton iconName="ArrowUp" iconSize={16} />
                            </div>
                        </th>
                        <th className="px-4 py-3 font-medium text-zinc-400">
                            <div className="flex items-center gap-1.5">
                                <span>Priority</span>
                                <IconButton iconName="ArrowUp" iconSize={16} />
                            </div>
                        </th>
                        <th className="px-4 py-3 font-medium text-zinc-400">
                            <div className="flex items-center gap-1.5">
                                <span>Labels</span>
                                <IconButton iconName="ArrowUp" iconSize={16} />
                            </div>
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
