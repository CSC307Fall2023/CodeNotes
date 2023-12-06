import React from 'react'
import { TreeView } from '@mui/x-tree-view'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import NotebookTreeNode from './notebooktreenode'

function NotebookTree({ notebooks, setNotebooks, activeNote, setActiveNote }) {
    const [expanded, setExpanded] = React.useState([])

    return (
        <TreeView
            aria-label="controlled"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}
            onNodeToggle={(e, nodes) => setExpanded(nodes)}
        >
            {notebooks.map((notebook) => (
                <NotebookTreeNode
                    key={`nb-${notebook.id}`}
                    notebook={notebook}
                    notebooks={notebooks}
                    setNotebooks={setNotebooks}
                    activeNote={activeNote}
                    setActiveNote={setActiveNote}
                />
            ))}
        </TreeView>
    )
}

export default NotebookTree
