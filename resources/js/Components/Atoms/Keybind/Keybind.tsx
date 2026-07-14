import Badge from '@/Components/Atoms/Badge/Badge';
import { KeybindProps } from '@/types/Components';

function Keybind({ tooltipText, keybind, tooltip = true }: KeybindProps) {
    return (
        <Badge tooltip={tooltip} tooltipText={tooltipText} variant={'ghost'}>
            <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-[#444] bg-[#222] px-1.5 font-mono text-[9px] font-bold text-[#888] shadow-sm group-hover:border-[#555] group-hover:text-[#ccc]">
                {keybind}
            </kbd>
        </Badge>
    );
}

export default Keybind;
