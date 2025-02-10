import { MoodleIcon } from "@cgi-learning-hub/icons";
import { ThemeProvider } from "@cgi-learning-hub/theme";
import {
  Alert,
  Button,
  CustomFile,
  DatePicker,
  Dropzone,
  EmptyState,
  IconButton,
  Menu,
  MenuItem,
  PasswordInput,
  SearchInput,
  Tab,
  TextInput,
  Tooltip,
  Typography,
} from "@cgi-learning-hub/ui";
import { Fingerprint } from "@mui/icons-material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MUIButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import React, { useState } from "react";
import FileList from "../../../packages/ui/src/components/FileList/FileList";
import "./App.css";
import ExampleComponent from "./components/ExampleComponent";

const StyleButton = styled(MUIButton)(({ theme }) => ({
  backgroundColor: theme.vars.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.vars.palette.primary.main,
  },
}));

const ButtonComponent = ({ onClick }: { onClick: () => void }) => {
  return (
    <StyleButton variant="contained" onClick={onClick}>
      Change theme
    </StyleButton>
  );
};

const mockedFiles: CustomFile[] = [
  {
    name: "file1 loooooooooooooooooooooooooooooooooooooooong.pdf",
    size: 237482,
    isLoading: false,
    isDeletable: true,
    isDowlodable: true,
    ownerName: "Alice Smith",
  },
  {
    name: "file2.svg",
    size: 5423,
    isLoading: true,
    isDeletable: false,
    isDowlodable: true,
    ownerName: "Bob Johnson",
  },
  {
    name: "file3.mp4",
    size: 6548764,
    isLoading: false,
    isDeletable: true,
    isDowlodable: false,
    ownerName: "John Doe",
  },
  {
    name: "file4.docx",
    size: 18456,
    isLoading: true,
    isDeletable: true,
    isDowlodable: false,
    ownerName: "Sarah Lee",
  },
  {
    name: "file5.gif",
    size: 43954,
    isLoading: false,
    isDeletable: false,
    isDowlodable: true,
    ownerName: "Michael Brown",
  },
  {
    name: "file6.zip",
    size: 234723,
    isLoading: true,
    isDeletable: false,
    isDowlodable: false,
    ownerName: "Emily Davis",
  },
  {
    name: "file7.png",
    size: 320000,
    isLoading: false,
    isDeletable: true,
    isDowlodable: true,
    ownerName: "Chris Wilson",
  },
  {
    name: "file8.jpg",
    size: 98923,
    isLoading: true,
    isDeletable: true,
    isDowlodable: true,
    ownerName: "Laura Martinez",
  },
  {
    name: "file9.txt",
    size: 14982,
    isLoading: false,
    isDeletable: true,
    isDowlodable: false,
    ownerName: "David Moore",
  },
  {
    name: "file10.mp3",
    size: 2930294,
    isLoading: true,
    isDeletable: false,
    isDowlodable: false,
    ownerName: "Rachel Taylor",
  },
  {
    name: "file11.xlsx",
    size: 11234,
    isLoading: false,
    isDeletable: true,
    isDowlodable: true,
    ownerName: "James White",
  },
  {
    name: "file12.rar",
    size: 134723,
    isLoading: true,
    isDeletable: false,
    isDowlodable: true,
    ownerName: "Sophia Harris",
  },
];

function App() {
  const [isImtThemeActive, setImtThemeActive] = useState(false);
  const [value, setValue] = useState("1");
  const [password, setPassword] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const open = Boolean(anchorEl);

  const changeTheme = () => setImtThemeActive((old) => !old);

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
    <ThemeProvider themeId={isImtThemeActive ? "imt" : "default"}>
      <div className="App">
        <header className="App-header">
          <ButtonComponent onClick={changeTheme} />
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
          <TextInput label="TextInput" placeholder="test" />
          <ExampleComponent
            primaryText="Example component"
            secondaryText="Secondaire"
          />
          <EmptyState
            svgName="client-error"
            title="Une erreur est survenue"
            description="Si l'erreur persiste, contacter un administrateur"
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
          <div>
            <MoodleIcon />
          </div>
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
            onDrop={(files) => setFiles(files)}
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
          <div
            style={{
              width: "50%",
            }}
          >
            {
              <FileList
                files={mockedFiles}
                onClick={(file) => console.log("click on : ", file.name)}
                onDelete={(file) => console.log("delete : ", file.name)}
                onDownload={(file) => console.log("download : ", file.name)}
              ></FileList>
            }
          </div>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
