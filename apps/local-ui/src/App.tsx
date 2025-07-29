import { ThemeProvider } from "../../../packages/theme/src";
import {
  ActionBar,
  Alert,
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
  SearchInput,
  Tab,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@cgi-learning-hub/ui";
import { Fingerprint } from "@mui/icons-material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import type { } from "@mui/material/themeCssVarsAugmentation";
import React, { useState } from "react";

import "./App.css";
import ExampleComponent from "./components/ExampleComponent";
import { Button } from "../../../packages/ui/src/components/Button"

type ThemeId = "campus" | "crna" | "default" | "imt" | "ent1D";

function App() {
  const [themeId, setThemeId] = useState<ThemeId>("default");
  const [value, setValue] = useState("1");
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider themeId={themeId}>
      <div className="App">
        <header className="App-header">
          <ToggleButtonGroup
            value={themeId}
            exclusive
            onChange={handleThemeChange}
          >
            <ToggleButton value="default">Default</ToggleButton>
            <ToggleButton value="crna">CRNA</ToggleButton>
            <ToggleButton value="campus">Campus</ToggleButton>
            <ToggleButton value="imt">IMT</ToggleButton>
            <ToggleButton value="ent1D">1D</ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AccessAlarmIcon />}
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
            <Fingerprint fontSize="inherit" />
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
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
          <Dropzone
            onDrop={(files: React.SetStateAction<CustomFile[]>) =>
              setFiles(files)
            }
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
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
