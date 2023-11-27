import { TextField, InputAdornment, MenuItem } from '@mui/material'
import CodeIcon from '@mui/icons-material/Code'

function LanguageSelector() {
    return (
        <TextField
            variant="standard"
            select
            defaultValue={'python'}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <CodeIcon />
                    </InputAdornment>
                ),
            }}
            sx={{
                mx: '0.25rem',
            }}
        >
            <MenuItem value={'python'}>Python</MenuItem>
            <MenuItem value={'javascript'}>JavaScript</MenuItem>
            <MenuItem value={'java'}>Java</MenuItem>
            <MenuItem value={'c'}>C</MenuItem>
            <MenuItem value={'cpp'}>C++</MenuItem>
            <MenuItem value={'csharp'}>C#</MenuItem>
        </TextField>
    )
}

export default LanguageSelector
