import {
    Box,
    Button,
    Divider,
    IconButton,
    InputAdornment,
    MenuItem,
    TextField,
    Tooltip,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
import FormatSizeIcon from '@mui/icons-material/FormatSize'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import CodeOffIcon from '@mui/icons-material/CodeOff'
import CodeIcon from '@mui/icons-material/Code'
import React from 'react'

function EditorToolbar() {
    const [codeMode, setCodeMode] = React.useState(false)

    function TextToolbar() {
        return (
            <>
                <Tooltip title="Save">
                    <Button
                        startIcon={<SaveIcon />}
                        onClick={() => {
                            console.log('save')
                        }}
                    >
                        Save
                    </Button>
                </Tooltip>
                <Tooltip title="Undo">
                    <IconButton
                        onClick={() => {
                            console.log('undo')
                        }}
                    >
                        <UndoIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Redo">
                    <IconButton
                        onClick={() => {
                            console.log('redo')
                        }}
                    >
                        <RedoIcon />
                    </IconButton>
                </Tooltip>
                <Divider orientation="vertical" variant="middle" flexItem />
                <TextField
                    variant="standard"
                    select
                    defaultValue={'paragraph'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FormatSizeIcon />
                            </InputAdornment>
                        ),
                    }}
                >
                    <MenuItem value={'paragraph'}>Paragraph</MenuItem>
                    <MenuItem value={'heading1'}>Heading 1</MenuItem>
                    <MenuItem value={'heading2'}>Heading 2</MenuItem>
                    <MenuItem value={'blockquote'}>Blockquote</MenuItem>
                    <MenuItem value={'codeblock'}>Codeblock</MenuItem>
                </TextField>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <IconButton
                        onClick={() => {
                            console.log('increase font size')
                        }}
                        size="small"
                    >
                        <AddIcon />
                    </IconButton>
                    <TextField select defaultValue={'12'} size="small">
                        <MenuItem value={'12'}>12</MenuItem>
                        <MenuItem value={'16'}>16</MenuItem>
                        <MenuItem value={'18'}>18</MenuItem>
                        <MenuItem value={'20'}>20</MenuItem>
                        <MenuItem value={'22'}>22</MenuItem>
                        <MenuItem value={'24'}>24</MenuItem>
                        <MenuItem value={'26'}>26</MenuItem>
                        <MenuItem value={'28'}>28</MenuItem>
                        <MenuItem value={'30'}>30</MenuItem>
                        <MenuItem value={'32'}>32</MenuItem>
                    </TextField>
                    <IconButton
                        size="small"
                        onClick={() => {
                            console.log('decrease font size')
                        }}
                    >
                        <RemoveIcon />
                    </IconButton>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box>
                    <IconButton
                        size="small"
                        onClick={() => {
                            console.log('bold')
                        }}
                    >
                        <FormatBoldIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => {
                            console.log('italic')
                        }}
                    >
                        <FormatItalicIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => {
                            console.log('underline')
                        }}
                    >
                        <FormatUnderlinedIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => {
                            console.log('color')
                        }}
                    >
                        <FormatColorTextIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => {
                            console.log('background color')
                        }}
                    >
                        <FormatColorFillIcon />
                    </IconButton>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box>
                    <Tooltip title="Insert Unordered List">
                        <IconButton
                            size="small"
                            onClick={() => {
                                console.log('unordered list')
                            }}
                        >
                            <FormatListBulletedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Insert Ordered List">
                        <IconButton
                            size="small"
                            onClick={() => {
                                console.log('ordered list')
                            }}
                        >
                            <FormatListNumberedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box>
                    <Tooltip title="Insert Code Block">
                        <IconButton
                            size="small"
                            onClick={() => {
                                setCodeMode(true)
                            }}
                        >
                            <CodeIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </>
        )
    }

    function CodeToolbar() {
        return (
            <>
                <Tooltip title="Save">
                    <Button
                        startIcon={<SaveIcon />}
                        onClick={() => {
                            console.log('save')
                        }}
                    >
                        Save
                    </Button>
                </Tooltip>
                <Tooltip title="Undo">
                    <IconButton
                        size="small"
                        onClick={() => {
                            console.log('undo')
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
                        }}
                    >
                        <RedoIcon />
                    </IconButton>
                </Tooltip>
                <Divider orientation="vertical" variant="middle" flexItem />
                <TextField
                    variant="standard"
                    select
                    defaultValue={'python'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CodeIcon />
                            </InputAdornment>
                        ),
                    }}
                >
                    <MenuItem value={'python'}>Python</MenuItem>
                    <MenuItem value={'javascript'}>JavaScript</MenuItem>
                    <MenuItem value={'java'}>Java</MenuItem>
                    <MenuItem value={'c'}>C</MenuItem>
                    <MenuItem value={'cpp'}>C++</MenuItem>
                    <MenuItem value={'csharp'}>C#</MenuItem>
                </TextField>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Button
                    startIcon={<PlayArrowIcon />}
                    onClick={() => {
                        console.log('run')
                    }}
                >
                    Run All
                </Button>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Tooltip title="Exit Code Mode">
                    <IconButton
                        size="small"
                        onClick={() => {
                            setCodeMode(false)
                        }}
                    >
                        <CodeOffIcon />
                    </IconButton>
                </Tooltip>
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
