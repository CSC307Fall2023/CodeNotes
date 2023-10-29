'use client'
import { Grid, Typography } from '@mui/material'

export default function Home() {
  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h2" sx={{
            marginBottom: '2rem',
          }}>What is CodeNotes?</Typography>
          <Typography variant="body1">CodeNotes is a place to store your notes on code.
          It's a place to keep track of your thoughts and ideas as you learn to code.</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h1">Picture goes here</Typography>
          </Grid>
      </Grid>
    </>
  )
}
