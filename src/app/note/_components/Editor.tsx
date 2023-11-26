import * as React from 'react'
import './Editor.css'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import EditorToolbar from './EditorToolbar'

const theme = {}

function onError(error) {
    console.error(error)
}

function Editor() {
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
    }

    return (
        <div className="editor">
            <LexicalComposer initialConfig={initialConfig}>
                <EditorToolbar />
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
