import React, { useState } from 'react'

import { InputTextProps, TextInput } from '../TextInput'
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '../..';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export type PasswordInputProps = {} & Omit<InputTextProps, "variant" | "type">

const PasswordInput: React.FunctionComponent<PasswordInputProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <TextInput
            {...props}
            variant="outlined"
            label={props.label}
            type={showPassword ? "text" : "password"}
            InputProps={{
                endAdornment: <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }}
        />
    )
}

export default PasswordInput;