'use client'

import { Avatar, Box, Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Login from './Login'
import Signup from './Signup'
import { useSession } from 'next-auth/react'
import { Divider } from '@mui/material'
import { signOut } from 'next-auth/react'
import Menu from '@mui/material/Menu'
import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Logout from '@mui/icons-material/Logout'
import ListItemIcon from '@mui/material/ListItemIcon'
import { useRouter } from 'next/navigation'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

export default function NavBar({
    title = 'CodeNotes',
    domain = 'http://localhost:3000',
    variant = 'default',
    ...props
}) {
    const router = useRouter()
    const { data: session, status } = useSession()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleSignOut = async () => {
        await signOut({ callbackUrl: `${domain}/` })
        router.push('/')
    }

    const handleProfile = () => {
        router.push('/userprofile')
    }

    let loginSection

    if (status === 'authenticated') {
        loginSection = (
            <>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {session.user.email}
                    </Typography>

                    <Avatar
                        alt={session.user.name}
                        sx={{
                            marginLeft: '20px',
                            height: '30px',
                            width: '30px',
                        }}
                    />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleProfile}>
                        <ListItemIcon>
                            <Avatar
                                alt={session.user.name}
                                sx={{
                                    height: '25px',
                                    width: '25px',
                                }}
                            />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={handleSignOut}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </>
        )
    } else {
        loginSection = (
            <>
                <Signup />
                <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                ></Divider>
                <Login />
            </>
        )
    }

    return (
        <>
            <AppBar
                position="static"
                sx={{ paddingX: 2, paddingY: 0 }}
                elevation={0}
            >
                <Toolbar disableGutters>
                    <img
                        src="/CalPoly.png"
                        alt="logo"
                        height="30"
                        position="inline-block"
                        style={{ marginRight: '20px' }}
                    />
                    <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                    ></Divider>
                    <img
                        src="/logo.png"
                        alt="logo"
                        width={30}
                        height={30}
                        style={{ marginLeft: '20px', marginRight: '20px' }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            textDecoration: 'none',
                            color: '#154734',
                        }}
                    >
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    ></Box>
                    {variant === 'search' && (
                        <TextField
                            id="search"
                            label="Search Notebooks/Notes"
                            variant="standard"
                            autoComplete="off"
                            sx={{
                                marginLeft: '20px',
                                marginRight: '20px',
                                width: '50%',
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    ></Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            {loginSection}
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}
