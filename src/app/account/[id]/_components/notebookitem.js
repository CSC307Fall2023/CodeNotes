import React from 'react'
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
} from '@mui/material'

function NotebookItem({ notebook }) {
    return (
        <>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <NotebookCard notebook={notebook} />
            </Grid>
        </>
    )
}

function NotebookCard({ notebook }) {
    const { name, notes, id } = notebook
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia component="img" height="140" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {notes?.length} notes
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default NotebookItem
