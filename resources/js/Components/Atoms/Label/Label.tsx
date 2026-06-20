interface LabelProps {
    text: string;
    color?: string;
    backgroundColor?: string;
    size?: number;
}

function Label({ text, color, backgroundColor, size }: LabelProps) {
    return <div style={{ color, backgroundColor, fontSize: size }}>{text}</div>;
}

export default Label;
