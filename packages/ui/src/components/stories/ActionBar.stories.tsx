import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { ActionBar } from "../ActionBar";

// const meta: Meta<typeof ActionBar> = {
//   title: "Components/ActionBar",
//   component: ActionBar,
// };
// export default meta;

// type Story = StoryObj<typeof ActionBar>;

// export const Default: Story = {
//   args: {
//     leftActions: [
//       { label: "Ouvrir", action: () => ({}) },
//       { label: "Fermer", action: () => ({}) },
//       { label: "Partager", action: () => ({}) },
//       { label: "AutreBouton", action: () => ({}) },
//     ],
//     rightActions: [
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
    leftActions: {
      description: "Liste de boutons à afficher à gauche de la barre",
      control: "object",
    },
    rightActions: {
      description: "Liste de boutons à afficher à droite de la barre",
      control: "object",
    },
    slotProps: {
      description: "Props supplémentaires",
      control: "object",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ActionBar>;

const sampleAction = (msg: string) => () => alert(msg);

export const Default: Story = {
  args: {
    leftActions: [{ label: "Retour", action: sampleAction("Retour") }],
    rightActions: [
      { label: "Valider", action: sampleAction("Valider") },
      { label: "Annuler", action: sampleAction("Annuler") },
    ],
  },
  render: () => {
    return (
      <Box sx={{ p: 4 }}>
        <ActionBar
          leftActions={Default.args?.leftActions ?? []}
          rightActions={Default.args?.rightActions ?? []}
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Affiche une `ActionBar` classique avec des boutons à gauche et à droite.",
      },
    },
  },
};

export const OnlyLeftActions: Story = {
  args: {
    leftActions: [
      { label: "Précédent", action: sampleAction("Précédent") },
      { label: "Fermer", action: sampleAction("Fermer") },
    ],
    rightActions: [],
  },
  render: () => {
    return (
      <Box sx={{ p: 4 }}>
        <ActionBar
          leftActions={OnlyLeftActions.args?.leftActions ?? []}
          rightActions={OnlyLeftActions.args?.rightActions ?? []}
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Affiche uniquement les boutons à gauche. Utile pour les étapes intermédiaires ou navigation simple.",
      },
    },
  },
};

export const OnlyRightActions: Story = {
  args: {
    leftActions: [],
    rightActions: [
      { label: "Sauvegarder", action: sampleAction("Sauvegarder") },
    ],
  },
  render: () => {
    return (
      <Box sx={{ p: 4 }}>
        <ActionBar
          leftActions={OnlyRightActions.args?.leftActions ?? []}
          rightActions={OnlyRightActions.args?.rightActions ?? []}
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Affiche uniquement des boutons à droite. Fréquent pour les actions finales.",
      },
    },
  },
};

export const WithCustomButtonProps: Story = {
  args: {
    leftActions: [{ label: "Aide", action: sampleAction("Aide") }],
    rightActions: [{ label: "Envoyer", action: sampleAction("Envoyer") }],
    slotProps: {
      leftActions: {
        color: "secondary",
        variant: "outlined",
      },
      rightActions: {
        color: "success",
        variant: "contained",
      },
    },
  },
  render: () => {
    return (
      <Box sx={{ p: 4 }}>
        <ActionBar
          leftActions={WithCustomButtonProps.args?.leftActions ?? []}
          rightActions={WithCustomButtonProps.args?.rightActions ?? []}
          slotProps={WithCustomButtonProps.args?.slotProps}
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Personnalisation des boutons via `buttonLeftProps` et `buttonRightProps`.",
      },
    },
  },
};

export const WithBoxCustomProps: Story = {
  args: {
    leftActions: [{ label: "Infos", action: sampleAction("Infos") }],
    rightActions: [{ label: "Suivant", action: sampleAction("Suivant") }],
    slotProps: {
      leftActionsContainer: {
        sx: { backgroundColor: "lightgray", p: 1 },
      },
      rightActionsContainer: {
        sx: { backgroundColor: "whitesmoke", p: 1 },
      },
    },
  },
  render: () => {
    return (
      <Box sx={{ p: 4 }}>
        <ActionBar
          leftActions={WithBoxCustomProps.args?.leftActions ?? []}
          rightActions={WithBoxCustomProps.args?.rightActions ?? []}
          slotProps={WithBoxCustomProps.args?.slotProps}
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Ajoute du style aux conteneurs de gauche et de droite via `boxLeftWrapperProps` et `boxRightWrapperProps`.",
      },
    },
  },
};

export const ResponsiveExample: Story = {
  args: {
    leftActions: [{ label: "Mobile", action: sampleAction("Mobile") }],
    rightActions: [{ label: "Continue", action: sampleAction("Continue") }],
    slotProps: {
      root: {
        direction: "column",
        spacing: 1,
        sx: [
          {
            "@media (min-width: 600px)": {
              flexDirection: "row",
              justifyContent: "space-between",
            },
          },
        ],
      },
    },
  },
  render: () => {
    return (
      <Box sx={{ p: 4 }}>
        <ActionBar
          leftActions={ResponsiveExample.args?.leftActions ?? []}
          rightActions={ResponsiveExample.args?.rightActions ?? []}
          slotProps={ResponsiveExample.args?.slotProps}
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Démontre l’adaptabilité de la barre via une prop `sx` responsive.",
      },
    },
  },
};
