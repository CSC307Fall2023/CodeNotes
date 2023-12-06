'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Avatar from '@mui/material/Avatar'
import NavBar from '@/app/components/NavBar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import ClassList from './_components/classlist'
import { Divider } from '@mui/material'

const avatar = {
    width: 125,
    height: 125,
}

export default function Account({ params }) {
    const router = useRouter()

    const [user, setUser] = useState({})

    // useeffect to get user profile
    useEffect(() => {
        fetch(`/api/users/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data)
            })
    }, [])

    return (
        <>
            <NavBar variant="search"></NavBar>
            <Container
                maxWidth="xl"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '5%',
                }}
            >
                <Avatar sx={avatar}></Avatar>
                <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                    {user.profile?.name}
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {user.email}
                </Typography>
                <br />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {user.profile?.major}
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Class of {user.profile?.year}
                </Typography>
                <br />
                <Divider variant="middle" sx={{ width: '100%' }} />
                <br />
                <ClassList classes={user.studentin}></ClassList>
                <br />
                <Divider variant="middle" sx={{ width: '100%' }} />
            </Container>
        </>
    )
}
