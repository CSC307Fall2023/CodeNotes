'use client'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Note() {
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      { links.map(l => {
        const isActive = l.path === pathname;
        return (
          <Button component={Link}
                  href={l.path}
                  sx={{ my: 2, color: 'white', display: 'block', textDecoration: (isActive ? 'underline' : 'inherit') }}
                  key={l.path}
          >{l.name}</Button>
        )
      })}
    </Box>
    return(
        <>
        <div className='notebook_name_title'></div>
        <h2>CSC 307</h2>
        <h1>HTML and JS Introduction</h1>
    </>
    )
}