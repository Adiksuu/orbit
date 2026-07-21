import Badge from '@/Components/Atoms/Badge/Badge';
import Icon from '@/Components/Atoms/Icon/Icon';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import IssueElement from '@/Components/Molecules/IssueElement/IssueElement';
import { BoardColumnProps } from '@/types/Components';

function BoardColumn({
    issues,
    priority,
    activeIssue,
    setActiveIssue,
}: BoardColumnProps) {
    return (
        <div className="flex h-full w-[calc(100vw-3.5rem)] flex-shrink-0 snap-center flex-col rounded-xl border border-zinc-800/60 bg-[#121212] p-3 shadow-lg shadow-black/20 sm:w-[310px]">
            <div className="mb-3.5 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <StatusDot status={priority} size="sm" />
                    <h3 className="text-sm font-semibold capitalize text-zinc-200">
                        {priority} Priority
                    </h3>
                    <Badge className={'rounded-full'}>
                        {
                            issues.filter((issue) => issue.status !== 'closed')
                                .length
                        }
                    </Badge>
                </div>
            </div>
            {issues.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800/30 p-6 text-center">
                    <div className="text-zinc-650 rounded-full bg-zinc-900/50 p-2">
                        <Icon name="Inbox" size={20} color="currentColor" />
                    </div>
                    <span className="mt-2 text-xs font-medium text-zinc-500">
                        No issues
                    </span>
                </div>
            ) : (
                <div className="flex flex-1 select-none flex-col gap-2.5 overflow-y-auto pr-1">
                    {issues.map((issue) => (
                        <IssueElement
                            key={issue.id}
                            issue={issue}
                            activeIssue={activeIssue}
                            setActiveIssue={setActiveIssue}
                            type="board"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default BoardColumn;
