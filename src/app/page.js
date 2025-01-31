'use client'
import { Button, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import Container from '@mui/material/Container'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Signup from './components/Signup'
import NavBar from './components/NavBar'

export default function Home() {
    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === 'authenticated') {
            router.push(`/account`)
        }
    }, [status])

    return (
        <>
            <NavBar title="CodeNotes" domain="http://localhost:3000" />
            <Container maxWidth="xl">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                    sx={{ minHeight: '90vh' }}
                >
                    <Grid item xs={6}>
                        <Typography
                            variant="h1"
                            sx={{
                                marginBottom: '1rem',
                            }}
                        >
                            What is CodeNotes?
                        </Typography>
                        <Typography
                            variant="body1"
                            align="justify"
                            sx={{
                                marginBottom: '1rem',
                            }}
                        >
                            “Code Notes” is an innovative online platform that
                            creates the perfect interface to take computer
                            science notes. Tailored for Cal Poly students, it
                            seamlessly blends code and text all in one cohesive
                            file. It combines the simplicity of a Google Doc
                            with the visuals of a Jupyter/Google Colab Notebook.
                            Users can create folders known as ‘notebooks’ to
                            organize notes for each class. Under each notebook,
                            users can create a ‘note’ where they can write down
                            material they learn from their computer science
                            class that day, including both text and code.
                            Similar to a Google Doc, there will be a toolbar at
                            the top of the note offering a set of tools and
                            features available for formatting and editing. Code
                            Notes also allows students to join classes to
                            seamlessly connect and synchronize their notes with
                            their teachers. “Code Notes” is not just a
                            note-taking platform but a dynamic tool to connect
                            students and instructors.
                        </Typography>
                        {status === 'authenticated' ? (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => router.push('/notes')}
                            >
                                Get Started
                            </Button>
                        ) : (
                            <Signup
                                buttonText="Get Started"
                                variant="contained"
                            />
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <img
                            src="/CodeNotes.png"
                            alt="CodeNotes"
                            width="100%"
                            style={{
                                border: '1px solid black',
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
