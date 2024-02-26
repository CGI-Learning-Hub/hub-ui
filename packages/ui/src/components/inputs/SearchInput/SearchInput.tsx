import { Search } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase, { type InputBaseProps } from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import "react";

export interface SearchInputProps extends InputBaseProps {}

const StyledInput = styled(InputBase)(({ theme }) => ({
  width: "auto",
  padding: "0px 12px",
  backgroundColor: theme.palette.grey[50],
  borderRadius: 30,
  "& .MuiInputBase-input": {
    padding: "8px 0px",
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
    />
  );
};

export default SearchInput;