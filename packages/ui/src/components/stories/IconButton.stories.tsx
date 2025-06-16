import SchoolIcon from "@mui/icons-material/School";
import IconButton from "@mui/material/IconButton";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
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
    disableFocusRipple: {
      control: "boolean",
    },
    disableRipple: {
      control: "boolean",
    },
    edge: {
      control: "radio",
      options: ["end", "start", false],
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    children: <SchoolIcon />,
    color: "default",
    disabled: false,
    disableFocusRipple: false,
    disableRipple: false,
    edge: false,
    size: "medium",
  },
};
