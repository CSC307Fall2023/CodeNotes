import React from 'react'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Tooltip,
    TextField,
    Button,
    DialogActions,
    MenuItem,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

function ClassList({ user, refresh }) {
    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" component="div">
                    My Classes
                </Typography>
                <Tooltip title="Join Class">
                    <IconButton size="small" onClick={handleClickOpen}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <br />
            {user.studentin && user.studentin.length !== 0 ? (
                user.studentin.map((classItem) => (
                    <Typography
                        variant="body1"
                        component="div"
                        display={'inline'}
                        key={classItem.id}
                    >
                        <Link href={`/class/${classItem.id}`}>
                            {classItem.name}
                        </Link>{' '}
                    </Typography>
                ))
            ) : (
                <>
                    <Typography
                        variant="body1"
                        component="div"
                        display={'inline'}
                    >
                        You are not enrolled in any classes.
                    </Typography>
                </>
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Join Class</DialogTitle>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault()
                        let valid = e.currentTarget.checkValidity()
                        const data = new FormData(e.currentTarget)
                        if (valid) {
                            const res = await fetch(
                                `/api/classes/${data.get('classId')}/join`,
                                {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        password: data.get('password'),
                                    }),
                                }
                            )
                            if (res.status === 200) {
                                refresh()
                                setOpen(false)
                            } else {
                                console.log('error')
                            }
                        }
                    }}
                >
                    <DialogContent dividers>
                        <Box
                            sx={{
                                '& .MuiTextField-root': {
                                    my: 1,
                                    width: '25ch',
                                },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                required
                                id="classId"
                                name="classId"
                                label="Class Id"
                                variant="standard"
                                fullWidth
                            ></TextField>
                            <TextField
                                required
                                id="password"
                                name="password"
                                label="Class Password"
                                variant="standard"
                                fullWidth
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" type="submit">
                            Join Class
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default ClassList
