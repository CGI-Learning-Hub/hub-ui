import MUIAutocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import type { Meta, StoryObj } from "@storybook/react-vite";

const Autocomplete = (props: any) => {
  const options = [
    "Paris",
    "Londres",
    "Berlin",
    "Madrid",
    "Rome",
    "Amsterdam",
    "Bruxelles",
    "Lisbonne",
    "Vienne",
    "Athènes",
  ];

  return (
    <MUIAutocomplete
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Choisissez une ville" />
      )}
      {...props}
    />
  );
};

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  parameters: {
    docs: {
      description: {
        component: `L'autocomplete est une saisie de texte normale enrichie d'un panel d'options suggérées.

Pour explorer les cas d'usage possibles : [Autocomplete component - Material UI](https://mui.com/material-ui/react-autocomplete)`,
      },
    },
  },
  argTypes: {
    autoHighlight: {
      control: "boolean",
      description: "Met automatiquement en surbrillance la première option",
      table: { defaultValue: { summary: "false" } },
    },
    disableClearable: {
      control: "boolean",
      description: "Désactive la possibilité de vider le champ",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "Désactive le composant",
      table: { defaultValue: { summary: "false" } },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {
  args: {
    autoHighlight: false,
    disableClearable: false,
    disabled: false,
  },
};
