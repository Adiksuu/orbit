import { BoardCard } from '@/Components/Organisms/BoardCard/BoardCard';
import { ListRow } from '@/Components/Organisms/ListRow/ListRow';
import { IssueElementProps } from '@/types/Components';
import { Issue } from '@/types/Issues';
import { router } from '@inertiajs/react';

export const IssueElement = ({
    issue,
    activeIssue,
    setActiveIssue,
    type = 'list',
    handleSelectIssueCheckbox,
    enabledColumns,
    rowHeight,
}: IssueElementProps) => {
    const removeIssue = (issue: Issue) => {
        router.delete(route('issues.destroy', issue.id));
    };

    const props = {
        issue,
        isActive: activeIssue?.id === issue.id,
        isClosed: issue.status === 'closed',
        onClick: () => setActiveIssue(issue, false),
        onRemove: () => removeIssue(issue),
    };

    return type === 'board' ? (
        <BoardCard {...props} />
    ) : (
        <ListRow
            {...props}
            handleSelectIssueCheckbox={handleSelectIssueCheckbox}
            enabledColumns={enabledColumns}
            rowHeight={rowHeight}
        />
    );
};

export default IssueElement;
