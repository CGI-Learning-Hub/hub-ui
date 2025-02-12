import type { Meta, StoryObj } from "@storybook/react";

import { EmptyState } from "../EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
};
export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    svgName: "client-error",
    title: "Une erreur est  survenue",
  },
};
