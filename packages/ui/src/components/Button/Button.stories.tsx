import { Meta, StoryObj } from "@storybook/react";
import Button from './Button'

import { InsertEmoticon } from '@mui/icons-material'

const meta: Meta<typeof Button> = {
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

type Story = StoryObj<typeof Button>

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