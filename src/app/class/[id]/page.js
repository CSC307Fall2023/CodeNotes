'use client'

import { useState, useEffect } from 'react'
import NavBar from '@/app/components/NavBar'
import { Container, Divider, Grid, Typography } from '@mui/material'
import ClassMemberCard from './_components/ClassMemberCard'

function ClassPage({ params }) {
    const [classData, setClassData] = useState({})

    // useeffect to get class data
    useEffect(() => {
        fetch(`/api/classes/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setClassData(data)
            })
    }, [])

    return (
        <>
            <NavBar />
            <Container
                maxWidth="xl"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '5%',
                }}
            >
                <Typography variant="h2" component="div">
                    {classData.name}
                </Typography>
                <Typography variant="h4" component="div">
                    {classData.description}
                </Typography>
                <br />
                <Divider sx={{ width: '100%' }} />
                <br />
                <Typography variant="h4" component="div">
                    Teacher
                </Typography>
                <br />
                <ClassMemberCard member={classData.teacher} />
                <br />
                <Divider sx={{ width: '100%' }} />
                <br />
                <Typography variant="h4" component="div">
                    Students
                </Typography>
                <br />
                <Grid container spacing={2}>
                    {classData.students?.map((student) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={2}
                            key={student.id}
                        >
                            <ClassMemberCard member={student} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default ClassPage
