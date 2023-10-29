'use client'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavBar from './NavBar';
import Login from './Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Signup from './Signup';
import { useSession } from 'next-auth/react';
import { Button, Divider } from '@mui/material';
import { signOut } from "next-auth/react"

const theme = createTheme({palette: {
  mode: 'light',
  primary: {
    main: '#154734',
  },
  secondary: {
    main: '#BD8B13',
  },
},
typography: {
  fontFamily: 'sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontSize: '3rem',
    fontWeight: 700,
  },
  h2: {
    fontSize: '2.5rem',
    fontWeight: 700,
  },
  h3: {
    fontSize: '2rem',
    fontWeight: 700,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 700,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 700,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  button: {
    fontSize: '1rem',
    fontWeight: 700,
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 400,
  },


},
components: {
  MuiDivider: {
    styleOverrides: {
      root: {
        backgroundColor: '#EEEEEE'
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        boxShadow: 'none',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 700,
      },
      contained: {
        backgroundColor: "#154734",
        color: "#FFFFFF",
        '&:hover': {
          backgroundColor: "#154734",
        },
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        
      },
    },
  },
  }
});

export default function RootLayout({ children, title }) {

  const { data: session, status }  = useSession();

  let loginSection;

  if (status === 'authenticated') {
    loginSection = <Button variant="outlined" color="inherit" onClick={() => signOut()}>Sign Out</Button>;
  } else {
    loginSection = <>
      <Login/>
      <Divider orientation="vertical" variant="middle" flexItem ></Divider>
      <Signup/>
    </>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="static" sx={{paddingX: 3}}>
            <Toolbar disableGutters>
              <img src="/CalPoly.png" alt="logo" height="45" position="inline-block" style={{ marginRight : "10px"}} />
              <Divider orientation="vertical" variant="middle" flexItem ></Divider>
              <img src="/logo.png" alt="logo" width="40" height="40" style={{marginLeft : "10px"}} />
              <Typography
                variant="h4"
                noWrap
                component="a"
                href="/"
                sx={{
                  m: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {title}
              </Typography>
              <NavBar />
              <Box sx={{ flexGrow: 0 }}>
                <Stack direction='row' spacing={2}>
                  {loginSection}
                </Stack>
              </Box>
            </Toolbar>
        </AppBar>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </ThemeProvider>
  );
}