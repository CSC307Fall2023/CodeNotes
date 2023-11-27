import { Button } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

function RunAllButton() {
    return (
        <Button
            startIcon={<PlayArrowIcon />}
            onClick={() => {
                console.log('run')
            }}
        >
            Run All
        </Button>
    )
}

export default RunAllButton
