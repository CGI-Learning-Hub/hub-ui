import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SaveIcon from "@mui/icons-material/Save";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Contained: Story = {
  args: {
    children: "Enregistrer",
    color: "primary",
    disabled: false,
    startIcon: <SaveIcon />,
    variant: "contained",
    onClick: () => alert("Alert"),
  },
};

export const Outlined: Story = {
  args: {
    children: "Ajouter un utilisateur",
    color: "secondary",
    disabled: false,
    startIcon: <PersonAddIcon />,
    variant: "outlined",
    onClick: () => alert("Alert"),
  },
};

export const Text: Story = {
  args: {
    children: "Annuler",
    color: "secondary",
    disabled: false,
    variant: "text",
    onClick: () => alert("Alert"),
  },
};
