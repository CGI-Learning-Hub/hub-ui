import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase, { type InputBaseProps } from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

export type SearchInputProps = InputBaseProps & {
  loading?: boolean;
};

const StyledInput = styled(InputBase)(({ theme }) => ({
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
  name = "search",
  placeholder = "Rechercher",
  loading = false,
  ...otherProps
}) => {
  return (
    <StyledInput
      {...otherProps}
      name={name}
      placeholder={placeholder}
      startAdornment={
        <InputAdornment position="start" disablePointerEvents>
          {loading ? (
            <CircularProgress size="16px" sx={{ mx: 0.5 }} />
          ) : (
            <SearchRoundedIcon />
          )}
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
