import { Search } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase, { type InputBaseProps } from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

export type SearchInputProps = InputBaseProps & {};

const StyledInput = styled(InputBase)(({ theme }) => ({
  width: "auto",
  padding: "0px 12px",
  backgroundColor: theme.palette.grey[50],
  borderRadius: 30,
  "& .MuiInputBase-input": {
    padding: "8px 0px",
  },
  "&:hover, &.Mui-focused": {
    "& .MuiInputAdornment-root": {
      color: theme.palette.primary.main,
    },
  },
}));

const SearchInput: React.FunctionComponent<SearchInputProps> = ({
  placeholder = "Rechercher",
  ...otherProps
}: SearchInputProps) => {
  return (
    <StyledInput
      {...otherProps}
      placeholder={placeholder}
      startAdornment={
        <InputAdornment position="start" disablePointerEvents>
          <Search />
        </InputAdornment>
      }
      type="search"
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
    />
  );
};

export default SearchInput;
