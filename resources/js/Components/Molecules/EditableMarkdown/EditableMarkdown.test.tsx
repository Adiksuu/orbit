import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import EditableMarkdown from './EditableMarkdown';

type EditorOptions = {
    content: string;
    onBlur?: (args: { editor: FakeEditor }) => void;
};

class FakeEditor {
    markdown: string;
    editable = false;
    onBlur?: (args: { editor: FakeEditor }) => void;
    setEditable = vi.fn((value: boolean) => {
        this.editable = value;
    });
    focus = vi.fn();
    setContent = vi.fn((value: string) => {
        this.markdown = value;
    });
    commands = {
        focus: this.focus,
        setContent: this.setContent,
    };
    storage = {
        markdown: {
            getMarkdown: () => this.markdown,
        },
    };

    constructor(options: EditorOptions) {
        this.markdown = options.content;
        this.onBlur = options.onBlur;
    }
}

const mockUseEditor = vi.hoisted(() => vi.fn());

vi.mock('@tiptap/react', () => ({
    useEditor: (options: EditorOptions) => mockUseEditor(options),
    EditorContent: ({ editor }: { editor: FakeEditor | null }) => (
        <div data-testid="editor-content" data-editable={editor?.editable}>
            {editor?.markdown}
        </div>
    ),
}));

vi.mock('@tiptap/starter-kit', () => ({
    default: { configure: () => ({}) },
}));
vi.mock('@tiptap/extension-placeholder', () => ({
    default: { configure: () => ({}) },
}));
vi.mock('@tiptap/extension-task-list', () => ({ default: {} }));
vi.mock('@tiptap/extension-task-item', () => ({
    default: { configure: () => ({}) },
}));
vi.mock('@tiptap/extension-table', () => ({ TableKit: {} }));
vi.mock('@tiptap/extension-image', () => ({ default: {} }));
vi.mock('tiptap-markdown', () => ({
    Markdown: { configure: () => ({}) },
}));

const setup = (value: string, onSave = vi.fn(), disabled = false) => {
    // Real TipTap memoizes a single Editor instance across re-renders, so the
    // mock must too — otherwise clicking (which triggers a state update and
    // therefore a re-render) would silently swap in a fresh, never-called
    // instance right after the click handler ran.
    const editor = new FakeEditor({ content: value });
    mockUseEditor.mockImplementation((options: EditorOptions) => {
        editor.onBlur = options.onBlur;
        return editor;
    });

    const utils = render(
        <EditableMarkdown value={value} onSave={onSave} disabled={disabled} />,
    );

    return { ...utils, onSave, getEditor: () => editor };
};

describe('EditableMarkdown Component', () => {
    test('renders the editor content initialized with the current value', () => {
        setup('# Hello');

        expect(screen.getByTestId('editor-content')).toHaveTextContent(
            '# Hello',
        );
    });

    test('clicking the container makes the editor editable and focuses the end', async () => {
        const { getEditor } = setup('Some text');

        await userEvent.click(screen.getByTestId('editor-content'));

        const editor = getEditor();
        expect(editor.setEditable).toHaveBeenCalledWith(true);
        expect(editor.focus).toHaveBeenCalledWith('end');
    });

    test('clicking again while already editing does not re-trigger setEditable', async () => {
        const { getEditor } = setup('Some text');

        const container = screen.getByTestId('editor-content');
        await userEvent.click(container);
        const editor = getEditor();
        editor.setEditable.mockClear();
        editor.focus.mockClear();

        await userEvent.click(container);

        expect(editor.setEditable).not.toHaveBeenCalled();
        expect(editor.focus).not.toHaveBeenCalled();
    });

    test('does not start editing when disabled', async () => {
        const { getEditor } = setup('Some text', vi.fn(), true);

        await userEvent.click(screen.getByTestId('editor-content'));

        expect(getEditor().setEditable).not.toHaveBeenCalled();
    });

    test('committing on blur calls onSave when the markdown changed', () => {
        const onSave = vi.fn();
        const { getEditor } = setup('Old text', onSave);
        const editor = getEditor();

        editor.setContent('New text');
        editor.onBlur?.({ editor });

        expect(editor.setEditable).toHaveBeenCalledWith(false);
        expect(onSave).toHaveBeenCalledWith('New text');
    });

    test('does not call onSave on blur when the markdown is unchanged', () => {
        const onSave = vi.fn();
        const { getEditor } = setup('Same text', onSave);
        const editor = getEditor();

        editor.onBlur?.({ editor });

        expect(onSave).not.toHaveBeenCalled();
    });

    test('pressing Escape cancels the edit and reverts the content', () => {
        const onSave = vi.fn();
        const { getEditor } = setup('Original', onSave);
        const editor = getEditor();

        editor.setContent('Changed but not saved');
        fireEvent.keyDown(screen.getByTestId('editor-content'), {
            key: 'Escape',
        });

        expect(editor.setContent).toHaveBeenCalledWith('Original');
        expect(editor.setEditable).toHaveBeenCalledWith(false);
        expect(onSave).not.toHaveBeenCalled();
    });
});
