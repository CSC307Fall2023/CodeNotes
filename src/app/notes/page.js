'use client'
import * as React from 'react';
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Container from '@mui/material/Container';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import LexicalEditorWrapper from '@/app/components/LexicalEditorWrapper/index'
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import '../styles/global.css'
import { Button } from '@mui/material';

const folderBarStyle = {
    backgroundColor: '#D9D9D9',
    height: '100vh', // 100% of the viewport height
    width: '10vh',
}

const contentContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
}

const headerStyle = {
    height: '150px',
    padding: '0 20px',
}

const classNotebookLabelStyle = {
    fontFamily: 'Inter-SemiBold, Helvetica',
    fontSize: '20px',
    color: '#050505',
    margin: '0',
    marginTop: '40px',
}

const noteLabelStyle = {
    fontFamily: 'Inter-SemiBold, Helvetica',
    fontSize: '40px',
    color: '#050505',
    margin: '0',
}

const toolBoxStyle = {
    backgroundColor: '#D9D9D9',
    height: '0px',
    width: '100vh',
}



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`, ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open', })
    (({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }), ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));



export default function Note() {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [notebooks, setNotebooks] = useState([])
    const [state, setState] = React.useState({left: false});
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    
        setState({ ...state, [anchor]: open });
    };
    
    // use this only once - only call this once [on load of component if array is empty]
    useEffect(() => {
        fetch('/api/notebooks', { method: 'GET' })
            .then((response) => response.ok && response.json())
            .then((notebooks) => {
                notebooks && setNotebooks(notebooks)
            })
    }, [])

    function updateNote({params}) {
    }

    const list = (anchor) => (
        <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
            <TreeItem nodeId="1" label="CSC 123">
                <TreeItem nodeId="2" label="some cracked python file" />
            </TreeItem>
                <TreeItem nodeId="5" label="CSC 357">
                    <TreeItem nodeId="10" label="Syllabus Notes" />
                    <TreeItem nodeId="6" label="Week 1">
                        <TreeItem nodeId="8" label="Week 1 Day 1" />
                    </TreeItem>
                </TreeItem>
            </TreeView>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <Toolbar open={open}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    {/* <Typography variant="h4">Folders</Typography> */}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    <TreeItem nodeId="1" label="CSC 123">
                        <TreeItem nodeId="2" label="super cracked python file" />
                    </TreeItem>
                    <TreeItem nodeId="5" label="CSC 357">
                        <TreeItem nodeId="10" label="Syllabus" />
                        <TreeItem nodeId="6" label="Week 1">
                            <TreeItem nodeId="8" label="Week 1 Day 1" />
                        </TreeItem>
                    </TreeItem>
                </TreeView>
                <Divider />
                <Box textAlign="center" sx={{m: 2}}>
                    <Fab size="small" color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Box>
            </Drawer>
            <Main open={open}>
                <div style={contentContainerStyle}>
                    <div style={headerStyle}>
                        <h2 style={classNotebookLabelStyle}>CSC 307</h2>
                        <h1 style={noteLabelStyle}>HTML and JS Introduction</h1>
                    </div>
                    <Box sx={toolBoxStyle}></Box>
                    <Container>
                        <LexicalEditorWrapper />
                    </Container>
                </div>
            </Main>
        </Box>
    )
}
