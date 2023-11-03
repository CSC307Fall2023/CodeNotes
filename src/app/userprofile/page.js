'use client'

import Box from '@mui/material/Box'
import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import Link from 'next/link'

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const boxStyle = {
    backgroundColor: '#D9D9D9', // Gray color
    height: '2px', // Adjust the height as needed
    width: '100%', // Span the full width of the screen

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
}

const avatar = {
    width: 250,
    height: 250,
}

export default function Note() {
    const [pic, changePic] = useState('profilePicture.jpg')

    const handleClick = () => {
        if (pic == 'profilePicture.jpg') changePic('profilePicture2.jpg')
        else changePic('profilePicture.jpg')
    }

    return (
        <>
            <h2>CSC 307</h2>
            <h1>User Profile</h1>

            <h2>
                <Link href="./notes">Note</Link>
            </h2>
            <Box sx={boxStyle}>
                <IconButton
                    color="secondary"
                    aria-label="Edit"
                    onClick={handleClick}
                >
                    <Avatar
                        sx={avatar}
                        variant="circular"
                        alt="Profile Picture"
                        src={pic}
                    />
                </IconButton>

                <h1>Name</h1>
                <h2>Computer Science 2025</h2>
            </Box>
        </>
    )

}


const NotebookButton = styled(Button)(( { theme }) => ({
  backgroundColor: 'white', 
  color: 'black', 
  border: '4px solid grey', 
  '&:hover': {
    backgroundColor: 'grey', 
    color: 'white',
  },
  width: '50%', 
  paddingTop: '50%',
}));


function ButtonRow() {
    //const classes = notebookButtonStyles;

    return (
      <Grid container direction="row" justifyContent="center" alignItems="center" >
        <Grid item xl={3} md={3} container direction="row" justifyContent="center" alignItems="center" >
          <NotebookButton variant="contained" color="primary">
            Notebook 1
          </NotebookButton>
        </Grid>
        <Grid item xl={3} md={3} container direction="row" justifyContent="center" alignItems="center" >
          <NotebookButton variant="contained" color="primary">
            Notebook 2
          </NotebookButton>
        </Grid>
        <Grid item xl={3} md={3} container direction="row" justifyContent="center" alignItems="center" >
          <NotebookButton variant="contained" color="primary">
            Notebook 3
          </NotebookButton>
        </Grid>
        <Grid item xl={3} md={3} container direction="row" justifyContent="center" alignItems="center" >
          <NotebookButton variant="contained" color="primary">
            Notebook 4
          </NotebookButton>
        </Grid>
      </Grid>
    );
  }
