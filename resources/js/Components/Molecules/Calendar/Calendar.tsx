import Icon from '@/Components/Atoms/Icon/Icon';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface CalendarProps {
    selectedDate?: Date;
    onSelect: (date: Date) => void;
    onClose: () => void;
}

const Calendar: React.FC<CalendarProps> = ({
    selectedDate,
    onSelect,
    onClose,
}) => {
    const [currentMonth, setCurrentMonth] = useState(
        selectedDate || new Date(),
    );

    const daysInMonth = (year: number, month: number) =>
        new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) =>
        new Date(year, month, 1).getDay();

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const days = [];
    const prevMonthDays = daysInMonth(year, month - 1);
    const firstDay = firstDayOfMonth(year, month);

    // Add days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
        days.push({
            day: prevMonthDays - i,
            month: month - 1,
            year: year,
            currentMonth: false,
        });
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth(year, month); i++) {
        days.push({
            day: i,
            month: month,
            year: year,
            currentMonth: true,
        });
    }

    // Add days from next month
    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
        days.push({
            day: i,
            month: month + 1,
            year: year,
            currentMonth: false,
        });
    }

    const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));
    const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));

    const isSelected = (d: number, m: number, y: number) => {
        if (!selectedDate) return false;
        return (
            selectedDate.getDate() === d &&
            selectedDate.getMonth() === m &&
            selectedDate.getFullYear() === y
        );
    };

    const isToday = (d: number, m: number, y: number) => {
        const today = new Date();
        return (
            today.getDate() === d &&
            today.getMonth() === m &&
            today.getFullYear() === y
        );
    };

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

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                duration: 0.2,
                type: 'spring',
                damping: 25,
                stiffness: 300,
            }}
            className="w-[320px] rounded-2xl border border-white/[0.08] bg-[#0d0d0d]/80 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
            <div className="mb-6 flex items-center justify-between">
                <button
                    type="button"
                    onClick={prevMonth}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-gray-color)] transition-colors hover:bg-white/[0.05] hover:text-[var(--text-color)]"
                >
                    <Icon name="ChevronLeft" size={16} />
                </button>
                <span className="text-sm font-semibold text-[var(--text-color)]">
                    {monthNames[month]} {year}
                </span>
                <button
                    type="button"
                    onClick={nextMonth}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-gray-color)] transition-colors hover:bg-white/[0.05] hover:text-[var(--text-color)]"
                >
                    <Icon name="ChevronRight" size={16} />
                </button>
            </div>

            <div className="mb-2 grid grid-cols-7 text-center">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                    <span
                        key={day}
                        className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-gray-color)]"
                    >
                        {day}
                    </span>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5">
                {days.map((dateObj, i) => {
                    const selected = isSelected(
                        dateObj.day,
                        dateObj.month,
                        dateObj.year,
                    );
                    const today = isToday(
                        dateObj.day,
                        dateObj.month,
                        dateObj.year,
                    );

                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => {
                                onSelect(
                                    new Date(
                                        dateObj.year,
                                        dateObj.month,
                                        dateObj.day,
                                    ),
                                );
                                onClose();
                            }}
                            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-[13px] transition-all duration-200 ${!dateObj.currentMonth ? 'opacity-20' : 'text-[var(--text-color)]'} ${selected ? 'bg-[var(--accent-color)] font-bold !text-white !opacity-100 shadow-[0_0_20px_rgba(var(--accent-color-rgb),0.4)]' : 'hover:bg-white/[0.08]'} ${today && !selected ? 'border border-[var(--accent-color)]' : ''} `}
                        >
                            {dateObj.day}
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 flex justify-between border-t border-[var(--bg-light-color)] pt-3">
                <button
                    type="button"
                    onClick={() => {
                        onSelect(new Date());
                        onClose();
                    }}
                    className="cursor-pointer text-[11px] font-medium text-[var(--accent-color)] hover:underline"
                >
                    Today
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="cursor-pointer text-[11px] font-medium text-[var(--text-gray-color)] hover:text-[var(--text-color)]"
                >
                    Close
                </button>
            </div>
        </motion.div>
    );
};

export default Calendar;
