import type { Meta, StoryObj } from "@storybook/react-vite";

import { EllipsisWithTooltip } from "..";

const meta: Meta<typeof EllipsisWithTooltip> = {
  title: "Components/EllipsisWithTooltip",
  component: EllipsisWithTooltip,
  argTypes: {
    children: {
      description: "Le contenu affiché dans le composant (Typo et Tooltip).",
      control: "text",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof EllipsisWithTooltip>;

export const Default: Story = {
  args: {
    children:
      "Texte à afficher long, très long, très très looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong",
  },
};
