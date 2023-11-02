'use client'

import { usePathname } from 'next/navigation'
import { Avatar, Box, Button } from '@mui/material'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import AdbIcon from '@mui/icons-material/Adb'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Login from './Login'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Signup from './Signup'
import { useSession } from 'next-auth/react'
import { Divider } from '@mui/material'
import { signOut } from 'next-auth/react'
import Menu from '@mui/material/Menu'
import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Logout from '@mui/icons-material/Logout'
import ListItemIcon from '@mui/material/ListItemIcon'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useRouter } from 'next/navigation'

export default function NavBar({ title, domain }) {
    const router = useRouter()
    const { data: session, status } = useSession()

    const pathname = usePathname()
    const links = []

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleSignOut = () => {
        signOut({ callbackUrl: `${domain}/` })
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
                        src={session.user.image}
                        sx={{ marginLeft: '20px' }}
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
                            <AccountCircleIcon fontSize="small" />
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
            <CssBaseline />
            <AppBar
                position="static"
                sx={{ paddingX: 2, background: 'transparent' }}
            >
                <Toolbar disableGutters sx={{ background: 'transparent' }}>
                    <img
                        src="/CalPoly.png"
                        alt="logo"
                        height="45"
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
                        width="40"
                        height="40"
                        style={{ marginLeft: '20px', marginRight: '20px' }}
                    />
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            textDecoration: 'none',
                        }}
                    >
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {links.map((l) => {
                            const isActive = l.path === pathname
                            return (
                                <Button
                                    variant="contained"
                                    component={Link}
                                    href={l.path}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                        textDecoration: isActive
                                            ? 'underline'
                                            : 'inherit',
                                    }}
                                    key={l.path}
                                >
                                    {l.name}
                                </Button>
                            )
                        })}
                    </Box>
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
