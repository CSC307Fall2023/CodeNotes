import {
    IconButton,
    Typography,
    Box,
    Tooltip,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from '@mui/material'
import { TreeItem } from '@mui/x-tree-view'
import React from 'react'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import EditIcon from '@mui/icons-material/Edit'
import { Delete } from '@mui/icons-material'

function NotebookTreeNode({
    notebook,
    notebooks,
    setNotebooks,
    activeNote,
    setActiveNote,
}) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const [renameOpen, setRenameOpen] = React.useState(false)
    const [deleteOpen, setDeleteOpen] = React.useState(false)

    const handleClick = (event) => {
        console.log('clicked')
        event.stopPropagation()
        event.preventDefault()
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleCreateNote = (e, notebook) => {
        e.stopPropagation()
        e.preventDefault()
        fetch('/api/notes', {
            method: 'POST',
            body: JSON.stringify({
                title: 'Untitled Note',
                notebookId: notebook.id,
            }),
        })
            .then((response) => response.ok && response.json())
            .then(async (note) => {
                if (note) {
                    await fetch('/api/notebooks', { method: 'GET' })
                        .then((response) => response.ok && response.json())
                        .then((notebooks) => {
                            notebooks && setNotebooks(notebooks)
                        })

                    setActiveNote(
                        notebooks
                            .find((n) => n.id === notebook.id)
                            .notes.find((n) => n.id === note.id)
                    )
                }
            })
    }

    const handleRenameNotebook = (e, notebook) => {
        e.preventDefault()
        let valid = e.currentTarget.reportValidity()
        const data = new FormData(e.currentTarget)
        if (!valid) {
            return false
        }
        const name = data.get('name')

        fetch(`/api/notebooks/${notebook.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
            }),
        })
            .then((response) => response.ok && response.json())
            .then((newNotebook) => {
                if (activeNote && activeNote.notebookId === notebook.id) {
                    setActiveNote({
                        ...activeNote,
                        notebookId: newNotebook.id,
                        notebook: newNotebook,
                    })
                } else {
                    fetch('/api/notebooks', { method: 'GET' })
                        .then((response) => response.ok && response.json())
                        .then((notebooks) => {
                            notebooks && setNotebooks(notebooks)
                        })
                }
            })
    }

    const handleDeleteNotebook = (e, notebook) => {
        e.preventDefault()
        fetch(`/api/notebooks/${notebook.id}`, {
            method: 'DELETE',
        })
            .then((response) => response.ok && response.json())
            .then(async (notebook) => {
                if (notebook) {
                    await fetch('/api/notebooks', { method: 'GET' })
                        .then((response) => response.ok && response.json())
                        .then((notebooks) => {
                            notebooks && setNotebooks(notebooks)
                        })
                }
            })
            .then(() => {
                setActiveNote(null)
            })
    }

    const RenameNotebookWindow = () => {
        return (
            <Dialog open={renameOpen} onClose={() => setRenameOpen(false)}>
                <DialogTitle>Rename Notebook</DialogTitle>
                <form
                    onSubmit={(e) => {
                        handleRenameNotebook(e, notebook)
                        setRenameOpen(false)
                    }}
                >
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            defaultValue={notebook.name}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setRenameOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }

    const DeleteNotebookWindow = () => {
        return (
            <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
                <DialogTitle>Delete Notebook</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this notebook?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            handleDeleteNotebook(e, notebook)
                            setDeleteOpen(false)
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <>
            <TreeItem
                nodeId={`notebook-${notebook.id}`}
                label={
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Tooltip
                                title={
                                    notebook.favorited
                                        ? 'Unfavorite Notebook'
                                        : 'Favorite Notebook'
                                }
                            >
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: notebook.favorited
                                            ? '#b58500'
                                            : '#888888',
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        fetch(`/api/notebooks/${notebook.id}`, {
                                            method: 'PATCH',
                                            body: JSON.stringify({
                                                favorited: !notebook.favorited,
                                            }),
                                        }).then((response) => {
                                            if (response.ok) {
                                                fetch('/api/notebooks', {
                                                    method: 'GET',
                                                })
                                                    .then(
                                                        (response) =>
                                                            response.ok &&
                                                            response.json()
                                                    )
                                                    .then((notebooks) => {
                                                        notebooks &&
                                                            setNotebooks(
                                                                notebooks
                                                            )
                                                    })
                                            }
                                        })
                                    }}
                                >
                                    {notebook.favorited ? (
                                        <StarIcon />
                                    ) : (
                                        <StarBorderIcon />
                                    )}
                                </IconButton>
                            </Tooltip>

                            <Typography variant="body1" sx={{ mr: 1 }}>
                                {notebook.name}
                            </Typography>
                        </Box>
                        <Tooltip title="Notebook Options">
                            <IconButton
                                size="small"
                                sx={{
                                    color: '#888888',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    handleClick(e)
                                }}
                            >
                                <MoreHorizIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                }
            >
                {notebook.notes?.map((note) => (
                    <TreeItem
                        key={`n-${note.id}`}
                        nodeId={`n-${note.id}`}
                        label={note.title}
                        onClick={() =>
                            fetch(`/api/notes/${note.id}`, {
                                method: 'GET',
                            })
                                .then(
                                    (response) => response.ok && response.json()
                                )
                                .then((note) => {
                                    note && setActiveNote(note)
                                })
                        }
                    />
                ))}
            </TreeItem>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                    onClick={(e) => {
                        handleCreateNote(e, notebook)
                    }}
                >
                    <AddCircleIcon sx={{ mr: 1 }} />
                    Add Note
                </MenuItem>
                {!notebook.classId && (
                    <MenuItem
                        onClick={() => {
                            setRenameOpen(true)
                            handleClose()
                        }}
                    >
                        <EditIcon sx={{ mr: 1 }} />
                        Rename Notebook
                    </MenuItem>
                )}
                {notebook.classId === null && (
                    <MenuItem
                        onClick={() => {
                            setDeleteOpen(true)
                            handleClose()
                        }}
                    >
                        <DeleteIcon sx={{ mr: 1 }} />
                        Delete Notebook
                    </MenuItem>
                )}
            </Menu>
            <RenameNotebookWindow />
            <DeleteNotebookWindow />
        </>
    )
}

export default NotebookTreeNode
