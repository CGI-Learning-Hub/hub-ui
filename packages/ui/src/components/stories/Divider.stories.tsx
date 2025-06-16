import Divider from "@mui/material/Divider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  argTypes: {
    absolute: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
    flexItem: {
      control: "boolean",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    textAlign: {
      control: "select",
      options: ["center", "left", "right"],
    },
    variant: {
      control: "select",
      options: ["fullWidth", "inset", "middle"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    absolute: false,
    children: undefined,
    flexItem: false,
    orientation: "horizontal",
    textAlign: "center",
    variant: "fullWidth",
  },
};
