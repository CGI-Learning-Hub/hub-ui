import type { Meta, StoryObj } from "@storybook/react-vite";

import { SearchInput } from "..";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  argTypes: {
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
};
export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    disabled: false,
    fullWidth: false,
    loading: false,
    placeholder: "Rechercher",
  },
};
