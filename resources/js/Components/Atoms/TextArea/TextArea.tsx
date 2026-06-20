import React from 'react';
import styles from './TextArea.module.scss';

interface TextAreaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    placeholder?: string;
    isDisabled?: boolean;
}

function TextArea({
    value,
    onChange,
    className,
    placeholder,
    isDisabled,
}: TextAreaProps) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            className={className || styles.textarea}
            placeholder={placeholder}
            disabled={isDisabled}
        ></textarea>
    );
}

export default TextArea;
