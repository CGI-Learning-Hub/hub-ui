import { forwardRef, useCallback } from "react";

import { Badge, MenuItem, MenuItemProps, Typography } from "../../../..";
import { useTiptapEditor } from "../../../hooks/use-tiptap-editor";
// --- Lib ---
import { parseShortcutKeys } from "../../../lib/tiptap-utils";
// --- Tiptap UI ---
import type { UseParagraphConfig } from "./use-paragraph";
import { useParagraph } from "./use-paragraph";

export interface ParagraphMenuItemProps
  extends Omit<MenuItemProps, "type">, UseParagraphConfig {
  /**
   * Optional text to display alongside the icon.
   */
  text?: string;
  /**
   * Optional show shortcut keys in the item.
   * @default false
   */
  showShortcut?: boolean;
}

/**
 * Menu item component for toggling paragraph in a Tiptap editor.
 *
 * For custom menu item implementations, use the `useParagraph` hook instead.
 */
export const ParagraphMenuItem = forwardRef<
  HTMLButtonElement,
  ParagraphMenuItemProps
>(
  (
    {
      editor: providedEditor,
      text,
      hideWhenUnavailable = false,
      onToggled,
      showShortcut = false,
      onClick,
      children,
      ...menuItemProps
    },
    ref,
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, canToggle, isActive, handleToggle, label } =
      useParagraph({
        editor,
        hideWhenUnavailable,
        onToggled,
      });

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLLIElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleToggle();
      },
      [handleToggle, onClick],
    );

    if (!isVisible) {
      return null;
    }

    return (
      <MenuItem
        component="li"
        role="button"
        tabIndex={-1}
        disabled={!canToggle}
        data-disabled={!canToggle}
        aria-label={label}
        aria-pressed={isActive}
        tooltip={label}
        selected={isActive}
        onClick={handleClick}
        {...menuItemProps}
        ref={ref}
      >
        {children ?? (
          <>
            {label && (
              <Typography component="span" variant="body2">
                {label}
              </Typography>
            )}
            {showShortcut && (
              <Badge>{parseShortcutKeys({ shortcutKeys: "ctrl+alt+p" })}</Badge>
            )}
          </>
        )}
      </MenuItem>
    );
  },
);

ParagraphMenuItem.displayName = "ParagraphMenuItem";
