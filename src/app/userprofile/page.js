'use client'

import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

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
    const [pic, changePic] = useState("profilePicture.jpg");

    const handleClick = () => {
        if (pic == "profilePicture.jpg")
            changePic("profilePicture2.jpg")
        else
            changePic("profilePicture.jpg")
    };

    return (
        <>
        
            <h2>CSC 307</h2>
            <h1>User Profile</h1>

            <h2><Link href="./notes">Note</Link></h2>
        <Box sx={boxStyle}>

            <IconButton color="secondary" aria-label="Edit" onClick={handleClick}>
                <Avatar sx={avatar} variant="circular" alt="Profile Picture" src={pic} />
            </IconButton>

            <h1>Name</h1>
            <h2>Computer Science 2025</h2>
        
        </Box>

        </>
    )
}