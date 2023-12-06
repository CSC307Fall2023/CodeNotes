'use client'
import React from 'react'
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Tooltip,
} from '@mui/material'

import { useRouter } from 'next/navigation'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import InfoIcon from '@mui/icons-material/Info'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import CheckIcon from '@mui/icons-material/Check'

function NotebookItem({ notebook, fetchNotebooks }) {
    const { name, notes, id, ownerId } = notebook

    const router = useRouter()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const [notebookInfoOpen, setNotebookInfoOpen] = React.useState(false)
    const [isEditing, setIsEditing] = React.useState(false)
    const [editName, setEditName] = React.useState(name)

    const handleClick = (event) => {
        console.log('clicked')
        event.stopPropagation()
        event.preventDefault()
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleNotebookClick = () => {
        router.push(`/note?open=true`)
    }

    const handleNotebookInfoClick = (event) => {
        event.stopPropagation()
        event.preventDefault()
        setAnchorEl(null)
        setNotebookInfoOpen(true)
        console.log('clicked')
    }

    const handleNotebookUnfavoriteClick = async (event) => {
        event.stopPropagation()
        event.preventDefault()
        await fetch(`/api/notebooks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                favorited: false,
            }),
        })
        fetchNotebooks(1)
    }

    return (
        <>
            <Card sx={{ display: 'flex' }}>
                <CardActionArea component="a" onClick={handleNotebookClick}>
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {notes?.length} notes
                                </Typography>
                            </Box>

                            <Box sx={{ flexGrow: 1 }} />
                            <IconButton
                                size="small"
                                sx={{ height: '24px', width: '24px' }}
                                onClick={handleClick}
                                onMouseDown={(event) => event.stopPropagation()}
                            >
                                <MoreHorizIcon />
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem
                                    onClick={handleNotebookInfoClick}
                                    onMouseDown={(event) =>
                                        event.stopPropagation()
                                    }
                                >
                                    <InfoIcon
                                        sx={{
                                            marginRight: 2,
                                        }}
                                    ></InfoIcon>
                                    <Typography variant="body1">
                                        Notebook Info
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={handleNotebookUnfavoriteClick}
                                    onMouseDown={(event) => {
                                        event.stopPropagation()
                                    }}
                                >
                                    <StarBorderIcon
                                        sx={{
                                            marginRight: 2,
                                        }}
                                    ></StarBorderIcon>
                                    <Typography variant="body1">
                                        Unfavorite
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Dialog
                open={notebookInfoOpen}
                onClose={() => setNotebookInfoOpen(false)}
            >
                <DialogTitle>Notebook Info</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        label="Name"
                        defaultValue={editName}
                        variant="standard"
                        onChange={(event) => {
                            console.log(event.target.value)
                            setIsEditing(true)
                            setEditName(event.target.value)
                        }}
                        error={isEditing && editName === ''}
                        helperText={
                            isEditing &&
                            editName === '' &&
                            'Name cannot be empty'
                        }
                        InputProps={{
                            endAdornment: isEditing && (
                                <Tooltip title="Save">
                                    <IconButton
                                        size="small"
                                        sx={{ height: '24px', width: '24px' }}
                                        onClick={async () => {
                                            setIsEditing(false)
                                            await fetch(
                                                `/api/notebooks/${id}`,
                                                {
                                                    method: 'PATCH',
                                                    headers: {
                                                        'Content-Type':
                                                            'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        name: editName,
                                                    }),
                                                }
                                            )
                                            console.log('patched')
                                            // update notebooks list
                                            fetchNotebooks()
                                            setNotebookInfoOpen(false)
                                        }}
                                        onMouseDown={(event) =>
                                            event.stopPropagation()
                                        }
                                        disabled={editName === ''}
                                    >
                                        <CheckIcon
                                            color={
                                                editName === ''
                                                    ? 'disabled'
                                                    : 'primary'
                                            }
                                        />
                                    </IconButton>
                                </Tooltip>
                            ),
                        }}
                    />
                    <br />
                    <br />
                    <TextField
                        label="ID"
                        defaultValue={id}
                        variant="standard"
                        disabled
                    />
                    <br />
                    <br />
                    <TextField
                        label="Owner"
                        defaultValue={ownerId}
                        variant="standard"
                        disabled
                    />
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => setNotebookInfoOpen(false)}
                    >
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default NotebookItem
