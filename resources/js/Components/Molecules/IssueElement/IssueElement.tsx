import { BoardCard } from '@/Components/Organisms/BoardCard/BoardCard';
import { ListRow } from '@/Components/Organisms/ListRow/ListRow';
import { IssueElementProps } from '@/types/Components';

export const IssueElement = ({
    issue,
    activeIssue,
    setActiveIssue,
    type = 'list',
    handleSelectIssueCheckbox,
    enabledColumns,
    rowHeight,
    isExpanded,
    onToggleExpand,
}: IssueElementProps) => {
    const props = {
        issue,
        isActive: activeIssue?.id === issue.id,
        isClosed: issue.status === 'closed',
        onClick: () => setActiveIssue(issue),
        isExpanded,
        onToggleExpand,
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
