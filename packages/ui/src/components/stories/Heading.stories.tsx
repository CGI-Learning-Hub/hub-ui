import MoodIcon from "@mui/icons-material/Mood";
import { red } from "@mui/material/colors";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Heading } from "../Heading";

const meta: Meta<typeof Heading> = {
  title: "Components/Heading",
  component: Heading,
};
export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    title: "Heading",
    iconColor: red,
    IconComponent: MoodIcon,
  },
};
