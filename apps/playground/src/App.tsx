import { Moodle, SortAlphabeticalAscending } from "@cgi-learning-hub/icons";
import { ThemeProvider } from "@cgi-learning-hub/theme";
import {
  ActionBar,
  Alert,
  Box,
  Button,
  ColorPicker,
  CustomFile,
  DatePicker,
  Dropzone,
  FileList,
  HexaColor,
  IconButton,
  Menu,
  MenuItem,
  PasswordInput,
  ResourceCard,
  SearchInput,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@cgi-learning-hub/ui";
import type {} from "@mui/material/themeCssVarsAugmentation";
import React, { useState } from "react";

import ExampleComponent from "./components/ExampleComponent";

type ThemeId = "campus" | "crna" | "default" | "imt" | "ent1D";

function App() {
  const [themeId, setThemeId] = useState<ThemeId>("default");
  const [password, setPassword] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [files, setFiles] = useState<CustomFile[]>([]);
  const [color, setColor] = useState<HexaColor>("#F44336");
  const open = Boolean(anchorEl);

  const handleThemeChange = (
    event: React.MouseEvent<HTMLElement>,
    newThemeId: ThemeId | null,
  ) => {
    if (newThemeId !== null) {
      setThemeId(newThemeId);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider themeId={themeId}>
      <ToggleButtonGroup value={themeId} exclusive onChange={handleThemeChange}>
        <ToggleButton value="default">Default</ToggleButton>
        <ToggleButton value="crna">CRNA</ToggleButton>
        <ToggleButton value="campus">Campus</ToggleButton>
        <ToggleButton value="imt">IMT</ToggleButton>
        <ToggleButton value="ent1D">1D</ToggleButton>
      </ToggleButtonGroup>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<SortAlphabeticalAscending />}
      >
        Bouton couleur primaire
      </Button>
      <Button variant="text" color="secondary">
        Bouton couleur secondaire
      </Button>
      <TextField label="TextField" placeholder="test" />
      <ExampleComponent
        primaryText="Example component"
        secondaryText="Secondaire"
      />
      <SearchInput />
      <Tooltip title="Tooltip">
        <Typography variant="h2" component="h2">
          Typo h2
        </Typography>
      </Tooltip>
      <IconButton onClick={handleClick} size="large">
        <Moodle fontSize="inherit" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      <DatePicker />
      <Dropzone
        onDrop={(files: React.SetStateAction<CustomFile[]>) => setFiles(files)}
        information="SVG, PNG, JPG or GIF (max. 3MB)"
      />
      <FileList files={files} />
      <PasswordInput
        label="Password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <div>password: {password}</div>
      <Alert severity="info">Info alert</Alert>
      <Alert severity="success">Success alert</Alert>
      <Alert severity="warning">Warning alert</Alert>
      <Alert severity="error">Error alert</Alert>
      <ColorPicker value={color} onChange={setColor} />
      <ActionBar
        leftActions={[
          { label: "Ouvrir", action: () => ({}) },
          { label: "Fermer", action: () => ({}) },
          { label: "Partager", action: () => ({}) },
        ]}
        rightActions={[
          { label: "Tout selectionner", action: () => ({}) },
          { label: "Tout déselectionner", action: () => ({}) },
        ]}
      ></ActionBar>
      <ResourceCard 
        title={"Ma grande ressource"}
        image={undefined}
        defaultImage={"../public/vite.svg"}
        size={"md"}
        ></ResourceCard>
      <ResourceCard 
        title={"Ma petite ressource"}
        image={undefined}
        defaultImage={"../public/vite.svg"}
        size={"sm"}
        ></ResourceCard>
      <Box marginBottom="5rem"></Box>
    </ThemeProvider>
  );
}

export default App;
