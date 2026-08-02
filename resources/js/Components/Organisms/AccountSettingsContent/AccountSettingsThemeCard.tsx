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
        frame: 'bg-[#0f1116]',
        canvas: 'bg-[#1b1f27]',
        sidebar: 'bg-[#14171d]',
        topbar: 'bg-[#202633]',
        accent: 'bg-[#f6b85e]',
        row: 'bg-[#3a404d]',
    },
    light: {
        frame: 'bg-[#f1f3f8]',
        canvas: 'bg-[#ffffff]',
        sidebar: 'bg-[#e8ebf2]',
        topbar: 'bg-[#f6f7fb]',
        accent: 'bg-[#8a63f8]',
        row: 'bg-[#d6dbe8]',
    },
    system: {
        frame: 'bg-[#11131a]',
        canvas: 'bg-[#1d2630]',
        sidebar: 'bg-[#131c24]',
        topbar: 'bg-[#243140]',
        accent: 'bg-[#53b3da]',
        row: 'bg-[#3c4a57]',
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
                    : 'border-[var(--bg-light-color)] bg-[var(--bg-color)] hover:border-zinc-500'
            }`}
        >
            <div className="mb-3 flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="mt-1 text-xs text-zinc-400">{subtitle}</p>
                </div>
                <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                        selected
                            ? 'border-[var(--accent-color)] text-[var(--accent-color)]'
                            : 'border-zinc-600 text-transparent'
                    }`}
                >
                    <Icon name="Check" size={11} />
                </span>
            </div>
            <div className={`rounded-lg p-2 ${palette.frame}`}>
                <div className={`overflow-hidden rounded-md ${palette.canvas}`}>
                    <div className={`h-3 ${palette.topbar}`} />
                    <div className="flex">
                        <div className={`w-6 p-1 ${palette.sidebar}`}>
                            <div className="space-y-1">
                                <div className={`h-1 rounded ${palette.row}`} />
                                <div className={`h-1 rounded ${palette.row}`} />
                                <div className={`h-1 rounded ${palette.row}`} />
                            </div>
                        </div>
                        <div className="flex-1 space-y-1.5 p-1.5">
                            <div
                                className={`h-2.5 w-2/3 rounded ${palette.accent}`}
                            />
                            <div
                                className={`h-2 w-full rounded ${palette.row}`}
                            />
                            <div
                                className={`h-2 w-3/4 rounded ${palette.row}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
}
