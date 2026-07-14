import BoardColumn from '@/Components/Molecules/BoardColumn/BoardColumn';
import { IssueBoardProps } from '@/types/Components';
import { Issue, IssuePriority } from '@/types/Issues';

function IssueBoard({ issues, activeIssue, setActiveIssue }: IssueBoardProps) {
    const preparePriorityBoard = (issues: Issue[]) => {
        const board: Record<IssuePriority, Issue[]> = {
            high: [],
            medium: [],
            low: [],
        };

        issues.forEach((issue: Issue) => {
            if (board[issue.priority]) {
                board[issue.priority].push(issue);
            }
        });

        return board;
    };

    return (
        <div className="flex h-full w-full snap-x snap-mandatory gap-4 overflow-x-auto bg-[var(--bg-color)] p-4 md:p-6">
            <BoardColumn
                issues={preparePriorityBoard(issues).high}
                priority="high"
                activeIssue={activeIssue}
                setActiveIssue={setActiveIssue}
            />
            <BoardColumn
                issues={preparePriorityBoard(issues).medium}
                priority="medium"
                activeIssue={activeIssue}
                setActiveIssue={setActiveIssue}
            />
            <BoardColumn
                issues={preparePriorityBoard(issues).low}
                priority="low"
                activeIssue={activeIssue}
                setActiveIssue={setActiveIssue}
            />
        </div>
    );
}

export default IssueBoard;
