import Icon from '@/Components/Atoms/Icon/Icon';
import { AuthShowcaseProps } from '@/types/Components';
import { motion } from 'framer-motion';
import { icons } from 'lucide-react';

const ORBIT_DURATION = 32;

interface OrbitItem {
    name: keyof typeof icons;
    angle: number;
}

interface OrbitRingProps {
    radius: number;
    duration: number;
    reverse?: boolean;
    items: OrbitItem[];
}

const OrbitRing = ({
    radius,
    duration,
    reverse = false,
    items,
}: OrbitRingProps) => (
    <motion.div
        className="absolute inset-0"
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
        {items.map(({ name, angle }) => (
            <div
                key={name}
                className="absolute left-1/2 top-1/2"
                style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)`,
                }}
            >
                <motion.div
                    animate={{ rotate: reverse ? 360 : -360 }}
                    transition={{ duration, repeat: Infinity, ease: 'linear' }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--bg-light-color)] bg-[var(--bg-dark-color)] shadow-lg"
                >
                    <Icon
                        name={name}
                        size={16}
                        className="text-[var(--accent-light-color)]"
                    />
                </motion.div>
            </div>
        ))}
    </motion.div>
);

const AuthShowcase = ({ title, description }: AuthShowcaseProps) => {
    return (
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[var(--bg-dark-color)] via-[var(--bg-color)] to-[var(--accent-color-opacity)] px-10 py-12 lg:flex">
            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        'radial-gradient(rgb(255 255 255 / 0.06) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />

            <div className="relative z-10 max-w-sm">
                <h2 className="text-2xl font-semibold leading-snug text-[var(--text-color)] xl:text-3xl">
                    {title}
                </h2>
                <p className="mt-3 text-sm text-[var(--text-gray-color)]">
                    {description}
                </p>
            </div>

            <div className="relative z-10 flex flex-1 items-center justify-center">
                <div className="relative flex h-[260px] w-[260px] items-center justify-center xl:h-[320px] xl:w-[320px]">
                    <div className="absolute h-[62%] w-[62%] rounded-full border border-dashed border-[var(--bg-light-color)]" />
                    <div className="border-[var(--bg-light-color)]/60 absolute h-full w-full rounded-full border border-dashed" />

                    <div className="absolute h-16 w-16 rounded-full bg-[var(--accent-color)] opacity-30 blur-xl" />
                    <div className="absolute flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent-color)] to-[var(--accent-light-color)] shadow-lg">
                        <Icon name="Orbit" size={28} className="text-white" />
                    </div>

                    <OrbitRing
                        radius={90}
                        duration={ORBIT_DURATION}
                        items={[
                            { name: 'ListChecks', angle: 0 },
                            { name: 'FolderGit2', angle: 120 },
                            { name: 'Bell', angle: 240 },
                        ]}
                    />
                    <OrbitRing
                        radius={140}
                        duration={ORBIT_DURATION * 1.6}
                        reverse
                        items={[
                            { name: 'LayoutDashboard', angle: 30 },
                            { name: 'Users', angle: 102 },
                            { name: 'Calendar', angle: 174 },
                            { name: 'Activity', angle: 246 },
                            { name: 'GitBranch', angle: 318 },
                        ]}
                    />
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                <p className="max-w-xs text-xs leading-relaxed text-[var(--text-gray-color)]">
                    Built for teams who plan, ship, and track work together{' '}
                    <span className="font-semibold text-[var(--text-color)]">
                        — all in one orbit.
                    </span>
                </p>
                <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-5 rounded-full bg-[var(--accent-color)]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--bg-light-color)]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--bg-light-color)]" />
                </div>
            </div>
        </div>
    );
};

export default AuthShowcase;
