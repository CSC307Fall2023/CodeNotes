'use client'

import Box from '@mui/material/Box';
import React from 'react';
import Avatar from '@mui/material/Avatar';


const boxStyle = {
    backgroundColor: '#D9D9D9', // Gray color
    height: '2px', // Adjust the height as needed
    width: '100%', // Span the full width of the screen

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
};


const avatar = {
    width: 250,
    height: 250,
};

export default function Note() {
    
    return (
        <Box sx={boxStyle}>
            <Avatar sx={avatar} alt="Profile Picture" src="profilePicture.jpeg" />

            <h1>Name</h1>
            <h2>Computer Science 2025</h2>
        
        </Box>
        
    )
}