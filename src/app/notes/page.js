'use client'
import React from 'react'
import Box from '@mui/material/Box'
import LexicalEditorWrapper from '@/app/components/LexicalEditorWrapper/index'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import '../styles/global.css'

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

export default function Note() {
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
        <div style={{ display: 'flex' }}>
            <Box sx={folderBarStyle}>
                {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </Box>
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
        </div>
    )
}
