import Icon from '@/Components/Atoms/Icon/Icon';

type ThemeMode = 'dark' | 'light' | 'system';

interface AccountSettingsThemeCardProps {
    id: ThemeMode;
    label: string;
    subtitle: string;
    selected: boolean;
    onSelect: () => void;
}

const themePreviewStyles: Record<
    ThemeMode,
    {
        frame: string;
        canvas: string;
        sidebar: string;
        topbar: string;
        accent: string;
        row: string;
    }
> = {
    dark: {
        frame: 'bg-[var(--bg-color)]',
        canvas: 'bg-[var(--bg-color-hover)]',
        sidebar: 'bg-[var(--bg-dark-color)]',
        topbar: 'bg-[var(--bg-color)]',
        accent: 'bg-[var(--accent-color)]',
        row: 'bg-white/[0.08]',
    },
    light: {
        frame: 'bg-[#f1f3f8]',
        canvas: 'bg-[#ffffff]',
        sidebar: 'bg-[#e8ebf2]',
        topbar: 'bg-[#f6f7fb]',
        accent: 'bg-[#7c3aed]',
        row: 'bg-[#d6dbe8]',
    },
    system: {
        frame: 'bg-[#0d0e13]',
        canvas: 'bg-[#181a22]',
        sidebar: 'bg-[#12131a]',
        topbar: 'bg-[#0d0e13]',
        accent: 'bg-[var(--accent-color)]',
        row: 'bg-[#33384a]',
    },
};

export default function AccountSettingsThemeCard({
    id,
    label,
    subtitle,
    selected,
    onSelect,
}: AccountSettingsThemeCardProps) {
    const palette = themePreviewStyles[id];

    return (
        <button
            type="button"
            onClick={onSelect}
            className={`rounded-xl border p-3 text-left transition-colors ${
                selected
                    ? 'border-[var(--accent-color)] bg-[var(--accent-color-opacity)]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.16]'
            }`}
        >
            <div className="mb-3 flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="mt-1 text-xs text-zinc-400">{subtitle}</p>
                </div>
                <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        selected
                            ? 'border-[var(--accent-color)] text-[var(--accent-color)]'
                            : 'border-zinc-600 text-transparent'
                    }`}
                >
                    <Icon name="Check" size={11} />
                </span>
            </div>
            <div
                className={`flex h-[74px] gap-1 overflow-hidden rounded-lg border border-white/[0.06] p-1 ${palette.frame}`}
            >
                <div
                    className={`w-5 shrink-0 space-y-1 rounded-md p-1 ${palette.sidebar}`}
                >
                    <div className={`h-1 rounded-full ${palette.row}`} />
                    <div className={`h-1 rounded-full ${palette.row}`} />
                    <div className={`h-1 rounded-full ${palette.accent}`} />
                </div>
                <div className="flex flex-1 flex-col gap-1 overflow-hidden rounded-md">
                    <div
                        className={`h-1.5 shrink-0 rounded-sm ${palette.topbar}`}
                    />
                    <div
                        className={`flex-1 space-y-1.5 rounded-sm p-1 ${palette.canvas}`}
                    >
                        <div
                            className={`h-1.5 w-2/3 rounded-full ${palette.accent}`}
                        />
                        <div className={`h-1.5 rounded-full ${palette.row}`} />
                        <div
                            className={`h-1.5 w-4/5 rounded-full ${palette.row}`}
                        />
                    </div>
                </div>
            </div>
        </button>
    );
}
