import { Box, InputAdornment, MenuItem, TextField } from '@mui/material'
import FormatSizeIcon from '@mui/icons-material/FormatSize'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection } from 'lexical'
import { $setBlocksType } from '@lexical/selection'
import { $createHeadingNode } from '@lexical/rich-text'

function TextStyleSelector() {
    const [editor] = useLexicalComposerContext()

    const handleChange = (e: React.ChangeEvent): void => {
        editor.update(() => {
            const selection = $getSelection
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode('h1'))
            }
        })
    }

    return (
        <Box>
            <TextField
                variant="standard"
                select
                defaultValue={'p'}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FormatSizeIcon />
                        </InputAdornment>
                    ),
                }}
                onChange={handleChange}
            >
                <MenuItem value={'p'}>Paragraph</MenuItem>
                <MenuItem value={'h1'}>Heading 1</MenuItem>
                <MenuItem value={'h2'}>Heading 2</MenuItem>
            </TextField>
        </Box>
    )
}

export default TextStyleSelector
