import { ShowcaseDots } from '@/Components/Atoms/ShowcaseDots/ShowcaseDots';
import { ShowcaseSlide } from '@/types/Components';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SLIDES: ShowcaseSlide[] = [
    {
        text: 'Built for teams who plan, ship, and track work together',
        highlightText: '— all in one orbit.',
    },
    {
        text: 'Keep all your workspace tools, code, and discussions',
        highlightText: '— perfectly synchronized.',
    },
    {
        text: 'Automate daily routines and focus on building',
        highlightText: '— faster than ever.',
    },
];

interface ShowcaseSliderProps {
    autoPlayInterval?: number;
}

export const ShowcaseSlider = ({
    autoPlayInterval = 5000,
}: ShowcaseSliderProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % SLIDES.length);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [autoPlayInterval]);

    const activeSlide = SLIDES[activeIndex];

    return (
        <div className="relative z-10 flex min-h-[72px] flex-col items-center gap-4 text-center">
            <AnimatePresence mode="wait">
                <motion.p
                    key={activeIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-xs text-xs leading-relaxed text-[var(--text-gray-color)]"
                >
                    {activeSlide.text}{' '}
                    <span className="font-semibold text-[var(--text-color)]">
                        {activeSlide.highlightText}
                    </span>
                </motion.p>
            </AnimatePresence>

            <ShowcaseDots
                count={SLIDES.length}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
            />
        </div>
    );
};
