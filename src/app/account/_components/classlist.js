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

function ClassList({ classes }) {
    const [open, setOpen] = React.useState(false)
    const [updatedClasses, setUpdatedClasses] = React.useState(classes)
    const [allClasses, setAllClasses] = React.useState(null)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    React.useEffect(() => {
        fetch(`/api/classes`)
            .then((res) => res.json())
            .then((data) => {
                setAllClasses(data)
            })
    }, [])

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
            {updatedClasses && updatedClasses.length !== 0 ? (
                updatedClasses.map((classItem) => (
                    <Typography
                        variant="body2"
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
                            const res = await fetch(`/api/classes/join`, {
                                method: 'POST',
                                body: JSON.stringify({
                                    classId: data.get('classId'),
                                    password: data.get('password'),
                                }),
                            })
                            if (res.status === 200) {
                                const newClass = await res.json()
                                setUpdatedClasses([...updatedClasses, newClass])
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
                                label="Class Name"
                                variant="standard"
                                fullWidth
                                select
                            >
                                {allClasses ? (
                                    allClasses.map((classItem) => (
                                        <MenuItem
                                            key={classItem.id}
                                            value={classItem.id}
                                        >
                                            {classItem.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </TextField>
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
