import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Box, ZoomComponent } from "..";

const meta: Meta<typeof ZoomComponent> = {
  title: "Components/ZoomComponent",
  component: ZoomComponent,
  tags: ["autodocs"],
  argTypes: {
    opacity: {
      description: "Opacité du composant",
      control: { type: "range", min: 0, max: 1, step: 0.1 },
    },
    zoomLevel: {
      description: "Niveau de zoom actuel",
      control: "number",
    },
    zoomMaxLevel: {
      description: "Niveau de zoom maximum",
      control: "number",
    },
    zoomIn: {
      description: "Callback à l'action du bouton + (zoom)",
    },
    zoomOut: {
      description: "Callback à l'action du bouton - (dé-zoom)",
    },
    resetZoom: {
      description: "Callback pour réinitialiser le zoom",
    },
    label: {
      description: "Label affiché au centre (cliquable pour reset)",
      control: "text",
    },
    slotProps: {
      description: "Props supplémentaires pour la Box parente",
      control: "object",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ZoomComponent>;

const ZoomWrapper = ({
  zoomMaxLevel = 300,
  step = 10,
  initialZoom = 100,
  ...props
}: {
  zoomMaxLevel?: number;
  step?: number;
  initialZoom?: number;
  opacity?: number;
  label?: string;
  slotProps?: React.ComponentProps<typeof ZoomComponent>["slotProps"];
}) => {
  const [zoomLevel, setZoomLevel] = useState(initialZoom);

  return (
    <ZoomComponent
      zoomLevel={zoomLevel}
      zoomMaxLevel={zoomMaxLevel}
      zoomIn={() => setZoomLevel((prev) => Math.min(prev + step, zoomMaxLevel))}
      zoomOut={() => setZoomLevel((prev) => Math.max(prev - step, 0))}
      resetZoom={() => setZoomLevel(initialZoom)}
      {...props}
    />
  );
};

export const Default: Story = {
  render: () => <ZoomWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          "Affiche un `ZoomComponent` avec les valeurs par défaut. Zoom de 0 à 300, pas de 10.",
      },
    },
  },
};

export const CustomLabel: Story = {
  render: () => <ZoomWrapper label="100%" />,
  parameters: {
    docs: {
      description: {
        story: "Personnalisation du label central affiché entre les boutons.",
      },
    },
  },
};

export const WithOpacity: Story = {
  render: () => <ZoomWrapper opacity={0.5} />,
  parameters: {
    docs: {
      description: {
        story: "Démontre l'effet de la prop `opacity` sur le composant.",
      },
    },
  },
};

export const SmallRange: Story = {
  render: () => (
    <ZoomWrapper zoomMaxLevel={3} step={1} initialZoom={1} label="x1" />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Zoom avec une plage réduite (0 à 3), pour des niveaux de zoom plus discrets.",
      },
    },
  },
};

export const WithSlotProps: Story = {
  render: () => (
    <ZoomWrapper
      slotProps={{
        boxStyle: {
          sx: {
            height: "8rem",
            width: "15rem",
            backgroundColor: "rgba(100, 149, 237, 0.75)",
          },
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Personnalisation du conteneur via `slotProps.boxStyle` pour modifier la taille et la couleur de fond.",
      },
    },
  },
};
