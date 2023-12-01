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
    width: 125,
    height: 125,
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

            <h2>
                <Link href="./notes">Note</Link>
            </h2>

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
            
            <Box sx={boxStyle}>

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
                <ButtonRow>
            
                </ButtonRow>
                <NewNoteButton>

                </NewNoteButton>
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
  width: 'auto', 
  height: 'auto',
  aspectRatio: 1/1,
  paddingTop: '40%',
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


const NewNoteButton = () => {
  return (
    <Button
      href="./notes"
      
    >
      <IconButton>
        <AddCircleOutlineRoundedIcon></AddCircleOutlineRoundedIcon>
      </IconButton>
      <Typography>Make a NEW notebook</Typography>
    </Button>
  );
}


function ButtonRow() {
  const notebooks = ['Notebook 1', 'Notebook 2', 'Notebook 3', 'Notebook 4', 'Notebook 5', 'Notebook 6'];
  //const notebooks = ['Notebook 1'];
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

  const NotebookScrollButton = ({icon, clickFunction}) => {
    if (notebooks.length <= 4) {
      return;
    }
    return (
      <icon onClick={clickFunction}>
        {icon}
      </icon>
    );
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" >
      <Grid item xl={2} md={2} container direction="row" justifyContent="right" alignItems="right">
        {<NotebookScrollButton icon={<ArrowBackIosIcon />} clickFunction={handlePrevClick}></NotebookScrollButton>}
      </Grid>
      <Grid item xl={8} md={8} container direction="row" justifyContent="center" alignItems="center" >
        {notebooks.slice(startIndex, startIndex + notebooksPerPage).map((notebook, index) => (
          <Grid item xl={2} md={2} container direction="row" justifyContent="center" alignItems="center" >
            <NotebookButton href="./notes" key={index} variant="contained" color="primary">
              {notebook}
            </NotebookButton>
          </Grid>
        ))}
      </Grid>
      <Grid item xl={2} md={2}>
        {<NotebookScrollButton icon={<ArrowForwardIosIcon />} clickFunction={handleNextClick}></NotebookScrollButton>}
      </Grid>
    </Grid>
  );
}