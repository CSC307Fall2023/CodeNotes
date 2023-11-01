'use client'

import { usePathname } from 'next/navigation'
import { Box, Button } from '@mui/material';
import Link from 'next/link';

export default function NavBar() {
  const pathname = usePathname();
  const links = [
    { path: '/', name: 'Home' }, 
    { path: '/userprofile', name: 'User Profile' },
    { path: '/notes', name: 'Note Page'}
  ];

  return (
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
  );
}