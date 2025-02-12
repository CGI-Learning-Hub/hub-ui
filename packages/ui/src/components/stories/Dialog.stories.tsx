import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "../Button";
import { Dialog as CustomDialog, DialogProps } from "../Dialog";

const Dialog = (props: DialogProps) => {
  const [isOpen, setOpen] = useState(false);

  const openDialog = () => setOpen(true);

  const closeDialog = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" onClick={openDialog}>
        Open dialog
      </Button>
      <CustomDialog {...props} open={isOpen} onClose={closeDialog}>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Dialog content text
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => true}>
            Save
          </Button>
        </DialogActions>
      </CustomDialog>
    </>
  );
};

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          "This example is made with DialogTitle, DialogContent, DialogContentText and DialogActions but the dialog children are entirely up to you.",
      },
    },
  },
  argTypes: {
    disableEscapeKeyDown: {
      control: "boolean",
    },
    fullScreen: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    maxWidth: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", false],
    },
    showCloseButton: {
      control: "boolean",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    disableEscapeKeyDown: false,
    fullScreen: false,
    fullWidth: false,
    maxWidth: "sm",
    showCloseButton: true,
  },
};
