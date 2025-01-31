'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert'
import { useRouter } from 'next/navigation'

import { signIn } from 'next-auth/react'

export default function Login() {
    const [open, setOpen] = useState(false)
    const [formValues, setFormValues] = useState({ email: '', password: '' })
    const [error, setError] = useState(false)
    const router = useRouter()

    function handleLoginButton() {
        setOpen(true)
    }

    function handleClose() {
        reset()
        setOpen(false)
    }

    function reset() {
        setError(false)
        setFormValues({ email: '', password: '' })
    }

    function handleSignin(event) {
        event.preventDefault()
        let valid = event.currentTarget.reportValidity()
        const data = new FormData(event.currentTarget)
        if (valid) {
            signIn('normal', { ...formValues, redirect: false }).then(
                (result) => {
                    if (!result.error) {
                        setOpen(false)
                        reset()
                        router.push('/userprofile')
                    } else {
                        setError(true)
                    }
                }
            )
        } else {
            setError(true)
        }
    }

    function handleChange({ field, value }) {
        setFormValues({ ...formValues, [field]: value })
    }

    return (
        <>
            <Button
                variant="contained"
                color="inherit"
                onClick={handleLoginButton}
            >
                Login
            </Button>
            {open && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Login</DialogTitle>
                    <form onSubmit={handleSignin}>
                        <DialogContent>
                            <DialogContentText>
                                To login, please enter your email address and
                                password.
                            </DialogContentText>
                            {error ? (
                                <Alert severity="error">
                                    There was an issue signing in! Check email
                                    and password.
                                </Alert>
                            ) : null}
                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                value={formValues.email}
                                onChange={(e) =>
                                    handleChange({
                                        field: 'email',
                                        value: e.target.value,
                                    })
                                }
                                variant="standard"
                            />
                            <TextField
                                margin="dense"
                                id="password"
                                label="Password"
                                type="password"
                                fullWidth
                                value={formValues.password}
                                onChange={(e) =>
                                    handleChange({
                                        field: 'password',
                                        value: e.target.value,
                                    })
                                }
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button type="button" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit">Login</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            )}
        </>
    )
}
