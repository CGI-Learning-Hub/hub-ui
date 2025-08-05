import type { Meta, StoryObj } from "@storybook/react-vite";

import { EmptyState } from "../EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  argTypes: {
    image: {
      control: "object",
    },
    imageSrc: {
      control: "text",
    },
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
  },
};
export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    imageSrc: "/assets/client-error.svg",
    title: "Une erreur est  survenue",
  },
};
