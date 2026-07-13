import { useShortcuts } from '@/context/ShortcutContext';
import { ArrowDown, ArrowUp, CornerDownLeft, Search } from 'lucide-react';
import React, { useMemo, useState } from 'react';

export const ShortcutHelpModal: React.FC = () => {
    const { shortcuts } = useShortcuts();
    const [search, setSearch] = useState('');

    const filteredShortcuts = useMemo(() => {
        if (!search.trim()) return shortcuts;
        const query = search.toLowerCase();
        return shortcuts.filter(
            (s) =>
                s.description.toLowerCase().includes(query) ||
                s.key.toLowerCase().includes(query) ||
                s.category?.toLowerCase().includes(query),
        );
    }, [shortcuts, search]);

    const categories = useMemo(() => {
        return filteredShortcuts.reduce(
            (acc, s) => {
                const category = s.category || 'Other';
                if (!acc[category]) acc[category] = [];
                acc[category].push(s);
                return acc;
            },
            {} as Record<string, typeof shortcuts>,
        );
    }, [filteredShortcuts]);

    return (
        <div className="animate-in fade-in zoom-in shortcut-modal-marker flex w-full flex-col overflow-hidden rounded-xl border border-[#333] bg-[#1c1c1c] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] duration-200">
            <div className="flex items-center gap-3 border-b border-[#333] bg-[#1a1a1a] px-4 py-4">
                <Search size={18} className="text-[#555]" />
                <input
                    autoFocus
                    type="text"
                    placeholder="Search shortcuts..."
                    className="flex-1 border-none bg-transparent text-[14px] text-[#eee] placeholder-[#444] outline-none focus:ring-0"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Content */}
            <div className="scrollbar-thin scrollbar-thumb-[#333] max-h-[450px] flex-1 overflow-y-auto p-1.5">
                {Object.keys(categories).length === 0 ? (
                    <div className="py-12 text-center text-sm text-[#555]">
                        No shortcuts found for "{search}"
                    </div>
                ) : (
                    Object.entries(categories).map(([category, items]) => (
                        <div key={category} className="mb-2 last:mb-0">
                            <h3 className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#555]">
                                {category}
                            </h3>
                            <div className="space-y-0.5">
                                {items.map((s, idx) => (
                                    <div
                                        key={idx}
                                        className="group flex cursor-default items-center justify-between rounded-md px-3 py-1.5 transition-colors hover:bg-[#2a2a2a]"
                                    >
                                        <span className="text-[13px] text-[#aaa] group-hover:text-[#eee]">
                                            {s.description}
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            {s.key.includes('+') ? (
                                                <div className="flex items-center gap-1">
                                                    {s.key
                                                        .toLowerCase()
                                                        .split('+')
                                                        .map((kPart, kIdx) => (
                                                            <React.Fragment
                                                                key={kIdx}
                                                            >
                                                                {kIdx > 0 && (
                                                                    <span className="text-[10px] text-[#444]">
                                                                        +
                                                                    </span>
                                                                )}
                                                                <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-[#444] bg-[#222] px-1.5 font-mono text-[9px] font-bold text-[#888] shadow-sm group-hover:border-[#555] group-hover:text-[#ccc]">
                                                                    {kPart ===
                                                                        'control' ||
                                                                    kPart ===
                                                                        'ctrl'
                                                                        ? 'CTRL'
                                                                        : kPart.toUpperCase()}
                                                                </kbd>
                                                            </React.Fragment>
                                                        ))}
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1">
                                                    {s.key
                                                        .toLowerCase()
                                                        .split(/\s+/)
                                                        .map((part, pIdx) => (
                                                            <React.Fragment
                                                                key={pIdx}
                                                            >
                                                                {pIdx > 0 && (
                                                                    <span className="text-[9px] font-medium text-[#444]">
                                                                        then
                                                                    </span>
                                                                )}
                                                                <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-[#444] bg-[#222] px-1.5 font-mono text-[9px] font-bold text-[#888] shadow-sm group-hover:border-[#555] group-hover:text-[#ccc]">
                                                                    {part.toUpperCase()}
                                                                </kbd>
                                                            </React.Fragment>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer / Legend */}
            <div className="flex items-center gap-6 border-t border-[#333] bg-[#1a1a1a] px-4 py-2.5">
                <div className="flex items-center gap-2 text-[10px] text-[#555]">
                    <kbd className="rounded border border-[#333] bg-[#222] px-1.5 py-0.5 text-[9px] font-bold text-[#777]">
                        ESC
                    </kbd>
                    <span>close</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#555]">
                    <div className="flex gap-1">
                        <kbd className="rounded border border-[#333] bg-[#222] px-1.5 py-0.5 text-[9px] font-bold text-[#777]">
                            <ArrowUp size={10} />
                        </kbd>
                        <kbd className="rounded border border-[#333] bg-[#222] px-1.5 py-0.5 text-[9px] font-bold text-[#777]">
                            <ArrowDown size={10} />
                        </kbd>
                    </div>
                    <span>navigate</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#555]">
                    <kbd className="rounded border border-[#333] bg-[#222] px-1.5 py-0.5 text-[9px] font-bold text-[#777]">
                        <CornerDownLeft size={10} />
                    </kbd>
                    <span>open</span>
                </div>
            </div>
        </div>
    );
};
