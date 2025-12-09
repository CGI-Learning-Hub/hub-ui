import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  RadioGroup as BaseRadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  type RadioGroupProps,
} from "..";

const RadioGroup = (props: RadioGroupProps) => {
  return (
    <FormControl>
      <FormLabel id="radio-buttons-group-label">Label</FormLabel>
      <BaseRadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue="first"
        name="radio-buttons-group"
        {...props}
      >
        <FormControlLabel value="first" control={<Radio />} label="First" />
        <FormControlLabel value="second" control={<Radio />} label="Second" />
        <FormControlLabel value="third" control={<Radio />} label="Third" />
      </BaseRadioGroup>
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
