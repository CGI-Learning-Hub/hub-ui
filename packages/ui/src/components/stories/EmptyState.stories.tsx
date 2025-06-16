import type { Meta, StoryObj } from "@storybook/react-vite";

import ClientErrorSvg from "../../../assets/client-error.svg?react";
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
    image: <ClientErrorSvg height="100%" />,
    title: "Une erreur est  survenue",
  },
};
