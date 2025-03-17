import type { Meta, StoryObj } from "@storybook/react";

import FolderCard from "../FolderCard/FolderCard";

const meta: Meta<typeof FolderCard> = {
  title: "Components/FolderCard",
  component: FolderCard,
  argTypes: {
    title: {
      description: "Title of the folder.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
      required: true,
    },
    subtitle: {
      description: "Subtitle of the folder.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
      required: true,
    },
    isSelected: {
      description: "Indicates if the folder is selected.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onSelect: {
      description: "Callback triggered when the folder is selected.",
      action: "folder-selected",
      table: {
        type: { summary: "() => void" },
      },
    },
    width: {
      description: "Width of the folder.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "320px" },
      },
    },
    onClick: {
      description: "Callback triggered on click.",
      action: "clicked",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FolderCard>;

export const Default: Story = {
  args: {
    title: "Mon premier dossier",
    subtitle: "0 dossier(s), 1 formulaire(s)",
    isSelected: false,
    width: "320px",
  },
};

export const Selected: Story = {
  args: {
    ...Default.args,
    isSelected: true,
    title: "Selected Folder",
  },
};
