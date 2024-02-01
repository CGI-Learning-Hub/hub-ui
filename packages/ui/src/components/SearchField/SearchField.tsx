import { TextField, TextFieldProps, InputAdornment, FormControl, InputLabel } from '@mui/material'
import { Search } from '@mui/icons-material'


export type SearchFieldProps = TextFieldProps;

const SearchField = (props: SearchFieldProps) => (
    <TextField {...props} InputProps={{
        startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
    }} />
)

SearchField.displayName = "Search field"

export default SearchField