import { forwardRef, useCallback } from "react";

import { Badge, MenuItem, MenuItemProps, Typography } from "../../../..";
import { useTiptapEditor } from "../../../hooks/use-tiptap-editor";
// --- Lib ---
import { parseShortcutKeys } from "../../../lib/tiptap-utils";
// --- Tiptap UI ---
import type { Level, UseHeadingConfig } from "./use-heading";
import { HEADING_SHORTCUT_KEYS, useHeading } from "./use-heading";

export interface HeadingMenuItemProps
  extends Omit<MenuItemProps, "type">, UseHeadingConfig {
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

export function HeadingShortcutBadge({
  level,
  shortcutKeys = HEADING_SHORTCUT_KEYS[level],
}: {
  level: Level;
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

/**
 * Menu item component for toggling heading in a Tiptap editor.
 *
 * For custom menu item implementations, use the `useHeading` hook instead.
 */
export const HeadingMenuItem = forwardRef<
  HTMLButtonElement,
  HeadingMenuItemProps
>(
  (
    {
      editor: providedEditor,
      level,
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
    const {
      isVisible,
      canToggle,
      isActive,
      handleToggle,
      label,
      Icon,
      shortcutKeys,
    } = useHeading({
      editor,
      level,
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
            <Icon fontSize="small" />
            {text && <Typography component="span" variant="body2" sx={{ ml: 1 }}>{label}</Typography>}
            {showShortcut && (
              <HeadingShortcutBadge level={level} shortcutKeys={shortcutKeys} />
            )}
          </>
        )}
      </MenuItem>
    );
  },
);

HeadingMenuItem.displayName = "HeadingMenuItem";
