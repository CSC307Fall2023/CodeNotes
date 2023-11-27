import { Button } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'

function ShareButton() {
    return (
        <Button
            startIcon={<ShareIcon />}
            onClick={() => {
                console.log('run')
            }}
        >
            Share
        </Button>
    )
}

export default ShareButton
