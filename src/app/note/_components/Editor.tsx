import * as React from 'react'
import './Editor.css'

import {
    InitialConfigType,
    LexicalComposer,
} from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import EditorToolbar from './EditorToolbar'
import { HeadingNode } from '@lexical/rich-text'

const theme = {}

function onError(error) {
    console.error(error)
}

function Editor({ note }) {
    const initialConfig: InitialConfigType = {
        namespace: 'MyEditor',
        theme,
        nodes: [HeadingNode],
        onError,
        editorState: note.content ? note.content : null,
    }

    return (
        <div className="editor">
            <LexicalComposer initialConfig={initialConfig}>
                <EditorToolbar note={note} />
                <RichTextPlugin
                    contentEditable={<ContentEditable id="content-editable" />}
                    placeholder={<div id="placeholder">Enter some text...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
            </LexicalComposer>
        </div>
    )
}

export default Editor
