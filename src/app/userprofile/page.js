'use client'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


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
            <ButtonRow/>
        
        <Box sx={boxStyle}>

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


