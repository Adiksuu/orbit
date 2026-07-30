import Badge from '@/Components/Atoms/Badge/Badge';
import Icon from '@/Components/Atoms/Icon/Icon';
import IssueElement from '@/Components/Molecules/IssueElement/IssueElement';
import { BoardColumnProps } from '@/types/Components';
import { icons } from 'lucide-react';

const columnMeta: Record<
    BoardColumnProps['priority'],
    { accent: string; icon: keyof typeof icons; hint: string }
> = {
    high: {
        accent: 'var(--error-color)',
        icon: 'Flame',
        hint: 'Fix immediately',
    },
    medium: {
        accent: 'var(--warning-color)',
        icon: 'Gauge',
        hint: 'Handle soon',
    },
    low: {
        accent: 'var(--success-color)',
        icon: 'Leaf',
        hint: 'When time allows',
    },
};

function BoardColumn({
    issues,
    priority,
    activeIssue,
    setActiveIssue,
}: BoardColumnProps) {
    const meta = columnMeta[priority];
    const openCount = issues.filter(
        (issue) => issue.status !== 'closed',
    ).length;

    return (
        <div className="flex h-full w-[calc(100vw-3.5rem)] flex-shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#141414] shadow-[0_4px_10px_-6px_rgba(0,0,0,0.5)] sm:w-[336px]">
            <div
                className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3.5"
                style={{
                    background: `linear-gradient(180deg, ${meta.accent}12 0%, transparent 100%)`,
                }}
            >
                <div className={'flex w-full items-center justify-between'}>
                    <div className={'flex items-center gap-3'}>
                        <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                            style={{
                                color: meta.accent,
                                backgroundColor: `${meta.accent}1f`,
                            }}
                        >
                            <Icon name={meta.icon} size={17} />
                        </div>
                        <div className="min-w-0">
                            <h3 className="truncate text-[13px] font-semibold capitalize leading-tight text-zinc-100">
                                {priority} Priority
                            </h3>
                            <p className="truncate text-[11px] leading-tight text-zinc-500">
                                {meta.hint}
                            </p>
                        </div>
                    </div>
                    <Badge
                        color={priority}
                        variant="default"
                        className="ml-auto shrink-0 rounded-full font-semibold tabular-nums"
                    >
                        {openCount}
                    </Badge>
                </div>
            </div>
            {issues.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] text-zinc-600">
                        <Icon name="Inbox" size={20} />
                    </div>
                    <span className="text-xs font-medium text-zinc-500">
                        No issues
                    </span>
                </div>
            ) : (
                <div className="no-scrollbar flex flex-1 select-none flex-col gap-2.5 overflow-y-auto p-3">
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
