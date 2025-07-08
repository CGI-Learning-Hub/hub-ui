import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActionBar } from "../ActionBar";
import { Box } from "@mui/material";

// const meta: Meta<typeof ActionBar> = {
//   title: "Components/ActionBar",
//   component: ActionBar,
// };
// export default meta;

// type Story = StoryObj<typeof ActionBar>;

// export const Default: Story = {
//   args: {
//     leftButtons: [
//       { label: "Ouvrir", action: () => ({}) },
//       { label: "Fermer", action: () => ({}) },
//       { label: "Partager", action: () => ({}) },
//       { label: "AutreBouton", action: () => ({}) },
//     ],
//     rightButtons: [
//       { label: "Tout selectionner", action: () => ({}) },
//       { label: "Tout déselectionner", action: () => ({}) },
//     ],
//   },
// };

const meta: Meta<typeof ActionBar> = {
  title: "Components/ActionBar",
  component: ActionBar,
  tags: ["autodocs"],
  argTypes: {
    leftButtons: {
      description: "Liste de boutons à afficher à gauche de la barre",
      control: "object",
    },
    rightButtons: {
      description: "Liste de boutons à afficher à droite de la barre",
      control: "object",
    },
    boxLeftWrapperProps: {
      description: "Props supplémentaires pour le conteneur de gauche (Box)",
      control: "object",
    },
    boxRightWrapperProps: {
      description: "Props supplémentaires pour le conteneur de droite (Box)",
      control: "object",
    },
    buttonLeftProps: {
      description: "Props supplémentaires pour les boutons à gauche",
      control: "object",
    },
    buttonRightProps: {
      description: "Props supplémentaires pour les boutons à droite",
      control: "object",
    },
    sx: {
      description: "Styles supplémentaires à appliquer au wrapper principal",
      control: "object",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ActionBar>;

const sampleAction = (msg: string) => () => alert(msg);

export const Default: Story = {
  args: {
    leftButtons: [
      { label: "Retour", action: sampleAction("Retour") },
    ],
    rightButtons: [
      { label: "Valider", action: sampleAction("Valider") },
      { label: "Annuler", action: sampleAction("Annuler") },
    ],
  },
  render: () => {
    return(
      <Box sx={{ p: 4 }}>
        <ActionBar
            leftButtons={Default.args?.leftButtons ?? []}
            rightButtons={Default.args?.rightButtons ?? []}
          ></ActionBar>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Affiche une `ActionBar` classique avec des boutons à gauche et à droite.",
      },
    },
  },
};

export const OnlyLeftButtons: Story = {
  args: {
    leftButtons: [
      { label: "Précédent", action: sampleAction("Précédent") },
      { label: "Fermer", action: sampleAction("Fermer") },
    ],
    rightButtons: [],
  },
  render: () => {
    return(
      <Box sx={{ p: 4 }}>
        <ActionBar
            leftButtons={OnlyLeftButtons.args?.leftButtons ?? []}
            rightButtons={OnlyLeftButtons.args?.rightButtons ?? []}
          ></ActionBar>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Affiche uniquement les boutons à gauche. Utile pour les étapes intermédiaires ou navigation simple.",
      },
    },
  },
};

export const OnlyRightButtons: Story = {
  args: {
    leftButtons: [],
    rightButtons: [
      { label: "Sauvegarder", action: sampleAction("Sauvegarder") },
    ],
  },
  render: () => {
    return(
      <Box sx={{ p: 4 }}>
        <ActionBar
            leftButtons={OnlyRightButtons.args?.leftButtons ?? []}
            rightButtons={OnlyRightButtons.args?.rightButtons ?? []}
          ></ActionBar>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Affiche uniquement des boutons à droite. Fréquent pour les actions finales.",
      },
    },
  },
};

export const WithCustomButtonProps: Story = {
  args: {
    leftButtons: [
      { label: "Aide", action: sampleAction("Aide") },
    ],
    rightButtons: [
      { label: "Envoyer", action: sampleAction("Envoyer") },
    ],
    buttonLeftProps: {
      color: "secondary",
      variant: "outlined",
    },
    buttonRightProps: {
      color: "success",
      variant: "contained",
    },
  },
  render: () => {
    return(
      <Box sx={{ p: 4 }}>
        <ActionBar
            leftButtons={WithCustomButtonProps.args?.leftButtons ?? []}
            rightButtons={WithCustomButtonProps.args?.rightButtons ?? []}
            buttonLeftProps={WithCustomButtonProps.args?.buttonLeftProps ?? {}}
            buttonRightProps={WithCustomButtonProps.args?.buttonRightProps ?? {}}
          ></ActionBar>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Personnalisation des boutons via `buttonLeftProps` et `buttonRightProps`.",
      },
    },
  },
};

export const WithBoxCustomProps: Story = {
  args: {
    leftButtons: [
      { label: "Infos", action: sampleAction("Infos") },
    ],
    rightButtons: [
      { label: "Suivant", action: sampleAction("Suivant") },
    ],
    boxLeftWrapperProps: {
      sx: { backgroundColor: "lightgray", p: 1 },
    },
    boxRightWrapperProps: {
      sx: { backgroundColor: "whitesmoke", p: 1 },
    },
  },
  render: () => {
    return(
      <Box sx={{ p: 4 }}>
        <ActionBar
            leftButtons={WithBoxCustomProps.args?.leftButtons ?? []}
            rightButtons={WithBoxCustomProps.args?.rightButtons ?? []}
            boxLeftWrapperProps={WithBoxCustomProps.args?.boxLeftWrapperProps ?? {}}
            boxRightWrapperProps={WithBoxCustomProps.args?.boxRightWrapperProps ?? {}}
          ></ActionBar>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Ajoute du style aux conteneurs de gauche et de droite via `boxLeftWrapperProps` et `boxRightWrapperProps`.",
      },
    },
  },
};

export const ResponsiveExample: Story = {
  args: {
    leftButtons: [
      { label: "Mobile", action: sampleAction("Mobile") },
    ],
    rightButtons: [
      { label: "Continue", action: sampleAction("Continue") },
    ],
    sx: [
      { flexDirection: "column", gap: 1, '@media (min-width: 600px)': { flexDirection: "row", justifyContent: "space-between" } },
    ],
  },
  render: () => {
    return(
      <Box sx={{ p: 4 }}>
        <ActionBar
            leftButtons={ResponsiveExample.args?.leftButtons ?? []}
            rightButtons={ResponsiveExample.args?.rightButtons ?? []}
            sx={ResponsiveExample.args?.sx ?? {}}
          ></ActionBar>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Démontre l’adaptabilité de la barre via une prop `sx` responsive.",
      },
    },
  },
};