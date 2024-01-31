import { ReactNode } from 'react'
import { Button as MuiButton } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles';


export type ButtonProps = typeof MuiButton & {
    text: string,
    icon?: ReactNode
}

const Button = ({ text, icon }: ButtonProps) => (
    <StyledEngineProvider injectFirst>
        <MuiButton variant="outlined" startIcon={icon} className="border-2">{text}</MuiButton>
    </StyledEngineProvider>
)

Button.displayName = "Button"

export default Button;