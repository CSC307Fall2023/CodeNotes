'use client'

import Box from '@mui/material/Box';
import Link from 'next/link';

import "../styles/global.css"



export default function Note() {
    const boxStyle = {
        backgroundColor: '#D9D9D9', // Gray color
        height: '2px', // Adjust the height as needed
        width: '100%', // Span the full width of the screen
    };

    return (
        <>            
            <h2>CSC 307</h2>
            <h1>Notepage</h1>

            <div class="profile_page">
                <p class="text"><Link href="/userprofile">Profile Page</Link></p>
            </div>
        
        <Box sx={boxStyle}>

        </Box>
        </>
    )
}