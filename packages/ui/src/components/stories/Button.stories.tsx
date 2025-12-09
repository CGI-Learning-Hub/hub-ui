import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "..";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    color: {
      control: "select",
      options: [
        "inherit",
        "default",
        "primary",
        "secondary",
        "error",
        "info",
        "success",
        "warning",
      ],
    },
    disabled: {
      control: "boolean",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Contained: Story = {
  args: {
    children: "Enregistrer",
    color: "primary",
    disabled: false,
    startIcon: <SaveRoundedIcon />,
    variant: "contained",
    onClick: () => alert("Alert"),
  },
};

export const Outlined: Story = {
  args: {
    children: "Ajouter un utilisateur",
    color: "secondary",
    disabled: false,
    startIcon: <PersonAddRoundedIcon />,
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
