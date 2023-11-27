import { Button, Tooltip } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import React from 'react'

function SaveButton({ note }) {
    const [editor] = useLexicalComposerContext()

    function handleSave() {
        console.log(editor._editorState.toJSON())
        fetch(`/api/notes/${note.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: JSON.stringify(editor._editorState),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    return (
        <Tooltip title="Save">
            <Button
                startIcon={<SaveIcon />}
                onClick={() => {
                    handleSave()
                }}
            >
                Save
            </Button>
        </Tooltip>
    )
}

export default SaveButton
