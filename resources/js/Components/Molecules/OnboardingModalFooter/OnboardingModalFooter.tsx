import IconButton from '@/Components/Atoms/IconButton/IconButton';
import ProgressBar from '@/Components/Atoms/ProgressBar/ProgressBar';
import { OnboardingModalFooterProps } from '@/types/Components';

export default function OnboardingModalFooter({
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    onPrev,
    onNext,
}: OnboardingModalFooterProps) {
    return (
        <div className="mt-12 flex items-center justify-between border-t border-zinc-800/80 pt-6">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            <div className="flex items-center gap-2">
                <IconButton
                    onClick={onPrev}
                    disabled={isFirstStep}
                    ariaLabel="Previous Step"
                    variant="onboardingSecondary"
                    iconName="ChevronLeft"
                    iconSize={18}
                />
                <IconButton
                    onClick={onNext}
                    ariaLabel="Next Step"
                    variant="onboardingPrimary"
                    iconName={isLastStep ? 'Check' : 'ChevronRight'}
                    iconSize={18}
                />
            </div>
        </div>
    );
}
