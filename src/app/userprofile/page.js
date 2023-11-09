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
    const [pic, changePic] = useState('user.jpg')

    const handleClick = (event) => {
      const file = event.target.files[0];
      if (file){
          const f = new FileReader();
          f.onloadend = () => {
            changePic(f.result);
          };
          f.readAsDataURL(file);
      }
    }

    const [isEditing, changeIsEditing] = useState(false);
    const [info, changeInfo] = useState(
      {
        name: 'Student Name',
        major: 'Cal Poly Information (Major and Year)',
        email: 'Cal Poly Email'
      }
    );
      
    const handleEdit = () => {
      changeIsEditing(true);
    }

    const handleSave = () => {
      changeIsEditing(false);
    }

    const handleInputChange = (key, value) => {
      changeInfo({
        ...info,
        [key]: value,
      });
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
    

                <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={handleClick}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="icon-button-file">
                <IconButton
                    color="secondary"
                    aria-label="Edit"
                    component="span"
                >
                
                    <Avatar
                        sx={avatar}
                        variant="circular"
                        alt="Profile Picture"
                        src={pic}
                    />
                </IconButton>
                </label>

                <h1 onClick={handleEdit} style={{ lineHeight: '1' }}>
                    {isEditing ? (
                        <TextField
                            id="student-name-input"
                            label="Student Name"
                            variant="filled"
                            value={info.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            autoFocus
                        />
                    ) : (
                        info.name
                    )}
                </h1>
                <h2 onClick={handleEdit} style={{ lineHeight: '.1', fontSize: '15px' }}>
                    {isEditing ? (
                        <TextField
                            id="Major-input"
                            label="Major/Year"
                            variant="filled"
                            value={info.major}
                            onChange={(e) => handleInputChange('major', e.target.value)}
                            onBlur={handleSave}
                        />
                    ) : (
                        info.major
                    )}
                </h2>
                
                <h2 onClick={handleEdit} style={{ lineHeight: '.1', fontSize: '15px' }}>
                    {isEditing ? (
                        <TextField
                            id="email-input"
                            label="Email"
                            variant="filled"
                            value={info.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            onBlur={handleSave}
                        />
                    ) : (
                        info.email
                    )}
                </h2>
                
                
                
                
                
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
    //const classes = notebookButtonStyles;

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
// make an on click function for the arrow button (ie. onClick = function())
// when you click the arrow, the pages that the notebook-buttons link to change