import { Box, IconButton, MenuItem, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

function FontSizeSection() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <IconButton
                size="small"
                onClick={() => {
                    console.log('decrease font size')
                }}
            >
                <RemoveIcon />
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
                onClick={() => {
                    console.log('increase font size')
                }}
                size="small"
            >
                <AddIcon />
            </IconButton>
        </Box>
    )
}

export default FontSizeSection
