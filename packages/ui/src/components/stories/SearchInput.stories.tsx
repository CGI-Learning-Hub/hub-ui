import type { Meta, StoryObj } from "@storybook/react-vite";

import { SearchInput } from "../SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
};
export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: "Rechercher",
  },
};
