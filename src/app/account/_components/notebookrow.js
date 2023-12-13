import React, { useState, useEffect } from 'react'
import {
    Grid,
    Typography,
    Pagination,
    Fade,
    Box,
    IconButton,
} from '@mui/material'
import NotebookItem from './notebookitem'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
function NotebookRow() {
    const [notebooks, setNotebooks] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [fade, setFade] = useState(false)
    const handlePage = async (event, value) => {
        setFade(false)
        await fetch(`/api/notebooks/paginate?page=${value}&size=4`)
            .then((res) => res.json())
            .then((data) => {
                setNotebooks(data)
            })
        setPage(value)
        setFade(true)
    }

    // useeffect to get paginated list of notebooks and total number of pages
    useEffect(() => {
        fetch(`/api/notebooks/paginate?page=${page}&size=4`)
            .then((res) => res.json())
            .then((data) => {
                setNotebooks(data)
            })
        fetch(`/api/notebooks/paginate/numpages?size=4`)
            .then((res) => res.json())
            .then((data) => {
                setTotalPages(data)
            })
        setFade(true)
    }, [])

    return (
        <>
            <Typography variant="h4" component="div">
                Favorited Notebooks
            </Typography>
            <br />
            {notebooks && notebooks.length !== 0 ? (
                <>
                    <Fade
                        in={fade}
                        timeout={{
                            enter: 500,
                            exit: 0,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <IconButton
                                aria-label="back"
                                onClick={() => {
                                    if (page > 1) {
                                        handlePage(null, page - 1)
                                    }
                                }}
                                disabled={page === 1}
                            >
                                <ArrowBackIos></ArrowBackIos>
                            </IconButton>

                            <Grid
                                container
                                spacing={2}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                {notebooks ? (
                                    notebooks.map((notebook) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            key={notebook.id}
                                        >
                                            <NotebookItem
                                                notebook={notebook}
                                                fetchNotebooks={async (
                                                    pagenum
                                                ) => {
                                                    console.log('setNotebooks')
                                                    if (pagenum === undefined) {
                                                        pagenum = page
                                                    }
                                                    await fetch(
                                                        `/api/notebooks/paginate?page=${pagenum}&size=4`
                                                    )
                                                        .then((res) =>
                                                            res.json()
                                                        )
                                                        .then((data) => {
                                                            setNotebooks(data)
                                                        })
                                                    await fetch(
                                                        `/api/notebooks/paginate/numpages?size=4`
                                                    )
                                                        .then((res) =>
                                                            res.json()
                                                        )
                                                        .then((data) => {
                                                            setTotalPages(data)
                                                        })
                                                }}
                                            />
                                        </Grid>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </Grid>
                            <IconButton
                                aria-label="forward"
                                onClick={() => {
                                    if (page < totalPages) {
                                        handlePage(null, page + 1)
                                    }
                                }}
                                sx={{
                                    marginLeft: 'auto',
                                }}
                                disabled={page === totalPages}
                            >
                                <ArrowForwardIos></ArrowForwardIos>
                            </IconButton>
                        </Box>
                    </Fade>
                </>
            ) : (
                <Typography variant="h6" component="div">
                    No favorited notebooks
                </Typography>
            )}
        </>
    )
}

export default NotebookRow
