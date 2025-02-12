import MUIMenu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "../Button";

const Menu = (props: MenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => setAnchorEl(null);

  return (
    <>
      <Button
        variant="text"
        id="basic-button"
        aria-controls={isOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={handleClick}
      >
        Open menu
      </Button>
      <MUIMenu
        {...props}
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={closeMenu}>Profile</MenuItem>
        <MenuItem onClick={closeMenu}>My account</MenuItem>
        <MenuItem onClick={closeMenu}>Logout</MenuItem>
      </MUIMenu>
    </>
  );
};

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
};
export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {},
};
