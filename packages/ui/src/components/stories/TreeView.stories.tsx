import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { TreeViewBaseItem } from "@mui/x-tree-view/models/items";
import type { Meta, StoryObj } from "@storybook/react";

import { TreeView } from "../TreeView";

const meta: Meta<typeof TreeView> = {
  title: "Components/TreeView",
  component: TreeView,
  argTypes: {
    items: {
      description: "Liste des éléments à afficher dans le TreeView.",
      control: "object",
      table: {
        type: { summary: "TreeViewBaseItem[]" },
      },
    },
    onItemSelect: {
      description: "Fonction appelée lorsqu'un élément est sélectionné.",
      table: {
        type: {
          summary: "(event: React.SyntheticEvent, itemId: string) => void",
        },
      },
    },
    folderIcon: {
      description: "Icône de dossier personnalisée.",
      control: false,
      table: {
        type: { summary: "SvgIconComponent" },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof TreeView>;

// Exemple de données pour le TreeView
const sampleItems: TreeViewBaseItem[] = [
  {
    id: "root",
    label: "Root",
    children: [
      {
        id: "child1",
        label: "Child 1",
        children: [
          {
            id: "child1-1",
            label: "Child 1.1",
          },
          {
            id: "child1-2",
            label: "Child 1.2",
          },
        ],
      },
      {
        id: "child2",
        label: "Child 2",
        children: [
          {
            id: "child2-1",
            label: "Child 2.1",
          },
        ],
      },
    ],
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const WithCustomIcon: Story = {
  args: {
    items: sampleItems,
    folderIcon: FolderOpenIcon,
  },
};

export const WithItemSelect: Story = {
  args: {
    items: sampleItems,
    onItemSelect: (event, itemId) => {
      console.log(`Selected item: ${itemId}`);
    },
  },
};
