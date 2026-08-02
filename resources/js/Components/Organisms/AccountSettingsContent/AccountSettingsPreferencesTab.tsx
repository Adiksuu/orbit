import Icon from '@/Components/Atoms/Icon/Icon';
import ToggleSwitch from '@/Components/Atoms/ToggleSwitch/ToggleSwitch';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import { useState } from 'react';

type ThemeMode = 'dark' | 'light' | 'system';

const selectablePillClass =
    'rounded-full border border-[var(--bg-light-color)] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-500';

const homeViewOptions = [
    { value: 'Dashboard', icon: 'LayoutDashboard' as const, preview: 'Stats' },
    { value: 'My issues', icon: 'ListTodo' as const, preview: 'Inbox' },
    { value: 'Projects', icon: 'FolderGit2' as const, preview: 'Roadmap' },
];

const themeOptions: Array<{ id: ThemeMode; label: string; subtitle: string }> =
    [
        { id: 'dark', label: 'Dark', subtitle: 'Orbit dark interface' },
        { id: 'light', label: 'Light', subtitle: 'Light workspace mode' },
        {
            id: 'system',
            label: 'System sync',
            subtitle: 'Follow OS preference',
        },
    ];

export default function AccountSettingsPreferencesTab() {
    const [homeView, setHomeView] = useState('My issues');
    const [displayNames, setDisplayNames] = useState('Full name');
    const [firstDay, setFirstDay] = useState('Monday');
    const [commentsSubmit, setCommentsSubmit] = useState('Enter');
    const [convertEmoticons, setConvertEmoticons] = useState(true);
    const [compactNumbers, setCompactNumbers] = useState(false);
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

    return (
        <div className="space-y-5">
            <SettingsPanel
                title="Default home view"
                description="Choose the first view shown when opening Orbit."
            >
                <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-3">
                    {homeViewOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => setHomeView(option.value)}
                            className={`rounded-xl border p-3 text-left transition-colors ${
                                homeView === option.value
                                    ? 'border-[var(--accent-color)] bg-[var(--accent-color-opacity)]'
                                    : 'border-[var(--bg-light-color)] bg-[var(--bg-color)] hover:border-zinc-500'
                            }`}
                        >
                            <div className="mb-2 flex items-center gap-2">
                                <span className="rounded-md bg-[var(--bg-light-color)] p-1.5">
                                    <Icon name={option.icon} size={14} />
                                </span>
                                <p className="text-sm font-medium text-white">
                                    {option.value}
                                </p>
                            </div>
                            <div className="rounded-md bg-[var(--bg-light-color)] px-2 py-1 text-xs text-zinc-400">
                                {option.preview} preview
                            </div>
                        </button>
                    ))}
                </div>
            </SettingsPanel>

            <SettingsPanel
                title="Interface theme"
                description="Choose how Orbit should render colors in your account."
            >
                <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-3">
                    {themeOptions.map((theme) => (
                        <button
                            key={theme.id}
                            type="button"
                            onClick={() => setThemeMode(theme.id)}
                            className={`rounded-xl border p-3 text-left transition-colors ${
                                themeMode === theme.id
                                    ? 'border-[var(--accent-color)] bg-[var(--accent-color-opacity)]'
                                    : 'border-[var(--bg-light-color)] bg-[var(--bg-color)] hover:border-zinc-500'
                            }`}
                        >
                            <p className="text-sm font-medium text-white">
                                {theme.label}
                            </p>
                            <p className="mt-1 text-xs text-zinc-400">
                                {theme.subtitle}
                            </p>
                            <div className="mt-3 space-y-1">
                                <div className="h-2 rounded bg-zinc-700" />
                                <div className="h-2 rounded bg-zinc-600/80" />
                                <div className="h-2 rounded bg-zinc-500/70" />
                            </div>
                        </button>
                    ))}
                </div>
            </SettingsPanel>

            <SettingsPanel
                title="Interface and behavior"
                description="Choose how personal information and writing behavior should appear."
            >
                <div className="space-y-4 px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                        {['Full name', 'First name', 'Handle'].map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setDisplayNames(option)}
                                className={`${selectablePillClass} ${displayNames === option ? 'border-[var(--accent-color)] text-white' : ''}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <button
                            type="button"
                            className={selectablePillClass}
                            onClick={() =>
                                setFirstDay(
                                    firstDay === 'Monday' ? 'Sunday' : 'Monday',
                                )
                            }
                        >
                            First day: {firstDay}
                        </button>
                        <button
                            type="button"
                            className={selectablePillClass}
                            onClick={() =>
                                setCommentsSubmit(
                                    commentsSubmit === 'Enter'
                                        ? 'Ctrl+Enter'
                                        : 'Enter',
                                )
                            }
                        >
                            Send comments: {commentsSubmit}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-3 md:grid-cols-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-zinc-300">
                                Convert text emoticons
                            </p>
                            <ToggleSwitch
                                checked={convertEmoticons}
                                onChange={setConvertEmoticons}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-zinc-300">
                                Compact number formatting
                            </p>
                            <ToggleSwitch
                                checked={compactNumbers}
                                onChange={setCompactNumbers}
                            />
                        </div>
                    </div>
                </div>
            </SettingsPanel>
        </div>
    );
}
