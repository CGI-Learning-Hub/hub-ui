import type { Meta, StoryObj } from "@storybook/react-vite";

import { ImagePicker } from "..";

const meta: Meta<typeof ImagePicker> = {
  title: "Components/ImagePicker",
  component: ImagePicker,
  argTypes: {
    defaultLabel: {
      description: "Le contenu affiché comme label par défaut (ReactNode).",
      control: "text",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "<ImagePickerDefaultLabel />" },
      },
    },
    dragLabel: {
      description:
        "Texte affiché lorsque l'utilisateur fait glisser un fichier.",
      control: "text",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "<ImagePickerDefaultDragLabel />" },
      },
    },
    information: {
      description:
        "Informations supplémentaires affichées sous le label par défaut.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    onFileChange: {
      description:
        "Callback déclenché lorsque l'utilisateur sélectionne ou supprime un fichier.",
      action: "file-changed",
      table: {
        type: { summary: "(file: File | null) => void" },
      },
    },
    initialFile: {
      description: "Ajouter une image initiale",
      control: "text",
      table: {
        type: { summary: "string | File" },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ImagePicker>;

export const Default: Story = {
  args: {
    information: "SVG, PNG, JPG, GIF",
    onFileChange: (file: File | null) => {
      if (file) {
        console.log("Image uplaodé");
      } else {
        console.log("Image supprimé");
      }
    },
    width: "160px",
    height: "160px",
  },
};
