'use client'
import * as React from 'react'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled, useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import NavBar from '../components/NavBar'
import { TextField, Tooltip, Dialog } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import NotebookTree from './_components/notebooktree'
import { Delete } from '@mui/icons-material'
import { Button, DialogActions, DialogTitle } from '@mui/material'
import Editor from './_components/editor'

const drawerWidth = 400

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
)

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}))

export default function Note() {
    const theme = useTheme()
    const [open, setOpen] = React.useState(
        useSearchParams().get('open') === 'true'
    )

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const [notebooks, setNotebooks] = React.useState([])
    const [activeNote, setActiveNote] = React.useState(null)
    const [activeNoteRename, setActiveNoteRename] = React.useState(null)

    // use this only once - only call this once [on load of component if array is empty]
    useEffect(() => {
        fetch('/api/notebooks', { method: 'GET' })
            .then((response) => response.ok && response.json())
            .then((notebooks) => {
                notebooks && setNotebooks(notebooks)
            })
        console.log('settting active note rename')
        console.log('settting active note rename')
        setActiveNoteRename(activeNote)
    }, [activeNote])

    const handleCreateNotebook = () => {
        fetch('/api/notebooks', {
            method: 'POST',
            body: JSON.stringify({ name: 'New Notebook' }),
        })
            .then((response) => response.ok && response.json())
            .then((notebook) => {
                setNotebooks([...notebooks, notebook])
            })
    }

    const [deleteOpen, setDeleteOpen] = React.useState(false)

    const deleteActiveNote = () => {
        fetch(`/api/notes/${activeNote.id}`, { method: 'DELETE' })
            .then((response) => response.ok && response.json())
            .then((note) => {
                setActiveNote(
                    notebooks.find((notebook) => notebook.id === note.id)
                )
                setDeleteOpen(false)
            })
    }

    return (
        <>
            <NavBar />
            <Box sx={{ display: 'flex' }}>
                <Toolbar open={open}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                        zIndex: 0,
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        {/* <Typography variant="h4">Folders</Typography> */}
                    </DrawerHeader>
                    <Divider />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? (
                                <KeyboardDoubleArrowLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                        <Typography variant="h6" sx={{ ml: '10px' }}>
                            Notebooks
                        </Typography>
                    </Box>
                    <Divider />
                    <NotebookTree
                        notebooks={notebooks}
                        setNotebooks={setNotebooks}
                        activeNote={activeNote}
                        setActiveNote={setActiveNote}
                    />
                    <Divider />
                    <Box textAlign="center" sx={{ m: 2 }}>
                        <Tooltip title="Add Notebook">
                            <Fab
                                size="small"
                                color="primary"
                                aria-label="add"
                                onClick={handleCreateNotebook}
                            >
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Box>
                </Drawer>
                <Main open={open}>
                    <Container>
                        {activeNote && activeNoteRename ? (
                            <>
                                <Box>
                                    <Typography variant="h4">
                                        {activeNote.notebook.class?.name}
                                    </Typography>
                                    <Typography variant="h4">
                                        {activeNote.notebook.name}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <TextField
                                        label=""
                                        value={activeNoteRename.title}
                                        fullWidth
                                        variant="standard"
                                        inputProps={{
                                            style: {
                                                fontSize: '2.5rem',
                                                fontWeight: 700,
                                            },
                                        }}
                                        onChange={(event) => {
                                            setActiveNoteRename({
                                                ...activeNoteRename,
                                                title: event.target.value,
                                            })
                                        }}
                                        onBlur={(event) => {
                                            fetch(
                                                `/api/notes/${activeNote.id}`,
                                                {
                                                    method: 'PATCH',
                                                    body: JSON.stringify({
                                                        title: event.target
                                                            .value,
                                                    }),
                                                }
                                            ).then((response) => {
                                                if (response.ok) {
                                                    setActiveNote({
                                                        ...activeNote,
                                                        title: event.target
                                                            .value,
                                                    })
                                                }
                                            })
                                        }}
                                    />

                                    <Box sx={{ flexGrow: 1 }} />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Tooltip title="Delete Note">
                                            <IconButton
                                                onClick={() => {
                                                    setDeleteOpen(true)
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                        <Dialog open={deleteOpen}>
                                            <DialogTitle>
                                                Are you sure you want to delete
                                                this note?
                                            </DialogTitle>
                                            <DialogActions>
                                                <Button
                                                    onClick={deleteActiveNote}
                                                >
                                                    Yes
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                        setDeleteOpen(false)
                                                    }
                                                >
                                                    No
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </Box>
                                </Box>
                                <br />
                                <br />
                                <Editor activeNote={activeNote}></Editor>
                            </>
                        ) : (
                            // make this centered vertically and horizontally
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                }}
                            >
                                <Typography variant="h4">
                                    Select a notebook to get started
                                </Typography>
                            </Box>
                        )}
                    </Container>
                </Main>
            </Box>
        </>
    )
}
