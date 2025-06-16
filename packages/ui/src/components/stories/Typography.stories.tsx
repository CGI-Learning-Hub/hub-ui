import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  argTypes: {
    align: {
      control: "select",
      options: ["center", "inherit", "justify", "left", "right"],
    },
    children: {
      control: "text",
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
        "textPrimary",
        "textSecondary",
        "textDisabled",
      ],
    },
    gutterBottom: {
      control: "boolean",
    },
    noWrap: {
      control: "boolean",
    },
    variant: {
      control: "select",
      options: [
        "body1",
        "body2",
        "button",
        "caption",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "inherit",
        "overline",
        "subtitle1",
        "subtitle2",
      ],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    align: "inherit",
    children: "CGI Learning Hub",
    gutterBottom: false,
    noWrap: false,
    variant: "body1",
  },
};
