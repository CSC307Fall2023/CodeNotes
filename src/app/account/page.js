'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Avatar from '@mui/material/Avatar'
import NavBar from '../components/NavBar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import NotebookRow from './_components/notebookrow'
import ClassList from './_components/classlist'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Divider,
    MenuItem,
    TextField,
    IconButton,
    Grid,
} from '@mui/material'

import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import EditIcon from '@mui/icons-material/Edit'
import dayjs from 'dayjs'



const avatar = {
    width: 125,
    height: 125,
    cursor: 'pointer',

}

const majors = [
    {
        value: 'Computer Science',
        label: 'Computer Science',
    },
    {
        value: 'Computer Engineering',
        label: 'Computer Engineering',
    },
    {
        value: 'Electrical Engineering',
        label: 'Electrical Engineering',
    },
    {
        value: 'Mechanical Engineering',
        label: 'Mechanical Engineering',
    },
    {
        value: 'Chemical Engineering',
        label: 'Chemical Engineering',
    },
    {
        value: 'Civil Engineering',
        label: 'Civil Engineering',
    },
    {
        value: 'Biomedical Engineering',
        label: 'Biomedical Engineering',
    },
    {
        value: 'Aerospace Engineering',
        label: 'Aerospace Engineering',
    },
    {
        value: 'Industrial Engineering',
        label: 'Industrial Engineering',
    },
    {
        value: 'Materials Science',
        label: 'Materials Science',
    },
    {
        value: 'Other',
        label: 'Other',
    },
]

export default function Account() {
    const router = useRouter()

    const [user, setUser] = useState({})
    const [open, setOpen] = useState(false)
    const [pic, changePic] = useState('user.jpg')


    const handleClick = async (event) => {
        const file = event.target.files[0];
        if (file){
            const f = new FileReader();
            f.onloadend = async () => {
                const base64Image = f.result.split(',')[1];
                changePic(f.result);
                await saveAvatarToDatabase(base64Image);
            };
            f.readAsDataURL(file);
        }
      }

    
    const saveAvatarToDatabase = async (base64Image) => {
        const formData = new FormData();
        formData.append('avatar', base64Image);


        await fetch('/api/saveavatar', {
            method: 'PATCH',
            body: FormData,
        }).then((res) => {
            if (res.ok) {
                setOpen(false);
                fetch('/api/users')
                    .then((res) => res.json())
                    .then((data) => {
                        setUser(data);
                        if (data.profile == null) {
                            setOpen(true);
                        }
                    });
            } else {
                res.json().then((j) => console.log('error:' + j));
            }
        });
    };



    async function handleProfileCreate(event) {
        event.preventDefault()
        let valid = event.currentTarget.reportValidity()
        const data = new FormData(event.currentTarget)
        if (valid) {
            const profileData = {}
            profileData['name'] = data.get('name')
            profileData['major'] = data.get('major')
            profileData['year'] = data.get('year')
            // submit form
            await fetch('/api/profile', {
                method: 'post',
                body: JSON.stringify(profileData),
            }).then((res) => {
                if (res.ok) {
                    setOpen(false)
                } else {
                    res.json().then((j) => console.log('error:' + j))
                }
            })
            fetch(`/api/users`)
                .then((res) => res.json())
                .then((data) => {
                    setUser(data)
                    if (data.profile == null) {
                        setOpen(true)
                    }
                })
        }
        return false
    }

    async function handleProfileUpdate(event) {
        event.preventDefault()
        let valid = event.currentTarget.reportValidity()
        const data = new FormData(event.currentTarget)
        if (valid) {
            const profileData = {}
            profileData['name'] = data.get('name')
            profileData['major'] = data.get('major')
            profileData['year'] = data.get('year')
            // submit form
            await fetch('/api/profile', {
                method: 'PATCH',
                body: JSON.stringify(profileData),
            }).then((res) => {
                if (res.ok) {
                    setOpen(false)
                } else {
                    res.json().then((j) => console.log('error:' + j))
                }
            })
            fetch(`/api/users`)
                .then((res) => res.json())
                .then((data) => {
                    setUser(data)
                    if (data.profile == null) {
                        setOpen(true)
                    }
                })
        }
        return false
    }

    // useeffect to get user profile
    useEffect(() => {
        fetch(`/api/users`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data)
                if (data.profile == null) {
                    setOpen(true)
                }
            })
    }, [])

    return (
        <>
            <NavBar variant="search"></NavBar>
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

                <Avatar
                sx={avatar}
                onClick={() => document.getElementById('icon-button-file').click()}  // Trigger file input click
                >
                <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={handleClick}
                    style={{ display: 'none' }}
                />
                <img src={pic} alt="Profile" style={avatar} />
                </Avatar>



                <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                    {user.profile?.name}
                    <IconButton onClick={() => setOpen(true)}>
                        <EditIcon />
                    </IconButton>
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {user.email}
                </Typography>
                <br />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {user.profile?.major}
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Class of {user.profile?.year}
                </Typography>
                <br />
                <Divider variant="middle" sx={{ width: '100%' }} />
                <br />
                <ClassList
                    user={user}
                    refresh={() =>
                        fetch(`/api/users`)
                            .then((res) => res.json())
                            .then((data) => {
                                setUser(data)
                                if (data.profile == null) {
                                    setOpen(true)
                                }
                            })
                    }
                ></ClassList>
                <br />
                <Divider variant="middle" sx={{ width: '100%' }} />
                <br />
                <NotebookRow></NotebookRow>
                <br />
                <Button
                    variant="contained"
                    onClick={() => router.push('/note?open=true')}
                >
                    See all Notebooks
                </Button>
            </Container>
            <Dialog open={open}>
                <DialogTitle>
                    {user.profile == null
                        ? 'Create your profile'
                        : 'Update your profile'}
                </DialogTitle>
                <form
                    onSubmit={(event) => {
                        if (user.profile == null) {
                            handleProfileCreate(event)
                        } else {
                            handleProfileUpdate(event)
                        }
                    }}
                >
                    <DialogContent dividers>
                        {user.profile == null ? (
                            <DialogContentText>
                                Please complete your profile before continuing.
                            </DialogContentText>
                        ) : (
                            <></>
                        )}
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            variant="standard"
                            fullWidth
                            defaultValue={user.profile?.name}
                            required
                        />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    select
                                    id="major"
                                    name="major"
                                    label="Major"
                                    variant="standard"
                                    defaultValue={user.profile?.major}
                                    fullWidth
                                    required
                                >
                                    {majors.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        label={'Year'}
                                        views={['year']}
                                        slotProps={{
                                            textField: {
                                                variant: 'standard',
                                                required: true,
                                                id: 'year',
                                                name: 'year',
                                            },
                                        }}
                                        defaultValue={
                                            user.profile?.year
                                                ? dayjs(
                                                      user.profile?.year +
                                                          '-01-01'
                                                  )
                                                : null
                                        }
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{}}>
                        {user.profile == null ? (
                            <></>
                        ) : (
                            <Button onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                        )}
                        <Button variant="contained" type="submit">
                            Save changes
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
