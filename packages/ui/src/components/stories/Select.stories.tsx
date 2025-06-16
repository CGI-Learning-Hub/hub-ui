import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MUISelect, {
  SelectChangeEvent,
  SelectProps,
} from "@mui/material/Select";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const Select = (props: SelectProps) => {
  const [status, setStatus] = useState("pending");

  const handleChange = (event: SelectChangeEvent<unknown>) =>
    setStatus(event.target.value as string);

  return (
    <FormControl variant={props.variant} sx={{ width: "10rem" }}>
      <InputLabel id="simple-select-label">Status</InputLabel>
      <MUISelect
        labelId="simple-select-label"
        id="simple-select"
        value={status}
        label="Status"
        onChange={handleChange}
        {...props}
      >
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="ongoing">Ongoing</MenuItem>
        <MenuItem value="validated">Validated</MenuItem>
        <MenuItem value="rejected">Rejected</MenuItem>
      </MUISelect>
    </FormControl>
  );
};

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {},
};

export const Filled: Story = {
  args: {
    variant: "filled",
  },
};

export const Standard: Story = {
  args: {
    variant: "standard",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
