import Button from '@/Components/Atoms/Button/Button';
import Icon from '@/Components/Atoms/Icon/Icon';
import PasswordField from '@/Components/Molecules/PasswordField/PasswordField';
import { useAlert } from '@/context/AlertContext';
import { FormEvent, useEffect, useRef, useState } from 'react';

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 60;

type Strength = 'weak' | 'fair' | 'strong';

const getStrength = (password: string): Strength | null => {
    if (!password) {
        return null;
    }

    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return 'weak';
    if (score <= 3) return 'fair';
    return 'strong';
};

const strengthCopy: Record<Strength, { label: string; className: string }> = {
    weak: { label: 'Weak', className: 'bg-[var(--error-color)]' },
    fair: { label: 'Fair', className: 'bg-[var(--warning-color)]' },
    strong: { label: 'Strong', className: 'bg-[var(--success-color)]' },
};

export default function AccountSettingsPasswordForm() {
    const { addAlert } = useAlert();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [attempts, setAttempts] = useState(0);
    const [lockoutSeconds, setLockoutSeconds] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
        undefined,
    );
    const isLocked = lockoutSeconds > 0;

    useEffect(() => {
        if (!isLocked) {
            return;
        }

        intervalRef.current = setInterval(() => {
            setLockoutSeconds((prev) => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [isLocked]);

    const strength = getStrength(newPassword);

    const resetFields = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (isLocked) {
            return;
        }

        const nextErrors: Record<string, string> = {};

        if (!currentPassword) {
            nextErrors.current = 'Enter your current password.';
        }
        if (newPassword.length < 8) {
            nextErrors.newPassword = 'Use at least 8 characters.';
        }
        if (newPassword && currentPassword && newPassword === currentPassword) {
            nextErrors.newPassword =
                'New password must be different from your current password.';
        }
        if (confirmPassword !== newPassword) {
            nextErrors.confirm = 'Passwords do not match.';
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            const nextAttempts = attempts + 1;
            setAttempts(nextAttempts);

            if (nextAttempts >= MAX_ATTEMPTS) {
                setLockoutSeconds(LOCKOUT_SECONDS);
                setAttempts(0);
            }
            return;
        }

        setAttempts(0);
        addAlert('Your password has been updated.', 'success');
        resetFields();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 px-5 py-4"
            noValidate
        >
            {isLocked && (
                <div className="border-[var(--error-color)]/30 bg-[var(--error-color)]/10 flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5">
                    <Icon
                        name="ShieldAlert"
                        size={16}
                        className="shrink-0 text-[var(--error-color)]"
                    />
                    <p className="text-xs text-[var(--error-color)]">
                        Too many attempts. Try again in {lockoutSeconds}s.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                    <PasswordField
                        id="current-password"
                        label="Current password"
                        value={currentPassword}
                        onChange={(event) =>
                            setCurrentPassword(event.target.value)
                        }
                        autoComplete="current-password"
                        error={errors.current}
                        isDisabled={isLocked}
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <PasswordField
                        id="new-password"
                        label="New password"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        autoComplete="new-password"
                        error={errors.newPassword}
                        isDisabled={isLocked}
                        required
                    />
                    {strength && (
                        <div className="flex items-center gap-2 px-0.5">
                            <div className="flex flex-1 gap-1">
                                {(['weak', 'fair', 'strong'] as Strength[]).map(
                                    (tier, index) => (
                                        <div
                                            key={tier}
                                            className={`h-1 flex-1 rounded-full ${
                                                index <=
                                                [
                                                    'weak',
                                                    'fair',
                                                    'strong',
                                                ].indexOf(strength)
                                                    ? strengthCopy[strength]
                                                          .className
                                                    : 'bg-[var(--bg-light-color)]'
                                            }`}
                                        />
                                    ),
                                )}
                            </div>
                            <span className="text-[10px] font-medium text-[var(--text-muted-color)]">
                                {strengthCopy[strength].label}
                            </span>
                        </div>
                    )}
                </div>

                <PasswordField
                    id="confirm-password"
                    label="Confirm new password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    autoComplete="new-password"
                    error={errors.confirm}
                    isDisabled={isLocked}
                    required
                />
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
                <p className="text-xs text-[var(--text-muted-color)]">
                    Use at least 8 characters with a mix of letters, numbers,
                    and symbols.
                </p>
                <Button
                    type="submit"
                    isDisabled={isLocked}
                    className="shrink-0 rounded-lg px-4 py-1.5"
                >
                    Update password
                </Button>
            </div>
        </form>
    );
}
