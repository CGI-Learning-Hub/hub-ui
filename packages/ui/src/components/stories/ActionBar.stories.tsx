import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActionBar } from "../ActionBar";

const meta: Meta<typeof ActionBar> = {
  title: "Components/ActionBar",
  component: ActionBar,
};
export default meta;

type Story = StoryObj<typeof ActionBar>;

export const Default: Story = {
  args: {
    leftButtons: [
      { label: "Ouvrir", action: () => ({}) },
      { label: "Fermer", action: () => ({}) },
      { label: "Partager", action: () => ({}) },
      { label: "AutreBouton", action: () => ({}) },
    ],
    rightButtons: [
      { label: "Tout selectionner", action: () => ({}) },
      { label: "Tout déselectionner", action: () => ({}) },
    ],
  },
};
