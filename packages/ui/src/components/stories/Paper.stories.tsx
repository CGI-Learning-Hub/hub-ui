import MUIPaper, { PaperProps } from "@mui/material/Paper";
import type { Meta, StoryObj } from "@storybook/react-vite";

const Paper = (props: PaperProps) => {
  return (
    <MUIPaper sx={{ width: "10rem", height: "10rem", p: 1 }} {...props}>
      children
    </MUIPaper>
  );
};

const meta: Meta<typeof Paper> = {
  title: "Components/Paper",
  component: Paper,
  argTypes: {
    elevation: {
      control: "number",
    },
    square: {
      control: "boolean",
    },
    variant: {
      control: "select",
      options: ["elevation", "outlined"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Paper>;

export const Default: Story = {
  args: {
    elevation: 1,
    square: false,
    variant: "elevation",
  },
};
