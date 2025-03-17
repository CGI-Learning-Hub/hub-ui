import BookmarkIcon from "@mui/icons-material/Bookmark";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useRef, useState } from "react";

import { TreeView } from "../TreeView";
import { CustomTreeViewItem, ICON_TYPE } from "../TreeView/types";

const meta: Meta<typeof TreeView> = {
  title: "Components/TreeView",
  component: TreeView,
  argTypes: {
    items: {
      description:
        "**[Requis]** Liste des éléments à afficher dans le TreeView.",
      control: "object",
      table: {
        required: true,
        type: { summary: "CustomTreeViewItem[]" },
      },
    },
    selectedItemId: {
      description: "**[Requis]** Identifiant de l'élément sélectionné.",
      control: "text",
      table: {
        required: true,
        type: { summary: "string" },
      },
    },
    handleSelectedItemChange: {
      description:
        "**[Requis]** Fonction appelée lorsqu'un élément est sélectionné.",
      table: {
        required: true,
        type: {
          summary:
            "(event: React.SyntheticEvent, itemIds: string | null) => void",
        },
      },
    },
    iconColor: {
      description: "**[Optionnel]** Couleur des icônes.",
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
      defaultValue: "primary",
      table: {
        required: false,
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

- \`handleSelectedItemChange\`: Permet de réagir quand un utilisateur clique sur un élément
- \`selectedItemId\`: Permet de définir l'élément sélectionné

### Gestion du Drag and Drop

Le TreeView inclut des attributs \`data-\` qui vous permettent d'identifier facilement les éléments lors d'opérations de glisser-déposer :
- \`data-treeview-root="true"\` : Identifie la racine du TreeView
- \`data-treeview-item="itemId"\` : Contient l'ID de l'élément 
- \`data-treeview-item-label="label"\` : Contient le libellé de l'élément

Pour gérer le drop, ajoutez des gestionnaires d'événements au niveau du conteneur parent et utilisez \`event.target.closest('[data-treeview-item]')\` pour identifier l'élément cible.

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

const flattenTreeItems = (
  items: CustomTreeViewItem[],
): CustomTreeViewItem[] => {
  const flatList: CustomTreeViewItem[] = [];

  const processItem = (item: CustomTreeViewItem) => {
    flatList.push(item);
    if (item.children) {
      item.children.forEach((child) =>
        processItem(child as CustomTreeViewItem),
      );
    }
  };

  items.forEach((item) => processItem(item));
  return flatList;
};

// Composant de sélection externe
const ExternalSelector = ({
  items,
  selectedItemId,
  onItemSelect,
}: {
  items: CustomTreeViewItem[];
  selectedItemId: string;
  onItemSelect: (itemId: string) => void;
}) => {
  const flatItems = flattenTreeItems(items);

  return (
    <Paper sx={{ width: "100%", maxHeight: 300, overflow: "auto" }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Sélection externe
      </Typography>
      <Divider />
      <List>
        {flatItems.map((item) => (
          <ListItem key={item.internalId} disablePadding>
            <ListItemButton
              selected={selectedItemId === item.internalId}
              onClick={() => onItemSelect(item.internalId)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

// Composant pour tester la sélection aléatoire
const RandomSelector = ({
  items,
  onRandomSelect,
}: {
  items: CustomTreeViewItem[];
  onRandomSelect: (itemId: string) => void;
}) => {
  const flatItems = flattenTreeItems(items);

  const handleRandomSelect = () => {
    const randomIndex = Math.floor(Math.random() * flatItems.length);
    onRandomSelect(flatItems[randomIndex].internalId);
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Button variant="contained" color="primary" onClick={handleRandomSelect}>
        Sélection aléatoire
      </Button>
    </Box>
  );
};

// Composant d'élément glissable pour l'exemple
const DraggableItem = ({ id, label }: { id: string; label: string }) => {
  return (
    <Box
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(
          "application/json",
          JSON.stringify({ id, label }),
        );
      }}
      sx={{
        padding: 1,
        margin: 1,
        backgroundColor: "grey.100",
        borderRadius: 1,
        display: "inline-block",
        cursor: "grab",
        "&:hover": {
          backgroundColor: "grey.200",
        },
      }}
    >
      <Typography variant="body2" display="flex" alignItems="center">
        <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
        {label}
      </Typography>
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

// Données pour l'exemple de synchronicité
const syncExampleItems: CustomTreeViewItem[] = [
  {
    internalId: "documents",
    label: "Documents",
    iconType: ICON_TYPE.SHARE,
    children: [
      {
        internalId: "reports",
        label: "Rapports",
        iconType: ICON_TYPE.FOLDER,
        children: [
          {
            internalId: "report1",
            label: "Rapport Janvier",
            iconType: ICON_TYPE.FOLDER,
          },
          {
            internalId: "report2",
            label: "Rapport Février",
            iconType: ICON_TYPE.FOLDER,
          },
          {
            internalId: "report3",
            label: "Rapport Mars",
            iconType: ICON_TYPE.FOLDER,
          },
        ],
      },
      { internalId: "invoices", label: "Factures", iconType: ICON_TYPE.FOLDER },
    ],
  },
  {
    internalId: "media",
    label: "Médias",
    iconType: ICON_TYPE.FOLDER,
    children: [
      { internalId: "images", label: "Images", iconType: ICON_TYPE.FOLDER },
      { internalId: "videos", label: "Vidéos", iconType: ICON_TYPE.FOLDER },
    ],
  },
  {
    internalId: "downloads",
    label: "Téléchargements",
    iconType: ICON_TYPE.FOLDER,
  },
];

export const Default: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string>("");

    const handleSelectedItemChange = useCallback(
      (event: React.SyntheticEvent, itemId: string | null) => {
        console.log(`Élément sélectionné: ${itemId}`);
        if (itemId) {
          setSelectedId(itemId);
        }
      },
      [],
    );

    return (
      <Box sx={{ maxWidth: 300, overflowY: "hidden" }}>
        <TreeView
          items={standardItems}
          selectedItemId={selectedId}
          handleSelectedItemChange={handleSelectedItemChange}
        />
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story:
          "Exemple de base avec des icônes standard et démonstration de sélection.",
      },
    },
  },
};

export const Controlable: Story = {
  args: {
    items: standardItems,
    selectedItemId: "folder1",
    handleSelectedItemChange: (event, itemId) => {
      console.log(`Élément sélectionné: ${itemId}`);
    },
    iconColor: "success",
  },
  render: (args) => (
    <Box sx={{ maxWidth: 300, overflowY: "hidden" }}>
      <TreeView {...args} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Cette story permet de contrôler les propriétés du TreeView directement via le panneau de contrôle de Storybook. Essayez de changer la couleur des icônes pour voir l'effet en temps réel.",
      },
    },
  },
};

export const AvecIconesPersonnalisees: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string>("bookmarks");

    const handleSelectedItemChange = useCallback(
      (event: React.SyntheticEvent, itemId: string | null) => {
        console.log(`Élément sélectionné: ${itemId}`);
        if (itemId) {
          setSelectedId(itemId);
        }
      },
      [],
    );

    return (
      <Box sx={{ maxWidth: 300, overflowY: "hidden" }}>
        <TreeView
          items={customIconItems}
          selectedItemId={selectedId}
          handleSelectedItemChange={handleSelectedItemChange}
        />
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story:
          "Exemple utilisant à la fois des icônes prédéfinies et des icônes personnalisées.",
      },
    },
  },
};

export const StructureImbriquee: Story = {
  render: () => {
    const items = [
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
                    internalId: "level3-1V",
                    label: "VOUS M'AVEZ TROUVÉ HIHIHI",
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
    ];

    const [selectedId, setSelectedId] = useState<string>("level2-1");

    const handleSelectedItemChange = useCallback(
      (event: React.SyntheticEvent, itemId: string | null) => {
        console.log(`Élément sélectionné: ${itemId}`);
        if (itemId) {
          setSelectedId(itemId);
        }
      },
      [],
    );

    return (
      <Box sx={{ maxWidth: 400, overflowY: "hidden" }}>
        <TreeView
          items={items}
          selectedItemId={selectedId}
          handleSelectedItemChange={handleSelectedItemChange}
        />
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story: "Exemple d'une structure profondément imbriquée.",
      },
    },
  },
};

export const OptionsDeCouleurs: Story = {
  render: () => {
    const colors = ["primary", "secondary", "info"];
    const [selectedIds, setSelectedIds] = useState<Record<string, string>>({
      primary: "",
      secondary: "",
      info: "",
    });

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 3,
          overflowY: "hidden",
        }}
      >
        {colors.map((color) => (
          <Box
            key={color}
            sx={{
              maxWidth: 250,
              overflowY: "hidden",
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Icônes {color}
            </Typography>
            <TreeView
              items={standardItems}
              selectedItemId={selectedIds[color]}
              handleSelectedItemChange={(event, itemId) => {
                if (itemId) {
                  setSelectedIds((prev) => ({ ...prev, [color]: itemId }));
                }
              }}
              iconColor={color as any}
            />
          </Box>
        ))}
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story:
          "Démonstration des principales options de couleurs disponibles pour les icônes.",
      },
    },
  },
};

export const Synchronicite: Story = {
  render: () => {
    const [selectedItemId, setSelectedItemId] = useState<string>("reports");

    const handleSelectedItemChange = (
      event: React.SyntheticEvent,
      itemId: string | null,
    ) => {
      console.log("TreeView sélection:", itemId);
      if (itemId) {
        setSelectedItemId(itemId);
      }
    };

    const handleExternalSelect = (itemId: string) => {
      console.log("Sélection externe:", itemId);
      setSelectedItemId(itemId);
    };

    const getSelectedItemInfo = () => {
      const flatItems = flattenTreeItems(syncExampleItems);
      const selectedItem = flatItems.find(
        (item) => item.internalId === selectedItemId,
      );
      return selectedItem ? selectedItem.label : "Aucun élément sélectionné";
    };

    return (
      <Box sx={{ width: "100%", overflowY: "hidden" }}>
        <Typography variant="subtitle1" gutterBottom>
          Élément sélectionné: <strong>{getSelectedItemInfo()}</strong> (ID:{" "}
          {selectedItemId})
        </Typography>

        <RandomSelector
          items={syncExampleItems}
          onRandomSelect={handleExternalSelect}
        />

        <Grid container spacing={3} sx={{ overflowY: "hidden" }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, overflowY: "hidden" }}>
              <Typography variant="h6" gutterBottom>
                TreeView
              </Typography>
              <TreeView
                items={syncExampleItems}
                selectedItemId={selectedItemId}
                handleSelectedItemChange={handleSelectedItemChange}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <ExternalSelector
              items={syncExampleItems}
              selectedItemId={selectedItemId}
              onItemSelect={handleExternalSelect}
            />
          </Grid>
        </Grid>
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story:
          "Démonstration de la synchronisation entre le TreeView et d'autres composants. Cette story montre comment le TreeView peut être intégré dans une interface complexe où la sélection peut provenir de différentes sources mais reste synchronisée.",
      },
    },
  },
};

export const AvecDragAndDrop: Story = {
  render: () => {
    // État pour les données du TreeView
    const [treeItems, setTreeItems] = useState<CustomTreeViewItem[]>([
      ...standardItems,
    ]);
    const [selectedItemId, setSelectedItemId] = useState<string>("folder1");

    // État pour stocker les informations sur le dernier drop
    const [lastDrop, setLastDrop] = useState<{
      itemId: string | null;
      itemLabel: string | null;
      droppedItem: { id: string; label: string } | null;
    } | null>(null);

    // Éléments que l'on peut glisser sur le TreeView
    const draggableItems = [
      { id: "doc1", label: "Document 1" },
      { id: "doc2", label: "Document 2" },
      { id: "doc3", label: "Document 3" },
    ];

    // Gestionnaire du drop sur le TreeView ou ses éléments
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();

      // Identifier l'élément cible
      const target = e.target as HTMLElement;
      const treeviewItem = target.closest("[data-treeview-item]");

      let targetItemId: string | null = null;
      let targetItemLabel: string | null = null;

      if (treeviewItem) {
        // Drop sur un élément spécifique
        targetItemId = treeviewItem.getAttribute("data-treeview-item");
        targetItemLabel = treeviewItem.getAttribute("data-treeview-item-label");
      } else {
        // Drop sur le TreeView en général
        const treeviewRoot = target.closest("[data-treeview-root]");
        if (treeviewRoot) {
          targetItemId = null;
          targetItemLabel = "Racine du TreeView";
        }
      }

      // Récupérer les données de l'élément glissé
      try {
        const data = JSON.parse(e.dataTransfer.getData("application/json"));

        // Mettre à jour les informations du dernier drop
        setLastDrop({
          itemId: targetItemId,
          itemLabel: targetItemLabel,
          droppedItem: data,
        });

        // Sélectionner automatiquement le dossier cible
        if (targetItemId) {
          setSelectedItemId(targetItemId);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    return (
      <Box sx={{ maxWidth: 700, overflowY: "hidden" }}>
        <Typography variant="h6" gutterBottom>
          Exemple de Drag & Drop avec le TreeView
        </Typography>

        <Typography variant="body2" gutterBottom>
          Glissez-déposez un des documents ci-dessous sur un élément du
          TreeView.
        </Typography>

        <Box sx={{ display: "flex", mb: 2 }}>
          {draggableItems.map((item) => (
            <DraggableItem key={item.id} id={item.id} label={item.label} />
          ))}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2,
                border: "1px dashed gray",
                borderRadius: 1,
                minHeight: 300,
                overflowY: "hidden",
                backgroundColor: "background.paper",
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <Typography variant="subtitle1" gutterBottom>
                Zone de drop
              </Typography>

              <TreeView
                items={treeItems}
                selectedItemId={selectedItemId}
                handleSelectedItemChange={(event, itemId) => {
                  if (itemId) {
                    setSelectedItemId(itemId);
                  }
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, minHeight: 300 }}>
              <Typography variant="subtitle1" gutterBottom>
                Informations du dernier drop
              </Typography>

              {lastDrop ? (
                <Box>
                  <Typography variant="body2">
                    <strong>Élément cible :</strong> {lastDrop.itemLabel}{" "}
                    {lastDrop.itemId && `(ID: ${lastDrop.itemId})`}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Élément déposé :</strong>{" "}
                    {lastDrop.droppedItem?.label} (ID:{" "}
                    {lastDrop.droppedItem?.id})
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Code pour gérer ce drop :</strong>
                    </Typography>
                    <Paper sx={{ p: 1, mt: 1, backgroundColor: "grey.100" }}>
                      <pre
                        style={{
                          margin: 0,
                          fontSize: "0.8rem",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {`// Dans votre gestionnaire d'événements
const handleDrop = (e) => {
  e.preventDefault();
  
  // Identifier l'élément cible
  const target = e.target;
  const treeviewItem = target.closest('[data-treeview-item]');
  
  if (treeviewItem) {
    const targetId = treeviewItem.getAttribute('data-treeview-item');
    const targetLabel = treeviewItem.getAttribute('data-treeview-item-label');
    
    // Récupérer les données de l'élément déposé
    const droppedData = JSON.parse(e.dataTransfer.getData('application/json'));
    
    console.log(\`Élément "\${droppedData.label}" déposé sur "\${targetLabel}"\`);
    
    // Votre logique pour traiter le drop...
  }
};`}
                      </pre>
                    </Paper>
                  </Box>
                </Box>
              ) : (
                <Typography variant="body2">
                  Aucun élément déposé pour le moment. Glissez un document sur
                  le TreeView pour voir les informations ici.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story:
          "Cette story démontre comment utiliser les attributs `data-` du TreeView pour implémenter une fonctionnalité de drag and drop. Glissez un document sur un élément du TreeView pour voir comment accéder aux informations de l'élément cible.",
      },
    },
  },
};
