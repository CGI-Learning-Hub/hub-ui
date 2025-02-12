import type { Meta, StoryObj } from "@storybook/react";

import { EllipsisWithTooltip } from "../EllipsisWithTooltip";

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
    tooltipProps: {
      description: "Les props de Tooltip (MUI).",
      control: "text",
      table: {
        type: { summary: "Omit<TooltipProps, 'children' | 'title'>" },
      },
    },
    typographyProps: {
      description: "Les props de Typography (MUI).",
      control: "text",
      table: {
        type: { summary: "TypographyProps" },
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
