'use client'

import Box from '@mui/material/Box';

export default function Note() {
    const boxStyle = {
        backgroundColor: '#D9D9D9', // Gray color
        height: '2px', // Adjust the height as needed
        width: '100%', // Span the full width of the screen
    };


    

    return (
        <>
            <h2>CSC 307</h2>
            <h1>HTML and JS Introduction</h1>
        
        <Box sx={boxStyle}>

        </Box>
        </>
    )
}