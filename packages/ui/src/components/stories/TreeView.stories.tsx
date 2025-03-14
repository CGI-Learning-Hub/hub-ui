import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import type { Meta, StoryObj } from "@storybook/react";

import { CustomTreeViewItem, ICON_TYPE, TreeView } from "../TreeView";

const meta: Meta<typeof TreeView> = {
  title: "Components/TreeView",
  component: TreeView,
  argTypes: {
    items: {
      description: "Liste des éléments à afficher dans le TreeView.",
      control: "object",
      table: {
        type: { summary: "CustomTreeViewItem[]" },
      },
    },
    onItemSelect: {
      description: "Fonction appelée lorsqu'un élément est sélectionné.",
      control: "none",
      table: {
        type: {
          summary: "(event: React.SyntheticEvent, itemId: string) => void",
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## TreeView

Un composant pour afficher des données hiérarchiques sous forme d'arborescence.

### Utilisation des icônes

Le TreeView permet de personnaliser les icônes selon les types suivants:
- \`ICON_TYPE.FOLDER\`: Icône de dossier (défaut)
- \`ICON_TYPE.SHARE\`: Icône de partage
- \`ICON_TYPE.TRASH\`: Icône de corbeille
- \`ICON_TYPE.CUSTOM\`: Icône personnalisée (nécessite de définir \`customIcon\`)

Vous pouvez également passer directement un composant SvgIcon comme valeur de \`iconType\`.

### Structure des données

Le composant attend un tableau d'objets \`CustomTreeViewItem\` qui étend l'interface \`TreeViewBaseItem\` de MUI:

\`\`\`typescript
interface CustomTreeViewItem extends TreeViewBaseItem {
  id: string;              // Identifiant unique de l'élément (obligatoire)
  label: string;           // Libellé à afficher (obligatoire)
  children?: CustomTreeViewItem[]; // Sous-éléments (facultatif)
  iconType?: IconType;     // Type d'icône (facultatif)
  customIcon?: SvgIconComponent; // Icône personnalisée si iconType est CUSTOM (facultatif)
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TreeView>;

// Exemples de données pour le TreeView
const standardItems: CustomTreeViewItem[] = [
  {
    id: "documents",
    label: "Mes formulaires",
    iconType: ICON_TYPE.FOLDER,
    children: [
      {
        id: "folder1",
        label: "Premier dossier",
        iconType: ICON_TYPE.FOLDER,
        children: [
          {
            id: "subfolder1",
            label: "Sous-dossier 1",
            iconType: ICON_TYPE.FOLDER,
          },
          {
            id: "subfolder2",
            label: "Sous-dossier 2",
            iconType: ICON_TYPE.FOLDER,
          },
        ],
      },
      {
        id: "folder2",
        label: "Deuxième dossier",
        iconType: ICON_TYPE.FOLDER,
      },
      {
        id: "folder3",
        label: "Troisième dossier",
        iconType: ICON_TYPE.FOLDER,
      },
    ],
  },
  {
    id: "shared",
    label: "Formulaires partagés avec moi",
    iconType: ICON_TYPE.SHARE,
  },
  {
    id: "trash",
    label: "Corbeille",
    iconType: ICON_TYPE.TRASH,
  },
];

// Données avec icônes personnalisées
const customIconItems: CustomTreeViewItem[] = [
  {
    id: "bookmarks",
    label: "Favoris",
    iconType: BookmarkIcon,
    children: [
      {
        id: "important",
        label: "Important",
        iconType: ICON_TYPE.CUSTOM,
        customIcon: PersonIcon,
      },
    ],
  },
  ...standardItems,
];

export const Default: Story = {
  args: {
    items: standardItems,
    onItemSelect: (event, itemId) => {
      console.log(`Élément sélectionné: ${itemId}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Exemple de base avec des icônes standard.",
      },
    },
  },
};

export const AvecIconesPersonnalisees: Story = {
  args: {
    items: customIconItems,
    onItemSelect: (event, itemId) => {
      console.log(`Élément sélectionné: ${itemId}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple utilisant à la fois des icônes prédéfinies et des icônes personnalisées.",
      },
    },
  },
};

export const StructureImbriquee: Story = {
  args: {
    items: [
      {
        id: "root",
        label: "Structure imbriquée complexe",
        iconType: ICON_TYPE.FOLDER,
        children: [
          {
            id: "level1-1",
            label: "Niveau 1.1",
            iconType: ICON_TYPE.FOLDER,
            children: [
              {
                id: "level2-1",
                label: "Niveau 2.1",
                iconType: ICON_TYPE.FOLDER,
                children: [
                  {
                    id: "level3-1",
                    label: "Niveau 3.1",
                    iconType: ICON_TYPE.FOLDER,
                  },
                  {
                    id: "level3-2",
                    label: "Niveau 3.2",
                    iconType: ICON_TYPE.SHARE,
                  },
                ],
              },
              {
                id: "level2-2",
                label: "Niveau 2.2",
                iconType: ICON_TYPE.TRASH,
              },
            ],
          },
          {
            id: "level1-2",
            label: "Niveau 1.2",
            iconType: ICON_TYPE.CUSTOM,
            customIcon: BookmarkIcon,
          },
        ],
      },
    ],
    onItemSelect: (event, itemId) => {
      console.log(`Élément sélectionné: ${itemId}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple d'une structure profondément imbriquée avec différents types d'icônes à chaque niveau.",
      },
    },
  },
};
