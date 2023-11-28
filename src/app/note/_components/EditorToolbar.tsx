import { Box, Divider } from '@mui/material'
import React, { useEffect } from 'react'
import SaveButton from './_toolbarButtons/SaveButton'
import UndoRedoSection from './_toolbarButtons/UndoRedoSection'
import LanguageSelector from './_toolbarButtons/LanguageSelector'
import RunAllButton from './_toolbarButtons/RunAllButton'
import CodeModeButton from './_toolbarButtons/CodeModeButton'
import ShareButton from './_toolbarButtons/ShareButton'
import ListsSection from './_toolbarButtons/ListsSection'
import TextFormatSection from './_toolbarButtons/TextFormatSection'
import FontSizeSection from './_toolbarButtons/FontSizeSection'
import TextStyleSelector from './_toolbarButtons/TextStyleSelector'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

function EditorToolbar({ note }) {
    const [codeMode, setCodeMode] = React.useState(false)
    const [editor] = useLexicalComposerContext()
    function ToolbarDivider() {
        return (
            <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{
                    mx: '0.25rem',
                }}
            />
        )
    }
    // set editor state when note changes
    useEffect(() => {
        if (editor) {
            if (!note.content) {
                editor.setEditorState(
                    editor.parseEditorState(
                        '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'
                    )
                )
                return
            }
            editor.setEditorState(editor.parseEditorState(note.content))
        }
    }, [note])

    function TextToolbar() {
        return (
            <>
                <SaveButton note={note} />
                <ToolbarDivider />
                <UndoRedoSection />
                <ToolbarDivider />
                <TextStyleSelector />
                <ToolbarDivider />
                <FontSizeSection />
                <ToolbarDivider />
                <TextFormatSection />
                <ToolbarDivider />
                <ListsSection />
                <ToolbarDivider />
                <CodeModeButton codeMode={codeMode} setCodeMode={setCodeMode} />
                <Box sx={{ flexGrow: 1 }} />
                <ShareButton />
            </>
        )
    }

    function CodeToolbar() {
        return (
            <>
                <SaveButton note={note} />
                <ToolbarDivider />
                <UndoRedoSection />
                <ToolbarDivider />
                <LanguageSelector />
                <ToolbarDivider />
                <RunAllButton />
                <ToolbarDivider />
                <CodeModeButton codeMode={codeMode} setCodeMode={setCodeMode} />
            </>
        )
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    // spaces between buttons
                    '& > *': {
                        mx: '0.25rem',
                    },
                }}
            >
                {codeMode ? <CodeToolbar /> : <TextToolbar />}
            </Box>
        </>
    )
}

export default EditorToolbar
