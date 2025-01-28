import type { Meta, StoryObj } from "@storybook/react";
import { ResourceCard } from "../ResourceCard/ResourceCard";
import StarIcon from "@mui/icons-material/Star";
import PublicIcon from "@mui/icons-material/Public";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import QuestionIcon from "@mui/icons-material/LiveHelp";
import { Box, Typography } from "@mui/material";

const meta: Meta<typeof ResourceCard> = {
  title: "Components/ResourceCard",
  component: ResourceCard,
  argTypes: {
    isSelected: {
      description: "Indique si la carte est sélectionnée.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onSelect: {
      description: "Callback déclenché lorsque l'utilisateur sélectionne la carte.",
      action: "card-selected",
      table: {
        type: { summary: "() => void" },
      },
    },
    image: {
      description: "URL de l'image affichée sur la carte.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    title: {
      description: "Titre de la carte.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    propertyItems: {
      description: "Liste des propriétés affichées sous le titre.",
      control: "object",
      table: {
        type: { summary: "PropertyItem[]" },
      },
    },
    infoIcons: {
      description: "Liste des icônes d'information affichées dans la carte. (3 maximums)",
      control: "object",
      table: {
        type: { summary: "InfoItem[]" },
      },
    },
    size: {
      description: "Taille de la carte (petite ou moyenne).",
      control: "radio",
      options: ["sm", "md"],
      table: {
        type: { summary: `"sm" | "md"` },
        defaultValue: { summary: "md" },
      },
    },
    width: {
      description: "Largeur de la carte.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "300px" },
      },
    }
  },
};
export default meta;

type Story = StoryObj<typeof ResourceCard>;

export const Default: Story = {
  args: {
    isSelected: false,
    image: "https://dummyimage.com/600x400/000/fff&text=flashquizz",
    title: "Titre de la Ressource tres loooooooooooooooooooooooooooooooooooooooooooooooooooooong",
    propertyItems: [
      { text: <Typography color="text.primary">0 questions</Typography>, icon: <QuestionIcon color="primary" /> },
      { text: "27 janvier 2025", icon: <CalendarIcon color="primary" /> },
    ],
    infoIcons: [
      { text: "Information 1", icon: <PublicIcon color="primary" /> },
      { text: "Information 2", icon: <StarIcon color="primary" /> },
      { text: "Information 3", icon: <StarIcon color="primary" /> },
      { text: "Information 3", icon: <StarIcon color="primary" /> },
    ],
    size: "sm",
    onSelect: () => {
      console.log("Carte sélectionnée !");
    },
    onClick: () => {
      console.log("Select all");
    }
  },
};

export const Selected: Story = {
  args: {
    ...Default.args,
    isSelected: true,
    title: "Carte Sélectionnée",
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "sm",
    title: "Petite Carte",
  },
};

export const NoIcons: Story = {
  args: {
    ...Default.args,
    propertyItems: [],
    infoIcons: [],
    title: "Carte sans Icônes",
  },
};

export const CustomSize: Story = {
  args: {
    ...Default.args,
    width: "400px",
    title: "Carte avec taille personnalisée",
  },
};
