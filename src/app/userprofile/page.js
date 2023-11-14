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

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

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
            <SearchIcon></SearchIcon>
            <TextField id="filled-basic" label="Search" variant="filled" />
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

                <h1>STUDENT NAME</h1>
                <h2>Computer Science 2025</h2>
                <h2>Cal Poly Email</h2>
                <h1>Most Recent Notebooks</h1>
                <ButtonRow>
            
                </ButtonRow>
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

const plusButton = styled(Button)(( {theme }) => ({
  backgroundColor: 'white',
  border: 'black'
}));

const ButtonList = ( {items}) => {
  return (
    <div>
    {items.map((item, index) => (
      <NotebookButton key={index}>{item}</NotebookButton>
    ))}
    </div>
  );
};


// const NewNoteButton = () => {
//   return (
//     /*
//     <Button
//       //component={Link}
//       //to="/notes"
//       //variant="contained"
//     >
//     */
//     <Button>
//       <IconButton>
//         <AddCircleOutlineRoundedIcon></AddCircleOutlineRoundedIcon>
//       </IconButton>
//       <Typography>Add new notebook</Typography>
//     </Button>
//   );
// }

function ButtonRow() {
  const notebooks = ['Notebook 1', 'Notebook 2', 'Notebook 3', 'Notebook 4', 'Notebook 5', 'Notebook 6'];
  const [startIndex, setStartIndex] = useState(0);
  const notebooksPerPage = 4;

  const handleNextClick = () => {
    const newStartIndex = startIndex + notebooksPerPage;
    if (newStartIndex < notebooks.length) {
      setStartIndex(newStartIndex);
    }
  };

  const handlePrevClick = () => {
    const newStartIndex = startIndex - notebooksPerPage;
    if (newStartIndex >= 0) {
      setStartIndex(newStartIndex);
    }
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" >
      <Grid item xl={2} md={2} container direction="row" justifyContent="right" alignItems="right">
        <ArrowBackIosIcon onClick={handlePrevClick}></ArrowBackIosIcon>
      </Grid>
      <Grid item xl={8} md={8} container direction="row" justifyContent="center" alignItems="center" >
        {notebooks.slice(startIndex, startIndex + notebooksPerPage).map((notebook, index) => (
          <NotebookButton key={index} variant="contained" color="primary">
            {notebook}
          </NotebookButton>
        ))}
      </Grid>
      <Grid item xl={2} md={2}>
        <ArrowForwardIosIcon onClick={handleNextClick}></ArrowForwardIosIcon>
      </Grid>
    </Grid>
  );
}

/*
function ButtonRow() {
    //const classes = notebookButtonStyles;
    //const notebooks = ['Notebook 1', 'Notebook 2', 'Notebook 3', 'Notebook 4', 'Notebook 5', 'Notebook 6']

    return (
      <Grid container direction="row" justifyContent="center" alignItems="center" >
        <Grid item xl={2} md={2} container direction="row" justifyContent="right" alignItems="right">
          <ArrowBackIosIcon></ArrowBackIosIcon>
        </Grid>
        <Grid item xl={2} md={2} container direction="row" justifyContent="center" alignItems="center" >
          <NotebookButton variant="contained" color="primary">
            Notebook 1
          </NotebookButton>
        </Grid>
        <Grid item xl={2} md={2} container direction="row" justifyContent="center" alignItems="center" >
          <NotebookButton variant="contained" color="primary">
            Notebook 2
          </NotebookButton>
        </Grid>
        <Grid item xl={2} md={2} container direction="row" justifyContent="center" alignItems="center" >
          <NotebookButton variant="contained" color="primary">
            Notebook 3
          </NotebookButton>
        </Grid>
        <Grid item xl={2} md={2} container direction="row" justifyContent="center" alignItems="center" >
          <NotebookButton variant="contained" color="primary">
            Notebook 4
          </NotebookButton>
        </Grid>
        <Grid item xl={2} md={2}>
          <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </Grid>
      </Grid>
    );
  }
*/
// make an on click function for the arrow button (ie. onClick = function())
// when you click the arrow, the pages that the notebook-buttons link to change