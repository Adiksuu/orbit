import { ShowcaseDotsProps } from '@/types/Components';

export const ShowcaseDots = ({
    count,
    activeIndex,
    onSelect,
}: ShowcaseDotsProps) => (
    <div className="flex items-center gap-1.5">
        {Array.from({ length: count }).map((_, index) => (
            <button
                key={index}
                type="button"
                onClick={() => onSelect(index)}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                    index === activeIndex
                        ? 'w-5 bg-[var(--accent-color)]'
                        : 'w-1.5 bg-[var(--bg-light-color)] hover:bg-[var(--accent-light-color)]'
                }`}
                aria-label={`Przejdź do slajdu ${index + 1}`}
            />
        ))}
    </div>
);
