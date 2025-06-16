import { Button } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react-vite";
import { ToastContainer, type ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../src/styles/toastify.css";

type ComponentProps = {
  content: string;
  type: "error" | "info" | "success" | "warning";
} & ToastOptions;

const Component = ({ type, content, ...options }: ComponentProps) => {
  const showToast = () => toast[type](content, options);
  options.draggable;
  return (
    <Button variant="contained" onClick={showToast} sx={{ margin: "10rem 0" }}>
      Afficher un toast
    </Button>
  );
};

const meta = {
  title: "Others/Toastify",
  component: Component,
  parameters: {
    docs: {
      description: {
        component: `[Playground](https://fkhadra.github.io/react-toastify/introduction)

[Installation](https://fkhadra.github.io/react-toastify/installation)`,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <ToastContainer />
      </>
    ),
  ],
  argTypes: {
    type: {
      control: "radio",
      options: ["info", "success", "warning", "error"],
    },
    content: {
      control: "text",
    },
    position: {
      control: { type: "select" },
      options: [
        "top-right",
        "top-center",
        "top-left",
        "bottom-right",
        "bottom-center",
        "bottom-left",
      ],
      description: "Position des notifications sur l'écran",
      table: { defaultValue: { summary: "top-right" } },
    },
    autoClose: {
      control: { type: "number" },
      description: "Délai avant fermeture automatique (en ms)",
      table: { defaultValue: { summary: "5000" } },
    },
    hideProgressBar: {
      control: "boolean",
      description: "Masquer la barre de progression",
      table: { defaultValue: { summary: "false" } },
    },
    closeOnClick: {
      control: "boolean",
      description: "Fermer au clic",
      table: { defaultValue: { summary: "false" } },
    },
    pauseOnHover: {
      control: "boolean",
      description: "Mettre en pause au survol",
      table: { defaultValue: { summary: "true" } },
    },
    draggable: {
      control: "boolean",
      description: "Autoriser le drag",
      table: { defaultValue: { summary: "true" } },
    },
    theme: {
      control: "radio",
      options: ["light", "dark", "colored"],
      description: "Thème à utiliser",
      table: { defaultValue: { summary: "light" } },
    },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    type: "info",
    content: "Et hop ! C'est moi le toast",
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  },
};
