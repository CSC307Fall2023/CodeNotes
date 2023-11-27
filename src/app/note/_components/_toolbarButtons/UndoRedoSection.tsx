import { Box, IconButton, Tooltip } from '@mui/material'
import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
import { UNDO_COMMAND, REDO_COMMAND } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

function UndoRedoSection() {
    const [editor] = useLexicalComposerContext()
    return (
        <Box>
            <Tooltip title="Undo">
                <IconButton
                    size="small"
                    onClick={() => {
                        console.log('undo')
                        editor.dispatchCommand(UNDO_COMMAND, null)
                    }}
                >
                    <UndoIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Redo">
                <IconButton
                    size="small"
                    onClick={() => {
                        console.log('redo')
                        editor.dispatchCommand(REDO_COMMAND, null) // Provide the second argument
                    }}
                >
                    <RedoIcon />
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default UndoRedoSection
