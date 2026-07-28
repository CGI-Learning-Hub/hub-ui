"use client";

// --- Icons ---
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { forwardRef, useCallback, useState } from "react";

import { Menu } from "../../../..";
import { useTiptapEditor } from "../../../hooks/use-tiptap-editor";
// --- UI Primitives ---
import type { ButtonProps } from "../../ui-primitive/button";
import { Button } from "../../ui-primitive/button";
// --- Tiptap UI ---
import { HeadingMenuItem } from "../heading-menu-item";
// --- Hooks ---
import type { UseHeadingMenuConfig } from "./use-heading-menu";
import { useHeadingMenu } from "./use-heading-menu";

export interface HeadingMenuProps
  extends Omit<ButtonProps, "type" | "value">, UseHeadingMenuConfig {
  /**
   * Callback for when the menu opens or closes
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Whether the menu should use a modal
   */
  modal?: boolean;
}

/**
 * Menu component for selecting heading levels in a Tiptap editor.
 *
 * For custom menu implementations, use the `useHeadingMenu` hook instead.
 */
export const HeadingMenu = forwardRef<HTMLButtonElement, HeadingMenuProps>(
  (
    {
      editor: providedEditor,
      levels = [1, 2, 3, 4, 5, 6],
      hideWhenUnavailable = false,
      onOpenChange,
      children,
      modal = true,
      ...buttonProps
    },
    ref,
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { isVisible, isActive, canToggle, Icon, label } = useHeadingMenu({
      editor,
      levels,
      hideWhenUnavailable,
    });

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = useCallback(() => {
      if (!editor || !canToggle) return;
      setAnchorEl(null);
      onOpenChange?.(false);
    }, [canToggle, editor, onOpenChange]);

    if (!isVisible) {
      return null;
    }

    return (
      <div>
        <Button
          id="heading-button"
          value="heading"
          type="button"
          selected={isActive}
          role="button"
          tabIndex={-1}
          disabled={!canToggle}
          data-disabled={!canToggle}
          aria-haspopup="listbox"
          aria-controls="heading-menu"
          aria-label="Format text as heading"
          aria-expanded={open}
          tooltip={label}
          onClick={handleClick}
          {...buttonProps}
          ref={ref}
        >
          {children ? (
            children
          ) : (
            <>
              <Icon fontSize="small" />
              <ExpandMoreRoundedIcon sx={{ fontSize: "0.75rem" }} />
            </>
          )}
        </Button>

        <Menu
          id="heading-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              "aria-labelledby": "heading-button",
              role: "listbox",
            },
          }}
        >
          {levels.map((level) => (
            <HeadingMenuItem
              key={`heading-${level}`}
              editor={editor}
              level={level}
              text={`Heading ${level}`}
              onClick={handleClose}
            />
          ))}
        </Menu>
      </div>
    );
  },
);

HeadingMenu.displayName = "HeadingMenu";

export default HeadingMenu;
