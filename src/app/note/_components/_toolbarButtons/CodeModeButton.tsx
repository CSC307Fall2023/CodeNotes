import { IconButton, Tooltip } from '@mui/material'
import CodeOffIcon from '@mui/icons-material/CodeOff'
import CodeIcon from '@mui/icons-material/Code'

function CodeModeButton({ codeMode, setCodeMode }) {
    return (
        <Tooltip title={codeMode ? 'Exit Code Mode' : 'Enter Code Mode'}>
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
