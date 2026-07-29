import { SlideContentProps } from '@/types/Components';

export default function SlideContent({
    title,
    subtitle,
    description,
}: SlideContentProps) {
    return (
        <div className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                {title}
            </h2>
            <p className="text-base font-medium text-violet-400">{subtitle}</p>
            <p className="text-sm leading-relaxed text-zinc-400">
                {description}
            </p>
        </div>
    );
}
