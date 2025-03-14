import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

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
      table: {
        type: {
          summary: "(event: React.SyntheticEvent, itemId: string) => void",
        },
      },
    },
    iconColor: {
      description: "Couleur des icônes.",
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
      defaultValue: "primary",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
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

### Navigation et sélection

- \`onItemSelect\`: Permet de réagir quand un utilisateur clique sur un élément
- \`expandedItemId\`: Permet d'ouvrir automatiquement un dossier spécifique

### Structure des données

Le composant attend un tableau d'objets \`CustomTreeViewItem\` qui étend l'interface \`TreeViewBaseItem\` de MUI:

\`\`\`typescript
interface CustomTreeViewItemProps {
  internalId: string;      // Identifiant unique de l'élément (obligatoire)
  label: string;           // Libellé à afficher (obligatoire)
  iconType?: IconType;     // Type d'icône (facultatif)
  customIcon?: SvgIconComponent; // Icône personnalisée si iconType est CUSTOM (facultatif)
}

type CustomTreeViewItem = TreeViewBaseItem<CustomTreeViewItemProps>;
\`\`\`
        `,
      },
    },
  },
};

export default meta;

// Wrapper pour montrer la sélection en direct
const SelectionDemo = ({ items }: { items: CustomTreeViewItem[] }) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const handleSelect = useCallback(
    (event: React.SyntheticEvent, itemId: string) => {
      console.log(`Élément sélectionné: ${itemId}`);
      setSelectedId(itemId);
    },
    [],
  );

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Sélection actuelle: {selectedId || "Aucun élément sélectionné"}
      </Typography>
      <TreeView
        items={items}
        onItemSelect={handleSelect}
      />
    </Box>
  );
};

type Story = StoryObj<typeof TreeView>;

// Exemples de données pour le TreeView avec internalId au lieu de id
const standardItems: CustomTreeViewItem[] = [
  {
    internalId: "documents",
    label: "Mes formulaires",
    iconType: ICON_TYPE.FOLDER,
    children: [
      {
        internalId: "folder1",
        label: "Premier dossier",
        iconType: ICON_TYPE.FOLDER,
        children: [
          {
            internalId: "subfolder1",
            label: "Sous-dossier 1",
            iconType: ICON_TYPE.FOLDER,
          },
          {
            internalId: "subfolder2",
            label: "Sous-dossier 2",
            iconType: ICON_TYPE.FOLDER,
          },
        ],
      },
      {
        internalId: "folder2",
        label: "Deuxième dossier",
        iconType: ICON_TYPE.FOLDER,
      },
      {
        internalId: "folder3",
        label: "Troisième dossier",
        iconType: ICON_TYPE.FOLDER,
      },
    ],
  },
  {
    internalId: "shared",
    label: "Formulaires partagés avec moi",
    iconType: ICON_TYPE.SHARE,
  },
  {
    internalId: "trash",
    label: "Corbeille",
    iconType: ICON_TYPE.TRASH,
  },
];

// Données avec icônes personnalisées
const customIconItems: CustomTreeViewItem[] = [
  {
    internalId: "bookmarks",
    label: "Favoris",
    iconType: BookmarkIcon,
    children: [
      {
        internalId: "important",
        label: "Important",
        iconType: ICON_TYPE.CUSTOM,
        customIcon: PersonIcon,
      },
    ],
  },
  ...standardItems,
];

export const Default: Story = {
  render: () => <SelectionDemo items={standardItems} />,
  parameters: {
    docs: {
      description: {
        story:
          "Exemple de base avec des icônes standard et démonstration de sélection.",
      },
    },
  },
};

export const WithExplicitExpand: Story = {
  args: {
    items: standardItems,
    onItemSelect: (event, itemId) => {
      console.log(`Élément sélectionné: ${itemId}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec développement automatique d'un dossier spécifique.",
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
        internalId: "root",
        label: "Structure imbriquée complexe",
        iconType: ICON_TYPE.FOLDER,
        children: [
          {
            internalId: "level1-1",
            label: "Niveau 1.1",
            iconType: ICON_TYPE.FOLDER,
            children: [
              {
                internalId: "level2-1",
                label: "Niveau 2.1",
                iconType: ICON_TYPE.FOLDER,
                children: [
                  {
                    internalId: "level3-1",
                    label: "Niveau 3.1",
                    iconType: ICON_TYPE.FOLDER,
                  },
                  {
                    internalId: "level3-2",
                    label: "Niveau 3.2",
                    iconType: ICON_TYPE.SHARE,
                  },
                ],
              },
              {
                internalId: "level2-2",
                label: "Niveau 2.2",
                iconType: ICON_TYPE.TRASH,
              },
            ],
          },
          {
            internalId: "level1-2",
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
