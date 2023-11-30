import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import theme from '@/app/lexicalEditorTheme'
import './editor.css'
import ToolbarPlugin from './editorplugins/toolbarplugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { ListItemNode, ListNode } from '@lexical/list'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { TRANSFORMERS } from '@lexical/markdown'
import LinkNodePlugin from './editorplugins/LinkNodePlugin'
import ListMaxIndentLevelPlugin from './editorplugins/ListMaxIndentLevelPlugin'
import CodeHighlightPlugin from './editorplugins/CodeHighlightPlugin'
import AutoLinkPlugin from './editorplugins/AutoLinkPlugin'

function Editor({ activeNote }) {
    function onError(error) {
        console.error(error)
    }

    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            TableNode,
            TableCellNode,
            TableRowNode,
            AutoLinkNode,
            LinkNode,
        ],
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <ToolbarPlugin activeNote={activeNote} />
            <div className="editor-inner">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="editor-input" />
                    }
                    placeholder={
                        <div className="editor-placeholder">
                            Enter some rich text...
                        </div>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
                <CodeHighlightPlugin />
                <ListPlugin />
                <LinkPlugin />
                <AutoLinkPlugin />
                <LinkNodePlugin />
                <ListMaxIndentLevelPlugin maxDepth={7} />
                <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            </div>
        </LexicalComposer>
    )
}

export default Editor
