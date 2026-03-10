import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimePicker } from "..";

import dayjs from "dayjs";

const meta: Meta<typeof TimePicker> = {
  title: "Components/TimePicker",
  component: TimePicker,
  argTypes: {
    label: {
      control: "text",
      description: "Label displayed above the time picker input.",
    },
    disabled: {
      control: "boolean",
      description: "If true, the picker will be disabled.",
    },
    minutesStep: {
      control: "number",
      description: "Defines the interval between selectable minutes.",
    },
    ampm: {
      control: "boolean",
      description: "If true, the picker will use 12h format (AM/PM).",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The TimePicker component allows users to select a time using an interactive clock or input field.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TimePicker>;


export const Default: Story = {
  args: {
    label: "Select time",
    defaultValue: dayjs(),
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled time picker",
    defaultValue: dayjs(),
    disabled: true,
  },
};

export const WithMinuteStep: Story = {
  args: {
    label: "15 min step",
    defaultValue: dayjs(),
    minutesStep: 15,
  },
};

export const TwelveHourFormat: Story = {
  args: {
    label: "12h format",
    defaultValue: dayjs(),
    ampm: true,
  },
};