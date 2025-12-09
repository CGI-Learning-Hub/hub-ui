import type { Meta, StoryObj } from "@storybook/react-vite";

import { Paper as BasePaper, type PaperProps } from "..";

const Paper = (props: PaperProps) => {
  return (
    <BasePaper sx={{ width: "10rem", height: "10rem", p: 1 }} {...props}>
      children
    </BasePaper>
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
