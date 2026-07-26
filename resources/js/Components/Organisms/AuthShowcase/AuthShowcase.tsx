import { OrbitGraphic } from '@/Components/Molecules/OrbitGraphic/OrbitGraphic';
import { ShowcaseSlider } from '@/Components/Molecules/ShowcaseSlider/ShowcaseSlider';
import { AuthShowcaseProps } from '@/types/Components';

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
            <OrbitGraphic />
            <ShowcaseSlider autoPlayInterval={5000} />
        </div>
    );
};

export default AuthShowcase;
