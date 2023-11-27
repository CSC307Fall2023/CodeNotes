import { Box, InputAdornment, MenuItem, TextField } from '@mui/material'
import FormatSizeIcon from '@mui/icons-material/FormatSize'

function TextStyleSelector() {
    return (
        <Box>
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
            </TextField>
        </Box>
    )
}

export default TextStyleSelector
