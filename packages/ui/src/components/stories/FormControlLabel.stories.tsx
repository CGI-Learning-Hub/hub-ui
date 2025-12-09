import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  FormControlLabel as BaseFormControlLabel,
  Checkbox,
  type FormControlLabelProps,
  Radio,
  Switch,
} from "..";

const FormControlLabel = (props: FormControlLabelProps) => {
  return <BaseFormControlLabel {...props} />;
};

const meta: Meta<typeof FormControlLabel> = {
  title: "Components/FormControlLabel",
  component: FormControlLabel,
  argTypes: {
    control: {
      control: "object",
    },
    disabled: {
      control: "boolean",
    },
    disableTypography: {
      control: "boolean",
    },
    label: {
      control: "object",
    },
    labelPlacement: {
      control: "select",
      options: ["bottom", "end", "start", "top"],
    },
    required: {
      control: "boolean",
    },
  },
};
export default meta;

type Story = StoryObj<typeof FormControlLabel>;

export const WithCheckbox: Story = {
  args: {
    control: <Checkbox />,
    checked: undefined,
    disabled: undefined,
    disableTypography: undefined,
    label: "Label",
    labelPlacement: "end",
    required: undefined,
  },
};

export const WithRadio: Story = {
  args: {
    control: <Radio />,
    label: "Label",
  },
};

export const WithSwitch: Story = {
  args: {
    control: <Switch />,
    label: "Label",
  },
};
