import MailRoundedIcon from "@mui/icons-material/MailRounded";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge, Box } from "..";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          "Badge permet d'afficher des notifications peu invasives sur un élément parent.",
      },
    },
  },
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "info", "success", "warning"],
      description: "Couleur du badge",
    },
    variant: {
      control: { type: "select" },
      options: ["standard", "dot"],
      description: "Type de badge : standard ou dot",
    },
    showZero: {
      control: "boolean",
      description: "Affiche le badge même si badgeContent = 0",
    },
    invisible: {
      control: "boolean",
      description: "Masque complètement le badge",
    },
    max: {
      control: { type: "number", min: 1 },
      description: "Valeur maximale avant d'afficher max+",
    },
    overlap: {
      control: { type: "select" },
      options: ["rectangular", "circular"],
      description: "Forme de l'élément parent",
    },
    anchorOrigin: {
      control: { type: "object" },
      defaultValue: { vertical: "top", horizontal: "right" },
      description: "Position du badge par rapport à l'élément parent",
    },
    badgeContent: {
      control: { type: "number", min: 0 },
      description: "Contenu numérique du badge (indiqué si variant=standard)",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

/** 1. Plusieurs couleurs disponibles */
export const Colors: Story = {
  render: (args) => (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      {["primary", "secondary", "error", "info", "success", "warning"].map(
        (c) => (
          <Badge key={c} {...args} color={c as any}>
            <MailRoundedIcon />
          </Badge>
        ),
      )}
    </Box>
  ),
  args: {
    badgeContent: 5,
    variant: "standard",
    showZero: false,
    invisible: false,
    max: 99,
    overlap: "rectangular",
    anchorOrigin: { vertical: "top", horizontal: "right" },
  },
  parameters: {
    docs: {
      description: {
        story: "Montre toutes les couleurs prédéfinies de MUI Badge.",
      },
    },
  },
};

/** 2. Afficher un badge même à 0 */
export const ShowZero: Story = {
  args: {
    badgeContent: 0,
    showZero: true,
    color: "primary",
    variant: "standard",
    invisible: false,
    max: 99,
    overlap: "rectangular",
    anchorOrigin: { vertical: "top", horizontal: "right" },
    children: <MailRoundedIcon />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Utilise `showZero` pour afficher le badge même lorsque `badgeContent` est à 0.",
      },
    },
  },
};

/** 3. Variante “dot” avec une icône */
export const Dot: Story = {
  args: {
    variant: "dot",
    color: "error",
    invisible: false,
    overlap: "circular",
    anchorOrigin: { vertical: "top", horizontal: "right" },
    children: <MailRoundedIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: "Affiche un petit point rouge (`variant='dot'`) sur une icône.",
      },
    },
  },
};

/** 4. Variante dot et standard sans icône */
export const NoIcon: Story = {
  render: (args) => (
    <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
      {/* Dot seul */}
      <Badge {...args} variant="dot" color="error"></Badge>
      {/* Standard seul */}
      <Badge
        {...args}
        variant="standard"
        badgeContent={7}
        color="primary"
      ></Badge>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Affiche `variant='dot'` et `variant='standard'` sans icônes.",
      },
    },
  },
};

/** 5. Démonstration de `anchorOrigin` */
export const Origin: Story = {
  render: (args) => (
    <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
      {(
        [
          { vertical: "top", horizontal: "left" },
          { vertical: "top", horizontal: "right" },
          { vertical: "bottom", horizontal: "left" },
          { vertical: "bottom", horizontal: "right" },
        ] as const
      ).map((origin) => (
        <Badge
          key={`${origin.vertical}-${origin.horizontal}`}
          {...args}
          anchorOrigin={origin}
        >
          <MailRoundedIcon />
        </Badge>
      ))}
    </Box>
  ),
  args: {
    badgeContent: 10,
    color: "secondary",
    variant: "standard",
    invisible: false,
    overlap: "rectangular",
    anchorOrigin: { vertical: "top", horizontal: "right" },
  },
  parameters: {
    docs: {
      description: {
        story: "Positionne le badge sur les quatre coins possibles.",
      },
    },
  },
};

/** 6. Démonstration de `max` */
export const MaxValue: Story = {
  args: {
    badgeContent: 120,
    max: 99,
    color: "info",
    variant: "standard",
    showZero: false,
    invisible: false,
    overlap: "rectangular",
    anchorOrigin: { vertical: "top", horizontal: "right" },
    children: <MailRoundedIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: "Limite l'affichage numérique avec la prop `max` (ex: 99+).",
      },
    },
  },
};
