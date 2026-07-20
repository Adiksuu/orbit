import Icon from '@/Components/Atoms/Icon/Icon';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import { CalendarViewProps } from '@/types/Components';
import { Issue } from '@/types/Issues';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';

const CalendarView: React.FC<CalendarViewProps> = ({
    issues,
    activeIssue,
    setActiveIssue,
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const daysInMonth = (year: number, month: number) =>
        new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) =>
        new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const calendarDays = useMemo(() => {
        const days = [];
        const prevMonthDays = daysInMonth(year, month - 1);
        const firstDay = firstDayOfMonth(year, month);

        // Prev month padding
        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({
                day: prevMonthDays - i,
                month: month - 1,
                year,
                isCurrentMonth: false,
                dateKey: `${year}-${String(month).padStart(2, '0')}-${String(prevMonthDays - i).padStart(2, '0')}`,
            });
        }

        // Current month
        const count = daysInMonth(year, month);
        for (let i = 1; i <= count; i++) {
            days.push({
                day: i,
                month,
                year,
                isCurrentMonth: true,
                dateKey: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
            });
        }

        // Next month padding
        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) {
            days.push({
                day: i,
                month: month + 1,
                year,
                isCurrentMonth: false,
                dateKey: `${year}-${String(month + 2).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
            });
        }
        return days;
    }, [year, month]);

    const issuesByDate = useMemo(() => {
        const map: Record<string, Issue[]> = {};
        issues.forEach((issue) => {
            if (issue.start_date) {
                const date = issue.start_date;
                if (!map[date]) map[date] = [];
                map[date].push(issue);
            }
        });
        return map;
    }, [issues]);

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const goToToday = () => setCurrentDate(new Date());

    return (
        <div className="flex h-full flex-col bg-[var(--bg-color)] p-6">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-white">
                        {monthNames[month]}{' '}
                        <span className="font-medium text-zinc-500">
                            {year}
                        </span>
                    </h2>
                    <div className="flex items-center gap-1 rounded-xl border border-white/[0.05] bg-white/[0.03] p-1">
                        <button
                            onClick={prevMonth}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-all hover:bg-white/[0.05] hover:text-white"
                        >
                            <Icon name="ChevronLeft" size={18} />
                        </button>
                        <button
                            onClick={goToToday}
                            className="px-3 py-1 text-xs font-semibold text-zinc-400 transition-all hover:text-white"
                        >
                            Today
                        </button>
                        <button
                            onClick={nextMonth}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-all hover:bg-white/[0.05] hover:text-white"
                        >
                            <Icon name="ChevronRight" size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.01] backdrop-blur-sm">
                <div className="grid grid-cols-1 border-b border-white/[0.08] bg-white/[0.02] sm:grid-cols-7">
                    {weekDays.map((day) => (
                        <div
                            key={day}
                            className="hidden py-3 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-500 sm:block"
                        >
                            {day}
                        </div>
                    ))}
                    <div className="py-3 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-500 sm:hidden">
                        Schedule
                    </div>
                </div>

                <div className="grid flex-1 grid-cols-1 overflow-y-auto sm:grid-cols-7 sm:overflow-hidden">
                    {calendarDays.map((dayObj, i) => {
                        const dayIssues = issuesByDate[dayObj.dateKey] || [];
                        const isToday =
                            new Date().toDateString() ===
                            new Date(
                                dayObj.year,
                                dayObj.month,
                                dayObj.day,
                            ).toDateString();

                        return (
                            <div
                                key={i}
                                className={cn(
                                    'relative flex flex-col gap-1 border-b border-white/[0.05] p-2 transition-colors hover:bg-white/[0.02] sm:border-r',
                                    !dayObj.isCurrentMonth &&
                                        'hidden bg-black/[0.1] opacity-40 sm:flex',
                                    i % 7 === 6 && 'sm:border-r-0',
                                    dayIssues.length === 0 && 'hidden sm:flex',
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={cn(
                                                'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all',
                                                isToday
                                                    ? 'shadow-[0_0_15px_var(--accent-color)]/30 bg-[var(--accent-color)] text-white'
                                                    : 'text-zinc-500',
                                            )}
                                        >
                                            {dayObj.day}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 sm:hidden">
                                            {weekDays[i % 7]}
                                        </span>
                                    </div>
                                    {dayIssues.length > 0 && (
                                        <span className="text-[10px] font-bold text-zinc-600">
                                            {dayIssues.length}{' '}
                                            {dayIssues.length === 1
                                                ? 'item'
                                                : 'items'}
                                        </span>
                                    )}
                                </div>

                                <div className="no-scrollbar flex flex-col gap-1 overflow-y-auto sm:max-h-[100px]">
                                    {dayIssues.map((issue) => (
                                        <motion.button
                                            key={issue.id}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            onClick={() =>
                                                setActiveIssue(issue)
                                            }
                                            className={cn(
                                                'hover:border-[var(--accent-color)]/50 group flex items-center gap-2 rounded-lg border border-white/[0.05] bg-white/[0.03] p-1.5 text-left transition-all hover:bg-white/[0.08] sm:p-1.5',
                                                'px-3 py-2.5 sm:px-1.5 sm:py-1.5', // Larger on mobile
                                                activeIssue?.id === issue.id &&
                                                    'bg-[var(--accent-color)]/10 border-[var(--accent-color)]',
                                            )}
                                        >
                                            <StatusDot
                                                status={issue.priority}
                                                size="xs"
                                            />
                                            <span className="truncate text-xs font-medium text-zinc-300 group-hover:text-white sm:text-[11px]">
                                                {issue.title}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
