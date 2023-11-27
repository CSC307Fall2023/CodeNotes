import { Box, IconButton } from '@mui/material'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'

function TextFormatSection() {
    return (
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
    )
}

export default TextFormatSection
