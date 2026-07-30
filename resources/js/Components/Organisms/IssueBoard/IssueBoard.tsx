import BoardColumn from '@/Components/Molecules/BoardColumn/BoardColumn';
import { BoardCardOverlay } from '@/Components/Organisms/BoardCard/BoardCard';
import { useAlert } from '@/context/AlertContext';
import { BoardColumnMeta, IssueBoardProps } from '@/types/Components';
import { Issue, IssuePriority } from '@/types/Issues';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    DropAnimation,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const dropAnimationConfig: DropAnimation = {
    duration: 220,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
};

const PRIORITY_COLUMNS: BoardColumnMeta[] = [
    {
        id: 'high',
        label: 'High Priority',
        hint: 'Fix immediately',
        accent: 'var(--error-color)',
        icon: 'Flame',
    },
    {
        id: 'medium',
        label: 'Medium Priority',
        hint: 'Handle soon',
        accent: 'var(--warning-color)',
        icon: 'Gauge',
    },
    {
        id: 'low',
        label: 'Low Priority',
        hint: 'When time allows',
        accent: 'var(--success-color)',
        icon: 'Leaf',
    },
];

function IssueBoard({ issues, activeIssue, setActiveIssue }: IssueBoardProps) {
    const { addAlert } = useAlert();
    const [boardIssues, setBoardIssues] = useState<Issue[]>(issues);
    const [draggingIssue, setDraggingIssue] = useState<Issue | null>(null);

    useEffect(() => {
        setBoardIssues(issues);
    }, [issues]);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    );

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

    const grouped = preparePriorityBoard(boardIssues);
    // The count badge only reflects still-active work for a priority bucket —
    // closed issues no longer need attention at that priority.
    const countFor = (columnIssues: Issue[]) =>
        columnIssues.filter((issue) => issue.status !== 'closed').length;

    const handleDragStart = (event: DragStartEvent) => {
        const issue = boardIssues.find((i) => i.id === event.active.id);
        setDraggingIssue(issue ?? null);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setDraggingIssue(null);

        if (!over) return;

        const targetPriority = over.id as IssuePriority;
        const issue = boardIssues.find((i) => i.id === active.id);
        if (!issue || issue.priority === targetPriority) return;

        const previousPriority = issue.priority;

        setBoardIssues((prev) =>
            prev.map((i) =>
                i.id === issue.id ? { ...i, priority: targetPriority } : i,
            ),
        );

        router.patch(
            route('issues.update', issue.id),
            { priority: targetPriority },
            {
                preserveScroll: true,
                preserveState: true,
                onError: () => {
                    setBoardIssues((prev) =>
                        prev.map((i) =>
                            i.id === issue.id
                                ? { ...i, priority: previousPriority }
                                : i,
                        ),
                    );
                    addAlert('Failed to update issue priority', 'error');
                },
            },
        );
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="no-scrollbar flex h-full w-full snap-x snap-mandatory gap-4 overflow-x-auto bg-[var(--bg-color)] p-4 md:gap-5 md:p-6">
                {PRIORITY_COLUMNS.map((column) => {
                    const columnIssues = grouped[column.id as IssuePriority];
                    return (
                        <BoardColumn
                            key={column.id}
                            issues={columnIssues}
                            meta={column}
                            count={countFor(columnIssues)}
                            activeIssue={activeIssue}
                            setActiveIssue={setActiveIssue}
                        />
                    );
                })}
            </div>
            <DragOverlay dropAnimation={dropAnimationConfig}>
                {draggingIssue ? (
                    <BoardCardOverlay
                        issue={draggingIssue}
                        isClosed={draggingIssue.status === 'closed'}
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

export default IssueBoard;
