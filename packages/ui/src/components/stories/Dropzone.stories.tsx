import type { Meta, StoryObj } from "@storybook/react-vite";

import { Dropzone } from "..";

const meta: Meta<typeof Dropzone> = {
  title: "Components/Dropzone",
  component: Dropzone,
};
export default meta;

type Story = StoryObj<typeof Dropzone>;

export const Default: Story = {
  args: {
    information: "SVG, PNG, JPG or GIF (max. 3MB)",
    onDrop: (files: any[]) => alert("dropped"),
  },
};
