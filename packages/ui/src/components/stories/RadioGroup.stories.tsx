import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import MUIRadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import type { Meta, StoryObj } from "@storybook/react-vite";

const RadioGroup = (props: RadioGroupProps) => {
  return (
    <FormControl>
      <FormLabel id="radio-buttons-group-label">Label</FormLabel>
      <MUIRadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue="first"
        name="radio-buttons-group"
        {...props}
      >
        <FormControlLabel value="first" control={<Radio />} label="First" />
        <FormControlLabel value="second" control={<Radio />} label="Second" />
        <FormControlLabel value="third" control={<Radio />} label="Third" />
      </MUIRadioGroup>
    </FormControl>
  );
};

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    row: false,
  },
};

export const Row: Story = {
  args: {
    row: true,
  },
};
