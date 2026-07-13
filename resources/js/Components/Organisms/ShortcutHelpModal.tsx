import { useModal } from '@/context/ModalContext';
import { useShortcuts } from '@/context/ShortcutContext';
import { ArrowDown, ArrowUp, CornerDownLeft, Search } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

export const ShortcutHelpModal: React.FC = () => {
    const { shortcuts } = useShortcuts();
    const { closeAllModals } = useModal();
    const [search, setSearch] = useState('');

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeAllModals();
            }
        };
        window.addEventListener('keydown', handleEsc, true);
        return () => window.removeEventListener('keydown', handleEsc, true);
    }, [closeAllModals]);

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
        <div className="animate-in fade-in zoom-in shortcut-modal-marker flex w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[#333] bg-[#1a1a1a] shadow-2xl duration-200">
            {/* Header / Search */}
            <div className="flex items-center gap-3 border-b border-[#333] px-4 py-4">
                <Search size={20} className="text-[#666]" />
                <input
                    autoFocus
                    type="text"
                    placeholder="Search shortcuts..."
                    className="flex-1 border-none bg-transparent text-sm text-[#eee] placeholder-[#555] outline-none focus:ring-0"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Content */}
            <div className="scrollbar-thin scrollbar-thumb-[#333] max-h-[400px] flex-1 overflow-y-auto p-2">
                {Object.keys(categories).length === 0 ? (
                    <div className="py-12 text-center text-sm text-[#666]">
                        No shortcuts found for "{search}"
                    </div>
                ) : (
                    Object.entries(categories).map(([category, items]) => (
                        <div key={category} className="mb-4 last:mb-2">
                            <h3 className="px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-[#666]">
                                {category}
                            </h3>
                            <div className="space-y-0.5">
                                {items.map((s, idx) => (
                                    <div
                                        key={idx}
                                        className="group flex cursor-default items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-[#252525]"
                                    >
                                        <span className="text-[13px] text-[#ccc] group-hover:text-[#eee]">
                                            {s.description}
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            {s.key.includes('+') ? (
                                                <div className="flex items-center gap-1">
                                                    {s.key
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
                                                                <kbd className="inline-flex h-6 min-w-[24px] items-center justify-center rounded border border-[#444] bg-[#333] px-1.5 py-1 font-mono text-[10px] text-[#aaa] shadow-sm group-hover:border-[#555] group-hover:text-[#ccc]">
                                                                    {kPart.toUpperCase()}
                                                                </kbd>
                                                            </React.Fragment>
                                                        ))}
                                                </div>
                                            ) : (
                                                s.key
                                                    .split(' ')
                                                    .map((part, pIdx) => (
                                                        <React.Fragment
                                                            key={pIdx}
                                                        >
                                                            {pIdx > 0 && (
                                                                <span className="text-[10px] font-medium text-[#444]">
                                                                    then
                                                                </span>
                                                            )}
                                                            <kbd className="inline-flex h-6 min-w-[24px] items-center justify-center rounded border border-[#444] bg-[#333] px-1.5 py-1 font-mono text-[10px] text-[#aaa] shadow-sm group-hover:border-[#555] group-hover:text-[#ccc]">
                                                                {part.toUpperCase()}
                                                            </kbd>
                                                        </React.Fragment>
                                                    ))
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
            <div className="flex items-center gap-6 border-t border-[#333] bg-[#151515] px-4 py-3">
                <div className="flex items-center gap-2 text-[11px] text-[#666]">
                    <kbd className="rounded border border-[#333] bg-[#252525] px-1.5 py-0.5 text-[9px]">
                        ESC
                    </kbd>
                    <span>close</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#666]">
                    <div className="flex gap-1">
                        <kbd className="rounded border border-[#333] bg-[#252525] px-1.5 py-0.5 text-[9px]">
                            <ArrowUp size={10} />
                        </kbd>
                        <kbd className="rounded border border-[#333] bg-[#252525] px-1.5 py-0.5 text-[9px]">
                            <ArrowDown size={10} />
                        </kbd>
                    </div>
                    <span>navigate</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#666]">
                    <kbd className="rounded border border-[#333] bg-[#252525] px-1.5 py-0.5 text-[9px]">
                        <CornerDownLeft size={10} />
                    </kbd>
                    <span>open</span>
                </div>
            </div>
        </div>
    );
};
