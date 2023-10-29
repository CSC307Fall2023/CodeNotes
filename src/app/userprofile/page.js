'use client'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
//import { styled } from '@material-ui/core/styles';


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

function ButtonRow() {
    //const classes = notebookButtonStyles();

    return (
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary">
            Notebook 1
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Notebook 2
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Notebook 3
          </Button>
        </Grid>
      </Grid>
    );
  }

/*
const notebookButtonStyles = styled(Button)(( { theme }) => ({
    customButton: {
        backgroundColor: 'white', 
        color: 'black', 
        border: '1px solid grey', 
        '&:hover': {
            backgroundColor: 'grey', 
            color: 'white'
        },
    },
}));
*/