import { Divider } from "@mui/material";
import MuiAutocomplete, { AutocompleteProps as MUIAutocompleteProps } from "@mui/material/Autocomplete";
import { FC, ReactNode, useEffect, useState } from "react";

export type AutocompleteProps<
  T,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
> = MUIAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> & {
    isAllSelectable?: boolean;
    onSelectAll?: () => void;
    onDeselectAll?: () => void;
    selectAllLabel?: ReactNode;
    deselectAllLabel?: ReactNode;
};

enum SelectPossibility {
    SELECT_ALL = "TOUT_SELECTIONNER",
    DESELECT_ALL = "TOUT_DE_SELECTIONNER",
}

const Autocomplete: FC<AutocompleteProps<any, boolean, boolean, boolean>> = ({
    isAllSelectable= false,
    onSelectAll,        
    onDeselectAll,
    selectAllLabel = "Tout sélectionner",
    deselectAllLabel = "Tout désélectionner",
    ...otherProps
}) => {

    if (!isAllSelectable || !otherProps.multiple)
        return <MuiAutocomplete {...otherProps} />;

    const [showSelectAll, setShowSelectAll] = useState(true);    

    const handleSelectAll = () => {
        !!onSelectAll && onSelectAll();
        setShowSelectAll(false);
    };

    const handleDeselectAll = () => {
        !!onDeselectAll && onDeselectAll();
        setShowSelectAll(true);
    };

    useEffect(() => {
        if(!otherProps.value || !otherProps.options) return;
        setShowSelectAll(otherProps.value.length !== otherProps.options.length);
    }, [otherProps.value, otherProps.options]);

    const options = [ showSelectAll ? SelectPossibility.SELECT_ALL : SelectPossibility.DESELECT_ALL , ...otherProps.options ];
   
    return <MuiAutocomplete {...otherProps}
    options={options}
    renderOption={(props, option) => {
        if(Object.values(SelectPossibility).includes(option as SelectPossibility)) {
            const selectOption = option as SelectPossibility;
            
            return (
                <>
                <li {...props}
                onClick={
                    selectOption === SelectPossibility.SELECT_ALL
                        ? handleSelectAll
                        : handleDeselectAll
                }
                >
                    {
                        showSelectAll
                        ? selectAllLabel
                        : deselectAllLabel
                    }
                </li>
                <Divider sx={{marginTop:1, marginBottom:1}}/></>
            )
        }
        return (
            <li
            {...props}
            >
            {option}
            </li>
        );
        }
      }
    />
}

export default Autocomplete;