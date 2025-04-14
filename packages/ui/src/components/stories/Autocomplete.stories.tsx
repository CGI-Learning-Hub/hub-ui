import TextField from "@mui/material/TextField";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Autocomplete as CGIAutocomplete } from "../Autocomplete";

const Autocomplete = (props: any) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
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

  const handleChange = (_: any, newValue: string[] | string) => {
    setSelectedValues(newValue as string[]);
  };

  const handleSelectAll = () => {
    setSelectedValues(options);
  }
  const handleDeselectAll = () => {
    setSelectedValues([]);
  }

  return (
    <CGIAutocomplete
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Choisissez une ville" />
      )}
      onChange={handleChange}
      value={selectedValues}
      onSelectAll={handleSelectAll}
      onDeselectAll={handleDeselectAll}
      multiple={props.multiple}
      isAllSelectable={props.isAllSelectable}
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
    multiple: {
      control: "boolean",
      description: "Permet de sélectionner plusieurs options",
      table: { defaultValue: { summary: "false" } },
    },
    isAllSelectable: {
      control: "boolean",
      description: "Permet de sélectionner/désélectionner toutes les options",
      table: { defaultValue: { summary: "false" } },
    },
    disableCloseOnSelect: {
      control: "boolean",
      description: "Désactive la fermeture de la liste des options lors de la sélection",
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
    multiple: true,
    isAllSelectable: true,
    disableCloseOnSelect: false,
  },
};
