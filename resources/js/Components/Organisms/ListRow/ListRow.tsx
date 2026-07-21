import Badge from '@/Components/Atoms/Badge/Badge';
import DropdownItem from '@/Components/Atoms/DropdownItem/DropdownItem';
import DropdownMenu from '@/Components/Atoms/DropdownMenu/DropdownMenu';
import Icon from '@/Components/Atoms/Icon/Icon';
import IconButton from '@/Components/Atoms/IconButton/IconButton';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import { IssueRowDetail } from '@/Components/Molecules/IssueRowDetail/IssueRowDetail';
import LabelList from '@/Components/Molecules/LabelList/LabelList';
import UserBadge from '@/Components/Molecules/UserBadge/UserBadge';
import { ListRowProps } from '@/types/Components';
import { cn } from '@/utils/cn';
import { formatTimeAgo } from '@/utils/time';
import { listRowVariants, priorityTextColor } from '@/utils/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const tdClass =
    'px-4 border-b border-zinc-800/40 group-last/row:border-b-0 align-middle';

const expandedTdClass =
    'px-4 border-b border-zinc-700/20 align-middle bg-zinc-800/20';

export const ListRow = ({
    issue,
    isActive,
    onClick,
    onModify,
    isClosed,
    handleSelectIssueCheckbox,
    enabledColumns = {
        id: true,
        title: true,
        status: true,
        assignee: true,
        priority: true,
        labels: true,
        updated: true,
        start_date: false,
        end_date: false,
    },
    rowHeight = 44,
    isExpanded,
    onToggleExpand,
}: ListRowProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLTableDataCellElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const handleRowClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
            target.closest('[data-column="checkbox"]') ||
            target.closest('[data-column="actions"]')
        ) {
            return;
        }

        onClick();
    };

    const handleExpandClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleExpand?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onClick();
        }
        if (e.key === ' ') {
            e.preventDefault();
            onToggleExpand?.();
        }
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setMenuPosition({ x: e.clientX, y: e.clientY });
        setIsMenuOpen(true);
    };

    const handleEllipsisClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        setMenuPosition({ x: rect.left, y: rect.bottom });
        setIsMenuOpen(!isMenuOpen);
    };

    const handleAction = (action: () => void) => {
        action();
        setIsMenuOpen(false);
    };

    return (
        <>
            <tr
                onClick={handleRowClick}
                onContextMenu={handleContextMenu}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                className={cn(
                    listRowVariants({ isActive }),
                    'group/row cursor-pointer outline-none focus-visible:bg-zinc-800/50',
                    isExpanded && 'active-row-expanded bg-zinc-800/20',
                )}
                style={{ height: rowHeight }}
            >
                <td
                    className={cn(
                        isExpanded ? expandedTdClass : tdClass,
                        'w-[48px] text-center',
                    )}
                    data-column="expand-and-checkbox"
                >
                    <div className="flex items-center justify-center gap-2">
                        <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className={cn(
                                'rounded-md p-1 transition-colors',
                                isExpanded
                                    ? 'bg-[var(--accent-color)]/10 text-[var(--accent-color)]'
                                    : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200',
                            )}
                            onClick={handleExpandClick}
                            aria-expanded={isExpanded}
                        >
                            <ChevronRight size={14} />
                        </motion.div>
                        <div
                            onClick={(e) => e.stopPropagation()}
                            data-column="checkbox"
                        >
                            <input
                                type="checkbox"
                                className={cn(
                                    'h-3.5 w-3.5 cursor-pointer rounded border-zinc-700 bg-zinc-800/50 text-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] focus:ring-offset-zinc-950',
                                    isClosed
                                        ? 'opacity-20'
                                        : isExpanded
                                          ? 'opacity-100'
                                          : 'opacity-60 group-hover/row:opacity-100',
                                )}
                                checked={issue?.isChecked}
                                onChange={() =>
                                    handleSelectIssueCheckbox &&
                                    handleSelectIssueCheckbox(issue)
                                }
                            />
                        </div>
                    </div>
                </td>
                {enabledColumns.id && (
                    <td
                        className={cn(
                            isExpanded ? expandedTdClass : tdClass,
                            'w-[70px] font-semibold text-[var(--pending-color)]',
                        )}
                        data-column="id"
                    >
                        #{issue.id}
                    </td>
                )}
                {enabledColumns.title && (
                    <td
                        className={cn(
                            isExpanded ? expandedTdClass : tdClass,
                            'truncate pr-4 font-medium',
                            isClosed
                                ? 'text-zinc-500 line-through'
                                : 'text-zinc-200',
                        )}
                        data-column="title"
                    >
                        {issue.title}
                    </td>
                )}
                {enabledColumns.status && (
                    <td
                        className={isExpanded ? expandedTdClass : tdClass}
                        data-column="status"
                    >
                        <Badge
                            color={issue.status}
                            variant="default"
                            className="inline-flex h-6 items-center gap-1.5 rounded-md border border-zinc-700/20 bg-zinc-800/30 px-2 py-0.5 text-[11px] text-zinc-300"
                        >
                            <StatusDot status={issue.status} />
                            {issue.status}
                        </Badge>
                    </td>
                )}
                {enabledColumns.assignee && (
                    <td
                        className={isExpanded ? expandedTdClass : tdClass}
                        data-column="assignee"
                    >
                        <UserBadge
                            avatarSrc={issue.assignee?.avatar}
                            name={issue.assignee?.name ?? 'Unassigned'}
                            size="sm"
                        />
                    </td>
                )}
                {enabledColumns.priority && (
                    <td
                        className={isExpanded ? expandedTdClass : tdClass}
                        data-column="priority"
                    >
                        <Badge
                            color={issue.priority}
                            variant="default"
                            className="inline-flex h-6 items-center gap-1.5 rounded-md border border-zinc-700/20 bg-zinc-800/30 px-2 py-0.5"
                        >
                            <StatusDot status={issue.priority} />
                            <span
                                className={priorityTextColor({
                                    priority: issue.priority as any,
                                })}
                            >
                                {issue.priority}
                            </span>
                        </Badge>
                    </td>
                )}
                {enabledColumns.labels && (
                    <td
                        className={isExpanded ? expandedTdClass : tdClass}
                        data-column="labels"
                    >
                        <LabelList
                            labels={issue.labels || []}
                            badgeClassName="text-[10px] px-1.5 py-0.5"
                            isClosed={isClosed}
                        />
                    </td>
                )}
                {enabledColumns.updated && (
                    <td
                        className={cn(
                            isExpanded ? expandedTdClass : tdClass,
                            'whitespace-nowrap font-medium text-zinc-400',
                        )}
                        data-column="updated"
                    >
                        {formatTimeAgo(issue.updated_at)} ago
                    </td>
                )}
                {enabledColumns.start_date && (
                    <td
                        className={cn(
                            isExpanded ? expandedTdClass : tdClass,
                            'whitespace-nowrap font-medium text-zinc-400',
                        )}
                        data-column="start_date"
                    >
                        {issue.start_date}
                    </td>
                )}
                {enabledColumns.end_date && (
                    <td
                        className={cn(
                            isExpanded ? expandedTdClass : tdClass,
                            'whitespace-nowrap font-medium text-zinc-400',
                        )}
                        data-column="end_date"
                    >
                        {issue.end_date}
                    </td>
                )}
                <td
                    className={cn(
                        isExpanded ? expandedTdClass : tdClass,
                        'text-right',
                    )}
                    onClick={(e) => e.stopPropagation()}
                    data-column="actions"
                    ref={menuRef}
                >
                    <IconButton
                        iconName={'Ellipsis'}
                        onClick={handleEllipsisClick}
                        className={cn(
                            'rounded-md p-1 text-zinc-500 hover:bg-zinc-800/60',
                            isClosed
                                ? 'opacity-20'
                                : isMenuOpen || isExpanded
                                  ? 'opacity-100'
                                  : 'opacity-0 group-hover/row:opacity-100',
                        )}
                    ></IconButton>
                    {isMenuOpen && (
                        <div
                            className="fixed z-[9999] w-48 shadow-2xl"
                            style={{
                                top: `${menuPosition.y}px`,
                                left: `${menuPosition.x > window.innerWidth - 200 ? menuPosition.x - 192 : menuPosition.x}px`,
                            }}
                        >
                            <DropdownMenu>
                                <DropdownItem
                                    label={
                                        <div className="flex items-center gap-2">
                                            <Icon name="Maximize2" size={14} />
                                            <span>Open in modal</span>
                                        </div>
                                    }
                                    onClick={() => handleAction(onClick)}
                                    variant="info"
                                />
                                <DropdownItem
                                    label={
                                        <div className="flex items-center gap-2">
                                            <Icon
                                                name="ExternalLink"
                                                size={14}
                                            />
                                            <span>Open details</span>
                                        </div>
                                    }
                                    onClick={() => handleAction(onClick)}
                                    variant="success"
                                />
                                <DropdownItem
                                    label={
                                        <div className="flex items-center gap-2">
                                            <Icon name="Pencil" size={14} />
                                            <span>Modify</span>
                                        </div>
                                    }
                                    onClick={() =>
                                        onModify && handleAction(onModify)
                                    }
                                    variant="warning"
                                />
                                <div className="my-1 border-t border-zinc-800/50" />
                                <DropdownItem
                                    label={
                                        <div className="flex items-center gap-2">
                                            <Icon name="Trash2" size={14} />
                                            <span>Remove</span>
                                        </div>
                                    }
                                    disabled
                                    variant="danger"
                                />
                            </DropdownMenu>
                        </div>
                    )}
                </td>
            </tr>
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <tr className="bg-zinc-800/10">
                        <td
                            colSpan={100}
                            className="border-b border-zinc-700/30 p-0"
                        >
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.25,
                                    ease: [0.23, 1, 0.32, 1],
                                }}
                                className="w-full overflow-hidden"
                            >
                                <div className="inline-block min-w-full">
                                    <IssueRowDetail
                                        issue={issue}
                                        onOpenDetails={() => onClick()}
                                    />
                                </div>
                            </motion.div>
                        </td>
                    </tr>
                )}
            </AnimatePresence>
        </>
    );
};
