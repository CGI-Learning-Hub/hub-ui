import { Meta, StoryObj } from "@storybook/react";
import Button, { ButtonProps } from './Button'

import { InsertEmoticon } from '@mui/icons-material'

const meta: Meta<ButtonProps> = {
    title: 'Components/Buttons/Button',
    component: Button,
    argTypes: {
        text: {
            description: "Button text value",
            control: {
                type: "string"
            }
        }
    }
}

export default meta;

type Story = StoryObj<ButtonProps>

export const Base: Story = {
    args: {
        text: "Base button"
    }
}

export const IconedButton: Story = {
    args: {
        text: "Iconed Button",
        icon: <InsertEmoticon />
    }
}