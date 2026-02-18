import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { ZoomControl } from "..";

const meta: Meta<typeof ZoomControl> = {
  title: "Components/ZoomControl",
  component: ZoomControl,
  tags: ["autodocs"],
  argTypes: {
    opacity: {
      description: "Opacité du composant",
      control: { type: "range", min: 0, max: 1, step: 0.1 },
    },
    value: {
      description: "Niveau de zoom actuel",
      control: "number",
    },
    max: {
      description: "Niveau de zoom maximum",
      control: "number",
    },
    min: {
      description: "Niveau de zoom minimum",
      control: "number",
    },
    step: {
      description: "Pas de zoom",
      control: "number",
    },
    onChange: {
      description: "Callback appelé avec la nouvelle valeur de zoom",
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

type Story = StoryObj<typeof ZoomControl>;

const ZoomWrapper = ({
  max = 300,
  min = 0,
  step = 10,
  defaultValue = 100,
  opacity,
  label,
  slotProps,
}: {
  max?: number;
  min?: number;
  step?: number;
  defaultValue?: number;
  opacity?: number;
  label?: string;
  slotProps?: React.ComponentProps<typeof ZoomControl>["slotProps"];
}) => {
  const [zoomLevel, setZoomLevel] = useState(defaultValue);

  return (
    <ZoomControl
      value={zoomLevel}
      max={max}
      min={min}
      step={step}
      onChange={setZoomLevel}
      opacity={opacity}
      label={label}
      slotProps={slotProps}
    />
  );
};

export const Default: Story = {
  render: () => <ZoomWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          "Affiche un `ZoomControl` avec les valeurs par défaut. Zoom de 0 à 300, pas de 10.",
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
    <ZoomWrapper max={3} min={1} step={1} defaultValue={1} label="x1" />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Zoom avec une plage réduite (1 à 3), pour des niveaux de zoom plus discrets.",
      },
    },
  },
};

export const WithSlotProps: Story = {
  render: () => (
    <ZoomWrapper
      slotProps={{
        root: {
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
          "Personnalisation du conteneur via `slotProps.root` pour modifier la taille et la couleur de fond.",
      },
    },
  },
};
