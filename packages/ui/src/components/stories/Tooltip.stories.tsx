import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tooltip as BaseTooltip, Button, type TooltipProps } from "..";

const Tooltip = (props: TooltipProps) => {
  return (
    <BaseTooltip {...props}>
      <Button>Hover to display tooltip</Button>
    </BaseTooltip>
  );
};

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  argTypes: {
    arrow: {
      control: "boolean",
    },
    followCursor: {
      control: "boolean",
    },
    placement: {
      control: "select",
      options: [
        "bottom-end",
        "bottom-start",
        "bottom",
        "left-end",
        "left-start",
        "left",
        "right-end",
        "right-start",
        "right",
        "top-end",
        "top-start",
        "top",
      ],
    },
    title: {
      control: "text",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    arrow: false,
    followCursor: false,
    placement: "bottom",
    title: "Title",
  },
};
