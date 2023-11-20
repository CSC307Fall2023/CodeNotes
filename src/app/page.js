'use client'
import { Button, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import Container from '@mui/material/Container'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Signup from './components/Signup'

export default function Home() {
    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === 'authenticated') {
            console.log('pushing to profile')
            router.push('/userprofile')
        }
    }, [status])

    return (
        <>
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
                            Praesent quis metus justo. Aenean sollicitudin
                            lectus congue risus elementum, vitae porta arcu
                            pharetra. Sed vel tincidunt tellus. In hac habitasse
                            platea dictumst. Computer Science. Cal Poly. Nullam
                            mollis pulvinar elit eget porttitor. Ut iaculis nisi
                            eu mattis commodo. Proin convallis felis ex, sit
                            amet posuere tortor suscipit quis. Nullam elementum
                            interdum metus, nec semper orci vestibulum ac. Sed
                            feugiat nibh id metus finibus, quis fermentum elit
                            posuere. Nullam luctus sed leo nec rutrum. Aenean
                            commodo ultrices velit non luctus. Ut tellus turpis,
                            aliquet a libero nec, aliquam vehicula dui. Nulla
                            facilisi. Donec ornare gravida est, faucibus
                            scelerisque elit suscipit sed. Quisque eget lorem
                            nec felis porta vehicula in in dolor. Nam dictum,
                            ante non volutpat pellentesque, risus sapien luctus
                            justo, vitae vestibulum magna ipsum ut velit.
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
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
