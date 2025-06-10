import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { ButtonGroup } from "../ButtonGroup";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  argTypes: {
    buttonList: {
      description:
        "**[Requis]** Liste des boutons à afficher dans le ButtonGroup.",
      control: "object",
      table: {
        required: true,
        type: { summary: "readonly ButtonItem[]" },
      },
    },
    viewMode: {
      description: "**[Requis]** Valeur actuellement sélectionnée.",
      control: "text",
      table: {
        required: true,
        type: { summary: "T[number]['value']" },
      },
    },
    onChange: {
      description:
        "**[Requis]** Fonction appelée lorsqu'un bouton est sélectionné.",
      table: {
        required: true,
        type: {
          summary: "(value: T[number]['value']) => void",
        },
      },
    },
    colorVariant: {
      description: "**[Optionnel]** Variante de couleur des boutons.",
      control: "select",
      options: ["primary", "secondary"],
      defaultValue: "primary",
      table: {
        required: false,
        type: { summary: "ColorVariant" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      description: "**[Optionnel]** Taille des boutons.",
      control: "select",
      options: ["small", "medium", "large"],
      defaultValue: "small",
      table: {
        required: false,
        type: { summary: "string" },
        defaultValue: { summary: "small" },
      },
    },
    orientation: {
      description: "**[Optionnel]** Orientation du groupe de boutons.",
      control: "select",
      options: ["horizontal", "vertical"],
      defaultValue: "horizontal",
      table: {
        required: false,
        type: { summary: "string" },
        defaultValue: { summary: "horizontal" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## ButtonGroup

Un composant générique TypeScript pour permettre à l'utilisateur de basculer entre différents modes d'affichage ou options avec une sécurité de type complète.

### 🔥 Typage générique et sécurité des types

Le ButtonGroup utilise TypeScript générique avancé pour inférer automatiquement les types des valeurs possibles à partir de la liste des boutons fournie. **Il n'est plus nécessaire de définir un enum**, les types sont déduits automatiquement grâce à la magie de TypeScript !

**Point clé** : Utilisez toujours \`as const\` après votre tableau de boutons pour permettre l'inférence de type littéral.

### 🎯 Utilisation recommandée pour éviter les types 'any'

\`\`\`typescript
// ✅ CORRECT : Définition avec 'as const' pour l'inférence de type
const viewButtons = [
  { value: "cards", icon: <ViewModuleIcon /> },
  { value: "table", icon: <TableRowsIcon /> },
  { value: "list", icon: <ListIcon /> }
] as const; // ← IMPORTANT : ne pas oublier 'as const'

// ✅ CORRECT : Typage explicite pour le state et le handler
type ViewType = (typeof viewButtons)[number]["value"]; // "cards" | "table" | "list"

const [currentView, setCurrentView] = useState<ViewType>("cards");

const handleViewChange = useCallback((value: ViewType) => {
  console.log(\`Vue sélectionnée: \${value}\`); // ← value est typé correctement
  setCurrentView(value);
}, []);

<ButtonGroup 
  buttonList={viewButtons}
  viewMode={currentView}
  onChange={handleViewChange} // ← Pas d'erreur 'any' !
/>
\`\`\`

### ❌ À éviter : patterns qui causent des types 'any'

\`\`\`typescript
// ❌ INCORRECT : Sans 'as const'
const viewButtons = [
  { value: "cards", icon: <ViewModuleIcon /> },
  { value: "table", icon: <TableRowsIcon /> }
]; // ← types inférés comme 'string' au lieu de littéraux

// ❌ INCORRECT : Handler sans typage explicite
const handleViewChange = (value) => { // ← 'value' aura le type 'any'
  setCurrentView(value);
};
\`\`\`

### 🛠️ Personnalisation

- \`colorVariant\`: Choix entre les palettes "primary" et "secondary"
- \`size\`: Contrôle la taille des boutons ("small", "medium", "large")
- \`orientation\`: Affichage horizontal ou vertical du groupe de boutons
- \`disabled\`: Possibilité de désactiver individuellement certains boutons

### 📋 Structure des données

Le composant attend un tableau d'objets \`ButtonItem\` typé de manière générique :

\`\`\`typescript
interface ButtonItem<T extends string = string> {
  value: T;           // Valeur unique pour ce bouton (obligatoire)
  icon: ReactNode;    // Icône à afficher (obligatoire)
  disabled?: boolean; // Désactiver ce bouton spécifique (facultatif)
}

// Le composant infère automatiquement T à partir de votre tableau
type SwitchViewProps<T extends readonly ButtonItem<string>[]> = {
  buttonList: T;
  viewMode: T[number]["value"];           // Type inféré automatiquement
  onChange: (value: T[number]["value"]) => void; // Type inféré automatiquement
  // ... autres props
}
\`\`\`

### 🎉 Avantages du typage générique

1. **Auto-complétion** : IDE suggère automatiquement les valeurs possibles
2. **Vérification à la compilation** : Erreurs détectées avant l'exécution
3. **Refactoring sûr** : Renommer une valeur met à jour toutes les références
4. **Documentation vivante** : Les types servent de documentation

### 💡 Conseils pour une utilisation optimale

1. **Utilisez des types helper** pour éviter la répétition :
\`\`\`typescript
type ViewConfig = typeof viewButtons;
type ViewType = ViewConfig[number]["value"];
\`\`\`

2. **Créez des constantes réutilisables** :
\`\`\`typescript
export const VIEW_MODES = {
  CARDS: "cards",
  TABLE: "table", 
  LIST: "list"
} as const;

const viewButtons = [
  { value: VIEW_MODES.CARDS, icon: <ViewModuleIcon /> },
  // ...
] as const;
\`\`\`

3. **Utilisez des factory functions** pour des configurations complexes :
\`\`\`typescript
const createViewButton = <T extends string>(value: T, icon: ReactNode) => 
  ({ value, icon } as const);
\`\`\`
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

// ✅ Données d'exemple avec typage correct
const standardViewButtons = [
  { value: "cards", icon: <ViewModuleIcon /> },
  { value: "table", icon: <TableRowsIcon /> },
  { value: "list", icon: <ListIcon /> },
] as const;

const extendedViewButtons = [
  { value: "grid", icon: <GridViewIcon /> },
  { value: "cards", icon: <ViewComfyIcon /> },
  { value: "table", icon: <TableRowsIcon /> },
  { value: "list", icon: <ListIcon /> },
  { value: "calendar", icon: <CalendarViewMonthIcon /> },
] as const;

const buttonsWithDisabled = [
  { value: "cards", icon: <ViewModuleIcon /> },
  { value: "table", icon: <TableRowsIcon />, disabled: true },
  { value: "list", icon: <ListIcon /> },
] as const;

// ✅ Types helper pour éviter la répétition
type StandardViewType = (typeof standardViewButtons)[number]["value"];
type ExtendedViewType = (typeof extendedViewButtons)[number]["value"];
type ButtonsWithDisabledType = (typeof buttonsWithDisabled)[number]["value"];

export const Default: Story = {
  render: () => {
    const [selectedView, setSelectedView] = useState<StandardViewType>("cards");

    const handleViewChange = useCallback((value: StandardViewType) => {
      console.log(`Vue sélectionnée: ${value}`);
      setSelectedView(value);
    }, []);

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Sélecteur de vue standard
        </Typography>
        <ButtonGroup
          buttonList={standardViewButtons}
          viewMode={selectedView}
          onChange={handleViewChange}
        />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Vue actuelle: <strong>{selectedView}</strong>
        </Typography>
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story:
          "Sélecteur de vue basique permettant de basculer entre trois modes d'affichage : cartes, tableau et liste.",
      },
    },
  },
};

export const Controlable: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState<StandardViewType>("table");
    const [colorVariant, setColorVariant] = useState<"primary" | "secondary">(
      "primary",
    );
    const [size, setSize] = useState<"small" | "medium" | "large">("small");
    const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
      "horizontal",
    );

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Personnalisation en temps réel
        </Typography>

        {/* Contrôles manuels */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Couleur
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                size="small"
                variant={colorVariant === "primary" ? "contained" : "outlined"}
                onClick={() => setColorVariant("primary")}
              >
                Primary
              </Button>
              <Button
                size="small"
                variant={
                  colorVariant === "secondary" ? "contained" : "outlined"
                }
                onClick={() => setColorVariant("secondary")}
              >
                Secondary
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Taille
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {(["small", "medium", "large"] as const).map((s) => (
                <Button
                  key={s}
                  size="small"
                  variant={size === s ? "contained" : "outlined"}
                  onClick={() => setSize(s)}
                >
                  {s}
                </Button>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Orientation
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                size="small"
                variant={
                  orientation === "horizontal" ? "contained" : "outlined"
                }
                onClick={() => setOrientation("horizontal")}
              >
                Horizontal
              </Button>
              <Button
                size="small"
                variant={orientation === "vertical" ? "contained" : "outlined"}
                onClick={() => setOrientation("vertical")}
              >
                Vertical
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Vue actuelle
            </Typography>
            <Typography variant="body2" color="primary">
              <strong>{viewMode}</strong>
            </Typography>
          </Grid>
        </Grid>

        {/* Le ButtonGroup */}
        <Paper sx={{ p: 3, display: "inline-block" }}>
          <ButtonGroup
            buttonList={standardViewButtons}
            viewMode={viewMode}
            onChange={(value: StandardViewType) => {
              console.log(`Vue sélectionnée: ${value}`);
              setViewMode(value);
            }}
            colorVariant={colorVariant}
            size={size}
            orientation={orientation}
          />
        </Paper>
      </Box>
    );
  },
  parameters: {
    controls: { disable: true }, // Désactiver les contrôles automatiques
    actions: { disable: true },
    docs: {
      description: {
        story:
          "Interface de démonstration permettant de tester toutes les options de personnalisation disponibles : couleur, taille et orientation des boutons.",
      },
    },
  },
};

export const TypageGenerique: Story = {
  render: () => {
    // ✅ Démonstration de différents types inférés automatiquement
    const simpleButtons = [
      { value: "on", icon: <ViewModuleIcon /> },
      { value: "off", icon: <TableRowsIcon /> },
    ] as const;

    const statusButtons = [
      { value: "active", icon: <ViewComfyIcon /> },
      { value: "inactive", icon: <ListIcon /> },
      { value: "pending", icon: <GridViewIcon /> },
    ] as const;

    const modeButtons = [
      { value: "edit", icon: <ViewModuleIcon /> },
      { value: "view", icon: <TableRowsIcon /> },
      { value: "preview", icon: <ListIcon /> },
    ] as const;

    // ✅ Types automatiquement inférés
    type SimpleType = (typeof simpleButtons)[number]["value"]; // "on" | "off"
    type StatusType = (typeof statusButtons)[number]["value"]; // "active" | "inactive" | "pending"
    type ModeType = (typeof modeButtons)[number]["value"]; // "edit" | "view" | "preview"

    const [simpleState, setSimpleState] = useState<SimpleType>("on");
    const [statusState, setStatusState] = useState<StatusType>("active");
    const [modeState, setModeState] = useState<ModeType>("edit");

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Différents contextes d'utilisation
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Le même composant s'adapte automatiquement à différents types de
          données.
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Mode binaire
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 2 }}
              >
                Activation/Désactivation simple
              </Typography>
              <ButtonGroup
                buttonList={simpleButtons}
                viewMode={simpleState}
                onChange={(value: SimpleType) => {
                  console.log("Simple:", value); // ← value est "on" | "off"
                  setSimpleState(value);
                }}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                État: {simpleState}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Statut système
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 2 }}
              >
                Gestion d'états métier
              </Typography>
              <ButtonGroup
                buttonList={statusButtons}
                viewMode={statusState}
                onChange={(value: StatusType) => {
                  console.log("Status:", value); // ← value est "active" | "inactive" | "pending"
                  setStatusState(value);
                }}
                colorVariant="secondary"
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Statut: {statusState}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Mode d'édition
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 2 }}
              >
                Interface utilisateur adaptative
              </Typography>
              <ButtonGroup
                buttonList={modeButtons}
                viewMode={modeState}
                onChange={(value: ModeType) => {
                  console.log("Mode:", value); // ← value est "edit" | "view" | "preview"
                  setModeState(value);
                }}
                size="medium"
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Mode: {modeState}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper
          sx={{
            p: 2,
            mt: 3,
            backgroundColor: "info.light",
            color: "info.contrastText",
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            🎯 Flexibilité du composant
          </Typography>
          <Typography variant="body2">
            Un seul composant peut gérer n'importe quel ensemble d'options,
            s'adaptant automatiquement au contexte d'utilisation.
          </Typography>
        </Paper>
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story:
          "Démonstration de la polyvalence du composant avec différents ensembles d'options : mode binaire, statuts système et modes d'édition.",
      },
    },
  },
};

export const VariantesDecouleurs: Story = {
  render: () => {
    const colors: Array<"primary" | "secondary"> = ["primary", "secondary"];
    const [selectedViews, setSelectedViews] = useState<
      Record<string, StandardViewType>
    >({
      primary: "cards",
      secondary: "table",
    });

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Comparaison des variantes de couleurs
        </Typography>
        <Grid container spacing={3}>
          {colors.map((color) => (
            <Grid key={color} size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Variante {color}
                </Typography>
                <ButtonGroup
                  buttonList={standardViewButtons}
                  viewMode={selectedViews[color]}
                  onChange={(value: StandardViewType) => {
                    setSelectedViews((prev) => ({ ...prev, [color]: value }));
                  }}
                  colorVariant={color}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Sélectionné: {selectedViews[color]}
                </Typography>
              </Paper>
            </Grid>
          ))}
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
          "Démonstration des deux variantes de couleurs disponibles : primary et secondary.",
      },
    },
  },
};

export const TaillesDifferentes: Story = {
  render: () => {
    const sizes: Array<"small" | "medium" | "large"> = [
      "small",
      "medium",
      "large",
    ];
    const [selectedViews, setSelectedViews] = useState<
      Record<string, StandardViewType>
    >({
      small: "cards",
      medium: "table",
      large: "list",
    });

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Comparaison des tailles
        </Typography>
        <Grid container spacing={3}>
          {sizes.map((size) => (
            <Grid key={size} size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Taille {size}
                </Typography>
                <ButtonGroup
                  buttonList={standardViewButtons}
                  viewMode={selectedViews[size]}
                  onChange={(value: StandardViewType) => {
                    setSelectedViews((prev) => ({ ...prev, [size]: value }));
                  }}
                  size={size}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Sélectionné: {selectedViews[size]}
                </Typography>
              </Paper>
            </Grid>
          ))}
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
          "Démonstration des trois tailles disponibles : small, medium et large.",
      },
    },
  },
};

export const OrientationVerticale: Story = {
  render: () => {
    const [selectedView, setSelectedView] = useState<ExtendedViewType>("grid");

    const handleViewChange = useCallback((value: ExtendedViewType) => {
      setSelectedView(value);
    }, []);

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Orientation verticale
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Orientation verticale - Taille medium
              </Typography>
              <ButtonGroup
                buttonList={extendedViewButtons}
                viewMode={selectedView}
                onChange={handleViewChange}
                orientation="vertical"
                size="medium"
              />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Orientation horizontale (comparaison)
              </Typography>
              <ButtonGroup
                buttonList={extendedViewButtons}
                viewMode={selectedView}
                onChange={handleViewChange}
                orientation="horizontal"
                size="medium"
              />
            </Paper>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Vue actuelle: <strong>{selectedView}</strong>
        </Typography>
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story:
          "Démonstration de l'orientation verticale comparée à l'orientation horizontale avec plus d'options.",
      },
    },
  },
};

export const AvecTexteOptionnel: Story = {
  render: () => {
    // Boutons avec texte
    const buttonsWithText = [
      {
        value: "grid",
        icon: <GridViewIcon />,
        text: "Grille",
      },
      {
        value: "table",
        icon: <TableRowsIcon />,
        text: "Tableau",
      },
      {
        value: "list",
        icon: <ListIcon />,
        text: "Liste",
      },
    ] as const;

    // Boutons sans texte (compatible avec l'ancien format)
    const buttonsIconOnly = [
      { value: "cards", icon: <ViewModuleIcon /> },
      { value: "comfort", icon: <ViewComfyIcon /> },
      { value: "calendar", icon: <CalendarViewMonthIcon /> },
    ] as const;

    // Boutons mixtes (certains avec texte, d'autres sans)
    const buttonsMixed = [
      {
        value: "overview",
        icon: <GridViewIcon />,
        text: "Vue d'ensemble",
      },
      { value: "details", icon: <ViewComfyIcon /> }, // Pas de texte
      {
        value: "settings",
        icon: <CalendarViewMonthIcon />,
        text: "Paramètres",
      },
    ] as const;

    type ButtonsWithTextType = (typeof buttonsWithText)[number]["value"];
    type ButtonsIconOnlyType = (typeof buttonsIconOnly)[number]["value"];
    type ButtonsMixedType = (typeof buttonsMixed)[number]["value"];

    const [viewWithText, setViewWithText] =
      useState<ButtonsWithTextType>("grid");
    const [viewIconOnly, setViewIconOnly] =
      useState<ButtonsIconOnlyType>("cards");
    const [viewMixed, setViewMixed] = useState<ButtonsMixedType>("overview");

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Texte optionnel dans les boutons
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Avec texte
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 2 }}
              >
                Tous les boutons ont un texte explicatif
              </Typography>
              <ButtonGroup
                buttonList={buttonsWithText}
                viewMode={viewWithText}
                onChange={(value: ButtonsWithTextType) =>
                  setViewWithText(value)
                }
                size="medium"
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Sélection: {viewWithText}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Icônes seulement
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 2 }}
              >
                Format classique avec icônes uniquement
              </Typography>
              <ButtonGroup
                buttonList={buttonsIconOnly}
                viewMode={viewIconOnly}
                onChange={(value: ButtonsIconOnlyType) =>
                  setViewIconOnly(value)
                }
                colorVariant="secondary"
                size="medium"
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Sélection: {viewIconOnly}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Format mixte
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 2 }}
              >
                Certains boutons avec texte, d'autres sans
              </Typography>
              <ButtonGroup
                buttonList={buttonsMixed}
                viewMode={viewMixed}
                onChange={(value: ButtonsMixedType) => setViewMixed(value)}
                size="medium"
                orientation="vertical"
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Sélection: {viewMixed}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, mt: 3, backgroundColor: "info.light" }}>
          <Typography variant="subtitle2" gutterBottom>
            💡 Utilisation du texte optionnel
          </Typography>
          <Typography variant="body2" component="div">
            • Le texte s'affiche automatiquement si la propriété{" "}
            <code>text</code> est définie
            <br />
            • Compatible avec l'ancien format (icônes seules)
            <br />
            • Possibilité de mélanger boutons avec et sans texte
            <br />• L'espacement est automatiquement ajusté entre l'icône et le
            texte
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, mt: 2, backgroundColor: "grey.100" }}>
          <Typography variant="subtitle2" gutterBottom>
            Exemple de code
          </Typography>
          <pre style={{ margin: 0, fontSize: "0.875rem", overflow: "auto" }}>
            {`const buttons = [
  { 
    value: "grid", 
    icon: <GridIcon />, 
    text: "Grille" // ← Texte optionnel
  },
  { 
    value: "list", 
    icon: <ListIcon /> // ← Pas de texte, seule l'icône
  }
] as const;`}
          </pre>
        </Paper>
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story:
          "Démonstration de l'utilisation du texte optionnel dans les boutons. Le texte s'affiche automatiquement si la propriété `text` est présente, permettant une grande flexibilité dans la présentation.",
      },
    },
  },
};

export const AvecBoutonsDesactives: Story = {
  render: () => {
    const [selectedView, setSelectedView] =
      useState<ButtonsWithDisabledType>("cards");

    const handleViewChange = useCallback((value: ButtonsWithDisabledType) => {
      setSelectedView(value);
    }, []);

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Gestion des boutons désactivés
        </Typography>
        <Paper sx={{ p: 3 }}>
          <ButtonGroup
            buttonList={buttonsWithDisabled}
            viewMode={selectedView}
            onChange={handleViewChange}
            size="medium"
          />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Vue actuelle: <strong>{selectedView}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Le bouton "Table" est désactivé dans cet exemple
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setSelectedView("list")}
              sx={{ mr: 1 }}
            >
              Sélectionner Liste
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setSelectedView("cards")}
            >
              Sélectionner Cartes
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story:
          "Exemple montrant comment désactiver individuellement certains boutons en utilisant la propriété `disabled` dans les éléments du tableau.",
      },
    },
  },
};

export const OptionsEtendues: Story = {
  render: () => {
    const [selectedView, setSelectedView] = useState<ExtendedViewType>("grid");

    const handleViewChange = useCallback((value: ExtendedViewType) => {
      setSelectedView(value);
    }, []);

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Plus d'options d'affichage
        </Typography>
        <Paper sx={{ p: 3 }}>
          <ButtonGroup
            buttonList={extendedViewButtons}
            viewMode={selectedView}
            onChange={handleViewChange}
            colorVariant="secondary"
            size="large"
          />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Vue actuelle: <strong>{selectedView}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Cet exemple montre un ButtonGroup avec 5 options différentes en
            variante secondary et taille large
          </Typography>
        </Paper>
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story:
          "Exemple avec davantage d'options pour montrer la flexibilité du composant avec plusieurs modes d'affichage.",
      },
    },
  },
};

export const Synchronisation: Story = {
  render: () => {
    const [selectedView, setSelectedView] = useState<StandardViewType>("cards");

    const handleViewChange = useCallback((value: StandardViewType) => {
      console.log("Changement de vue:", value);
      setSelectedView(value);
    }, []);

    const handleExternalChange = useCallback((newView: StandardViewType) => {
      console.log("Changement externe:", newView);
      setSelectedView(newView);
    }, []);

    const getViewDescription = () => {
      switch (selectedView) {
        case "cards":
          return "Affichage en cartes - Idéal pour une vue d'ensemble visuelle";
        case "table":
          return "Affichage en tableau - Parfait pour comparer des données";
        case "list":
          return "Affichage en liste - Optimal pour parcourir rapidement";
        default:
          // Ce cas ne devrait jamais arriver grâce au typage !
          return "Mode d'affichage inconnu";
      }
    };

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Synchronisation avec d'autres composants
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Vue actuelle: <strong>{selectedView}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {getViewDescription()}
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                ButtonGroup Principal
              </Typography>
              <ButtonGroup
                buttonList={standardViewButtons}
                viewMode={selectedView}
                onChange={handleViewChange}
                size="medium"
              />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Contrôles externes
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {standardViewButtons.map((button) => (
                  <Button
                    key={button.value}
                    variant={
                      selectedView === button.value ? "contained" : "outlined"
                    }
                    onClick={() => handleExternalChange(button.value)}
                    size="small"
                    startIcon={button.icon}
                  >
                    Mode {button.value}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Paper sx={{ p: 2, mt: 2, backgroundColor: "grey.50" }}>
          <Typography variant="subtitle2" gutterBottom>
            Actions rapides
          </Typography>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              const views: StandardViewType[] = ["cards", "table", "list"];
              const randomView =
                views[Math.floor(Math.random() * views.length)];
              handleExternalChange(randomView);
            }}
            sx={{ mr: 1 }}
          >
            Vue aléatoire
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              const currentIndex = standardViewButtons.findIndex(
                (b) => b.value === selectedView,
              );
              const nextIndex = (currentIndex + 1) % standardViewButtons.length;
              handleExternalChange(standardViewButtons[nextIndex].value);
            }}
          >
            Vue suivante
          </Button>
        </Paper>
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story:
          "Démonstration de la synchronisation entre le ButtonGroup et d'autres composants. Cette story montre comment le ButtonGroup peut être intégré dans une interface complexe où la sélection peut provenir de différentes sources mais reste synchronisée.",
      },
    },
  },
};

export const CasUtilisationComplexe: Story = {
  render: () => {
    // ✅ Simulation de différents contextes d'utilisation avec typage correct
    const dashboardButtons = [
      { value: "overview", icon: <ViewComfyIcon /> },
      { value: "detailed", icon: <TableRowsIcon /> },
      { value: "analytics", icon: <GridViewIcon /> },
    ] as const;

    const fileButtons = [
      { value: "grid", icon: <GridViewIcon /> },
      { value: "list", icon: <ListIcon /> },
      { value: "tree", icon: <ViewModuleIcon /> },
    ] as const;

    const dataButtons = [
      { value: "chart", icon: <CalendarViewMonthIcon /> },
      { value: "table", icon: <TableRowsIcon /> },
      { value: "raw", icon: <ListIcon />, disabled: true },
    ] as const;

    // ✅ Types automatiquement inférés
    type DashboardType = (typeof dashboardButtons)[number]["value"];
    type FileType = (typeof fileButtons)[number]["value"];
    type DataType = (typeof dataButtons)[number]["value"];

    const [dashboardView, setDashboardView] =
      useState<DashboardType>("overview");
    const [fileView, setFileView] = useState<FileType>("grid");
    const [dataView, setDataView] = useState<DataType>("chart");

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Cas d'utilisation dans une interface complexe
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2, height: "100%" }}>
              <Typography variant="subtitle1" gutterBottom>
                Dashboard
              </Typography>
              <ButtonGroup
                buttonList={dashboardButtons}
                viewMode={dashboardView}
                onChange={(value: DashboardType) => setDashboardView(value)}
                colorVariant="primary"
                size="small"
                orientation="vertical"
              />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Mode: {dashboardView}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2, height: "100%" }}>
              <Typography variant="subtitle1" gutterBottom>
                Explorateur de fichiers
              </Typography>
              <ButtonGroup
                buttonList={fileButtons}
                viewMode={fileView}
                onChange={(value: FileType) => setFileView(value)}
                colorVariant="secondary"
                size="medium"
              />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Affichage: {fileView}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2, height: "100%" }}>
              <Typography variant="subtitle1" gutterBottom>
                Visualisation de données
              </Typography>
              <ButtonGroup
                buttonList={dataButtons}
                viewMode={dataView}
                onChange={(value: DataType) => setDataView(value)}
                colorVariant="primary"
                size="large"
              />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Format: {dataView}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                (Le mode "raw" est temporairement désactivé)
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper
          sx={{
            p: 2,
            mt: 3,
            backgroundColor: "info.light",
            color: "info.contrastText",
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            📊 Résumé des sélections (tous typés !)
          </Typography>
          <Typography variant="body2">
            Dashboard: <strong>{dashboardView}</strong> | Fichiers:{" "}
            <strong>{fileView}</strong> | Données: <strong>{dataView}</strong>
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 2,
            mt: 2,
            backgroundColor: "warning.light",
            color: "warning.contrastText",
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            🔍 Inspection des types
          </Typography>
          <Typography variant="body2" component="div">
            <code>DashboardType:</code>{" "}
            {`"overview" | "detailed" | "analytics"`}
            <br />
            <code>FileType:</code> {`"grid" | "list" | "tree"`}
            <br />
            <code>DataType:</code> {`"chart" | "table" | "raw"`}
          </Typography>
          <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
            Chaque callback reçoit exactement le bon type, aucune configuration
            supplémentaire requise !
          </Typography>
        </Paper>
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story:
          "Exemple d'utilisation complexe montrant comment le ButtonGroup peut être utilisé dans différents contextes au sein d'une même interface, avec différentes configurations (tailles, couleurs, orientations) selon le besoin. Chaque instance a son propre type inféré automatiquement.",
      },
    },
  },
};

export const BonnesPratiques: Story = {
  render: () => {
    // ✅ Bonnes pratiques pour le typage

    // 1. Créer des constantes réutilisables
    const VIEW_MODES = {
      CARDS: "cards",
      TABLE: "table",
      LIST: "list",
    } as const;

    // 2. Utiliser des factory functions pour la réutilisabilité
    const createViewButton = <T extends string>(
      value: T,
      icon: React.ReactNode,
      disabled = false,
    ) => ({ value, icon, disabled }) as const;

    // 3. Définir des configurations prédéfinies
    const commonViewButtons = [
      createViewButton(VIEW_MODES.CARDS, <ViewModuleIcon />),
      createViewButton(VIEW_MODES.TABLE, <TableRowsIcon />),
      createViewButton(VIEW_MODES.LIST, <ListIcon />),
    ] as const;

    const adminViewButtons = [
      createViewButton("dashboard", <GridViewIcon />),
      createViewButton("users", <ViewComfyIcon />),
      createViewButton("settings", <CalendarViewMonthIcon />),
      createViewButton("logs", <ListIcon />, true), // désactivé
    ] as const;

    // 4. Types helper pour éviter la répétition
    type CommonViewType = (typeof commonViewButtons)[number]["value"];
    type AdminViewType = (typeof adminViewButtons)[number]["value"];

    const [commonView, setCommonView] = useState<CommonViewType>(
      VIEW_MODES.CARDS,
    );
    const [adminView, setAdminView] = useState<AdminViewType>("dashboard");

    // 5. Handlers avec typage explicite
    const handleCommonViewChange = useCallback((value: CommonViewType) => {
      console.log("Vue commune changée:", value);
      setCommonView(value);
    }, []);

    const handleAdminViewChange = useCallback((value: AdminViewType) => {
      console.log("Vue admin changée:", value);
      setAdminView(value);
    }, []);

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          🚀 Bonnes pratiques pour le typage
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Configuration standard
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 2 }}
              >
                Utilisation de constantes et factory functions
              </Typography>
              <ButtonGroup
                buttonList={commonViewButtons}
                viewMode={commonView}
                onChange={handleCommonViewChange}
                size="medium"
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Sélection: {commonView}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Configuration avancée
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 2 }}
              >
                Types spécialisés avec bouton désactivé
              </Typography>
              <ButtonGroup
                buttonList={adminViewButtons}
                viewMode={adminView}
                onChange={handleAdminViewChange}
                colorVariant="secondary"
                size="medium"
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Admin: {adminView}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, mt: 3, backgroundColor: "success.light" }}>
          <Typography variant="h6" gutterBottom>
            📚 Code examples - Bonnes pratiques
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              1. ✅ Utilisation de constantes réutilisables
            </Typography>
            <Paper sx={{ p: 2, backgroundColor: "grey.100" }}>
              <pre
                style={{ margin: 0, fontSize: "0.875rem", overflow: "auto" }}
              >
                {`const VIEW_MODES = {
  CARDS: "cards",
  TABLE: "table", 
  LIST: "list"
} as const;

const buttons = [
  { value: VIEW_MODES.CARDS, icon: <Icon /> }
] as const;`}
              </pre>
            </Paper>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              2. ✅ Factory functions pour la réutilisabilité
            </Typography>
            <Paper sx={{ p: 2, backgroundColor: "grey.100" }}>
              <pre
                style={{ margin: 0, fontSize: "0.875rem", overflow: "auto" }}
              >
                {`const createViewButton = <T extends string>(
  value: T, 
  icon: ReactNode, 
  disabled = false
) => ({ value, icon, disabled } as const);

const buttons = [
  createViewButton("cards", <CardsIcon />),
  createViewButton("table", <TableIcon />, true)
] as const;`}
              </pre>
            </Paper>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              3. ✅ Types helper pour éviter la répétition
            </Typography>
            <Paper sx={{ p: 2, backgroundColor: "grey.100" }}>
              <pre
                style={{ margin: 0, fontSize: "0.875rem", overflow: "auto" }}
              >
                {`type ViewType = (typeof buttons)[number]["value"];

const [view, setView] = useState<ViewType>("cards");

const handleChange = useCallback((value: ViewType) => {
  // value est automatiquement typé !
  setView(value);
}, []);`}
              </pre>
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              4. ✅ Handler avec typage explicite
            </Typography>
            <Paper sx={{ p: 2, backgroundColor: "grey.100" }}>
              <pre
                style={{ margin: 0, fontSize: "0.875rem", overflow: "auto" }}
              >
                {`<ButtonGroup
  buttonList={buttons}
  viewMode={view}
  onChange={handleChange} // ← Pas de type 'any' !
/>`}
              </pre>
            </Paper>
          </Box>
        </Paper>

        <Paper
          sx={{
            p: 2,
            mt: 2,
            backgroundColor: "error.light",
            color: "error.contrastText",
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            ❌ À éviter
          </Typography>
          <Typography variant="body2" component="div">
            • Oublier <code>as const</code> après les tableaux
            <br />
            • Utiliser des handlers sans typage explicite
            <br />
            • Définir des valeurs en dur sans constantes
            <br />• Ignorer les warnings TypeScript
          </Typography>
        </Paper>
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        story:
          "Cette story présente les meilleures pratiques pour utiliser le ButtonGroup avec un typage TypeScript optimal. Elle montre comment structurer votre code pour éviter les types 'any' et maximiser la sécurité de type.",
      },
    },
  },
};
