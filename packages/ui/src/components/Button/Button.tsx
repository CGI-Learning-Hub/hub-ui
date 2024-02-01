import { ReactNode } from 'react'
import { Button as MuiButton, ButtonProps as ButtonPropsMui } from '@mui/material'

export type ButtonProps = ButtonPropsMui & {
    text: string,
    icon?: ReactNode
}

const Button = ({ onClick, text, icon, className, ...props }: ButtonProps) => (
    <MuiButton onClick={onClick} startIcon={icon} variant="outlined" className={className} {...props}>{text}</MuiButton>
)

Button.displayName = "Button"

export default Button;