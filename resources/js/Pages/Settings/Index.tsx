import Icon from '@/Components/Atoms/Icon/Icon';
import { Link } from '@inertiajs/react';

export default function SettingsIndex() {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-[var(--bg-color)]">
            <div className="flex w-full max-w-2xl flex-col gap-4 rounded-2xl border border-[var(--bg-light-color)] bg-[var(--bg-dark-color)] p-8">
                <Link
                    href="/"
                    className="inline-flex w-fit items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                >
                    <Icon name="ChevronLeft" size={16} />
                    Back to app
                </Link>
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold text-white">Settings</h1>
                    <p className="text-sm text-zinc-400">
                        Settings UI is being prepared.
                    </p>
                </div>
            </div>
        </div>
    );
}
