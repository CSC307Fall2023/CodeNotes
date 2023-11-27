import { IconButton, Box, Tooltip } from '@mui/material'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'

function ListsSection() {
    return (
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
    )
}

export default ListsSection
