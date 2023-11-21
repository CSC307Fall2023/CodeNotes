'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Avatar from '@mui/material/Avatar'
import NavBar from '../../components/NavBar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import NotebookRow from './_components/notebookrow'
import ClassList from './_components/classlist'
import { Divider, Pagination } from '@mui/material'

const avatar = {
    width: 125,
    height: 125,
}

export default function Profile({ params }) {
    const router = useRouter()
    const { data: session, status } = useSession()

    // useeffect to make sure user is logged in
    // if not, redirect to home page
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/')
        }
    }, [status])

    const [user, setUser] = useState({})
    const [notebooks, setNotebooks] = useState([])
    const [classes, setClasses] = useState([])

    // useeffect to get user profile
    useEffect(() => {
        fetch(`/api/users/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data)
            })
    }, [])

    // useeffect to get user's notebooks
    useEffect(() => {
        fetch(`/api/notebooks`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setNotebooks(data)
                console.log(data)
            })
    }, [])

    // useeffect to get user's classes
    useEffect(() => {
        fetch(`/api/users/${params.id}/classes`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setClasses(data)
                console.log(data)
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
                <Divider variant="middle" sx={{ width: '100%' }} />
                <ClassList classes={classes}></ClassList>
                <Divider variant="middle" sx={{ width: '100%' }} />
                {parseInt(params.id) === session?.user?.id ? (
                    <NotebookRow notebooks={notebooks}></NotebookRow>
                ) : (
                    <></>
                )}
                <br />
                <Pagination count={10} />
                <br />
                <Divider variant="middle" sx={{ width: '100%' }} />
            </Container>
        </>
    )
}
