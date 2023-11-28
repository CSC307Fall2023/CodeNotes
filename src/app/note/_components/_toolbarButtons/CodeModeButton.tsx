import { IconButton, Tooltip } from '@mui/material'
import CodeOffIcon from '@mui/icons-material/CodeOff'
import CodeIcon from '@mui/icons-material/Code'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

function CodeModeButton({ codeMode, setCodeMode }) {
    const [editor] = useLexicalComposerContext()
    return (
        <Tooltip
            title={
                codeMode
                    ? 'Exit Code Mode (Ctrl+/)'
                    : 'Enter Code Mode (Ctrl+/)'
            }
        >
            <IconButton
                size="small"
                onClick={() => {
                    setCodeMode(!codeMode)
                }}
            >
                {codeMode ? <CodeOffIcon /> : <CodeIcon />}
            </IconButton>
        </Tooltip>
    )
}

export default CodeModeButton
