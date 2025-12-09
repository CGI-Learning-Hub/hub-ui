import type { Meta, StoryObj } from "@storybook/react-vite";

import { LoaderBackdrop } from "..";

const meta: Meta<typeof LoaderBackdrop> = {
  title: "Components/LoaderBackdrop",
  component: LoaderBackdrop,
};
export default meta;

type Story = StoryObj<typeof LoaderBackdrop>;

export const Default: Story = {
  args: {},
};
