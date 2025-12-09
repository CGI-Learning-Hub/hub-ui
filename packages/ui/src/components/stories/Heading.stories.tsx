import MoodRoundedIcon from "@mui/icons-material/MoodRounded";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Heading, red } from "..";

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
    IconComponent: MoodRoundedIcon,
  },
};
