import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "..";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "error", "info", "success", "warning"],
      description: "Defines the color theme of the slider.",
    },
    disabled: {
      control: "boolean",
      description: "If true, the slider will be disabled and cannot be interacted with.",
    },
    size: {
      control: "radio",
      options: ["small", "medium"],
      description: "Adjusts the size of the slider.",
    },
    value: {
      control: "number",
      description:
        "The current value of the slider. Use this when controlling the component.",
    },
    defaultValue: {
      control: "number",
      description:
        "The default value of the slider when the component is uncontrolled.",
    },
    step: {
      control: "number",
      description:
        "The granularity with which the slider can step through values.",
    },
    min: {
      control: "number",
      description: "The minimum allowed value of the slider.",
    },
    max: {
      control: "number",
      description: "The maximum allowed value of the slider.",
    },
    marks: {
      control: "boolean",
      description:
        "If true, the slider will display marks at each step along the track.",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Controls whether the slider is horizontal or vertical.",
    },
    track: {
      control: "radio",
      options: ["normal", "inverted", false],
      description:
        "Determines the behavior of the slider track. 'normal' shows the track before the thumb, 'inverted' shows it after.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: 30,
    step: 10,
    min: 0,
    max: 100,
    disabled: false,
    color: "primary",
    size: "medium",
    orientation: "horizontal",
    track: "normal",
  },
};

export const Small: Story = {
  args: {
    defaultValue: 30,
    size: "small",
  },
};

export const Secondary: Story = {
  args: {
    defaultValue: 40,
    color: "secondary",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 50,
    disabled: true,
  },
};

export const WithMarks: Story = {
  args: {
    defaultValue: 20,
    step: 20,
    marks: true,
    min: 0,
    max: 100,
  },
};

export const Range: Story = {
  args: {
    defaultValue: [20, 60],
    step: 10,
    min: 0,
    max: 100,
  },
};

export const Vertical: Story = {
  args: {
    defaultValue: 40,
    orientation: "vertical",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
};