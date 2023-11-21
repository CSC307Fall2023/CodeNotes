import { Box, Grid, Typography } from '@mui/material'
import NotebookItem from './notebookitem'
function NotebookRow({ notebooks }) {
    return (
        <>
            <Typography variant="h4" component="div">
                Most Recent Notebooks
            </Typography>
            <br />
            <Grid container spacing={2}>
                {notebooks ? (
                    notebooks.map((notebook) => (
                        <NotebookItem notebook={notebook} />
                    ))
                ) : (
                    <></>
                )}
            </Grid>
        </>
    )
}

export default NotebookRow
