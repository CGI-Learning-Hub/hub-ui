import MUICheckbox from "@mui/material/Checkbox";
import MUIFormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import MUIRadio from "@mui/material/Radio";
import MUISwitch from "@mui/material/Switch";
import type { Meta, StoryObj } from "@storybook/react-vite";

const FormControlLabel = (props: FormControlLabelProps) => {
  return <MUIFormControlLabel {...props} />;
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

export const Checkbox: Story = {
  args: {
    control: <MUICheckbox />,
    checked: undefined,
    disabled: undefined,
    disableTypography: undefined,
    label: "Label",
    labelPlacement: "end",
    required: undefined,
  },
};

export const Radio: Story = {
  args: {
    control: <MUIRadio />,
    label: "Label",
  },
};

export const Switch: Story = {
  args: {
    control: <MUISwitch />,
    label: "Label",
  },
};
