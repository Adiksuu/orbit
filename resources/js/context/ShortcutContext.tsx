import { ShortcutHelpModal } from '@/Components/Organisms/ShortcutHelpModal';
import { useModal } from '@/context/ModalContext';
import { ShortcutContextType, ShortcutDefinition } from '@/types/Shortcuts';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

const ShortcutContext = createContext<ShortcutContextType | undefined>(
    undefined,
);

export const ShortcutProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [shortcuts, setShortcuts] = useState<ShortcutDefinition[]>([]);
    const { openModal } = useModal();
    const comboRef = useRef<string[]>([]);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const register = useCallback((shortcut: ShortcutDefinition) => {
        setShortcuts((prev) => {
            const exists = prev.some(
                (s) =>
                    s.key === shortcut.key &&
                    s.description === shortcut.description,
            );
            if (exists) return prev;
            return [...prev, shortcut];
        });
        return () => {
            setShortcuts((prev) => prev.filter((s) => s !== shortcut));
        };
    }, []);

    const registerBatch = useCallback((newShortcuts: ShortcutDefinition[]) => {
        if (newShortcuts.length === 0) return () => {};

        setShortcuts((prev) => {
            const filtered = newShortcuts.filter(
                (ns) =>
                    !prev.some(
                        (ps) =>
                            ps.key === ns.key &&
                            ps.description === ns.description,
                    ),
            );
            if (filtered.length === 0) return prev;
            return [...prev, ...filtered];
        });

        return () => {
            setShortcuts((prev) =>
                prev.filter((s) => !newShortcuts.includes(s)),
            );
        };
    }, []);

    const handleOpenHelp = useCallback(() => {
        const isAlreadyOpen = document.querySelector('.shortcut-modal-marker');
        if (isAlreadyOpen) return;

        openModal('Keyboard Shortcuts', undefined, <ShortcutHelpModal />);
    }, [openModal]);

    useEffect(() => {
        const unreg = register({
            key: '/',
            description: 'Show keyboard shortcuts',
            category: 'Action',
            action: handleOpenHelp,
        });
        return unreg;
    }, [register, handleOpenHelp]);

    useEffect(() => {
        const unreg = register({
            key: 'ctrl+k',
            description: 'Open Command Palette',
            category: 'Action',
            action: handleOpenHelp,
        });
        return unreg;
    }, [register, handleOpenHelp]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            const target = event.target as HTMLElement;

            const isInput =
                target?.tagName === 'INPUT' ||
                target?.tagName === 'TEXTAREA' ||
                target?.isContentEditable ||
                (target?.closest && target.closest('[contenteditable="true"]'));

            if (isInput) {
                if (event.key === 'Escape') {
                    target.blur();
                }
                return;
            }

            const key = event.key.toLowerCase();
            if (['control', 'shift', 'alt', 'meta'].includes(key)) return;

            let pressedKey = '';
            if (event.ctrlKey) pressedKey += 'ctrl+';
            if (event.altKey) pressedKey += 'alt+';
            if (event.shiftKey) pressedKey += 'shift+';
            if (event.metaKey) pressedKey += 'meta+';

            pressedKey += key;

            const isModifierCombo =
                event.ctrlKey || event.altKey || event.metaKey;

            if (!isModifierCombo) {
                comboRef.current.push(pressedKey);
                if (timerRef.current) clearTimeout(timerRef.current);
                timerRef.current = setTimeout(() => {
                    comboRef.current = [];
                }, 500);
            } else {
                comboRef.current = [];
            }

            const currentCombo = comboRef.current.join(' ');

            const matchedShortcut = shortcuts.find((s) => {
                if (s.disabled) return false;
                const normalizedKey = s.key.toLowerCase().trim();
                return (
                    normalizedKey === currentCombo ||
                    normalizedKey === pressedKey
                );
            });

            if (matchedShortcut) {
                event.preventDefault();
                event.stopPropagation();
                matchedShortcut.action();
                comboRef.current = [];
                if (timerRef.current) clearTimeout(timerRef.current);
            }
        },
        [shortcuts],
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown, true);
        return () => {
            window.removeEventListener('keydown', handleKeyDown, true);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [handleKeyDown]);

    return (
        <ShortcutContext.Provider
            value={{ register, registerBatch, shortcuts }}
        >
            {children}
        </ShortcutContext.Provider>
    );
};

export const useShortcuts = (definitions: ShortcutDefinition[] = []) => {
    const context = useContext(ShortcutContext);
    if (!context) {
        throw new Error('useShortcuts must be used within a ShortcutProvider');
    }

    useEffect(() => {
        if (definitions.length === 0) return;

        const unregister = context.registerBatch(definitions);
        return () => unregister();
    }, [definitions, context.registerBatch]);

    return context;
};
