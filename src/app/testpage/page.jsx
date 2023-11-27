'use client'

import { Container } from '@mui/material'
import Editor from '../note/_components/Editor'
import NavBar from '../components/NavBar'

function TestPage() {
    return (
        <>
            <Container maxWidth={'lg'} sx={{ pt: 2 }}>
                <Editor note={null} />
            </Container>
        </>
    )
}

export default TestPage
