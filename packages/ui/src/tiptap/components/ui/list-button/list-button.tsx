import { forwardRef, useCallback } from "react";
import { Badge } from "../../../..";
// --- Tiptap UI ---
import type { ListType, UseListConfig } from "./use-list";
import { LIST_SHORTCUT_KEYS, useList } from "./use-list";
// --- Hooks ---
import { useTiptapEditor } from "../../../hooks/use-tiptap-editor";
// --- Lib ---
import { parseShortcutKeys } from "../../../lib/tiptap-utils";
// --- UI Primitives ---
import type { ButtonProps } from "../../ui-primitive/button";
import { Button } from "../../ui-primitive/button";

export interface ListButtonProps
  extends Omit<ButtonProps, "type" | "value">, UseListConfig {
  /**
   * Optional text to display alongside the icon.
   */
  text?: string;
  /**
   * Optional show shortcut keys in the button.
   * @default false
   */
  showShortcut?: boolean;
}

export function ListShortcutBadge({
  type,
  shortcutKeys = LIST_SHORTCUT_KEYS[type],
}: {
  type: ListType;
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

/**
 * Button component for toggling lists in a Tiptap editor.
 *
 * For custom button implementations, use the `useList` hook instead.
 */
export const ListButton = forwardRef<HTMLButtonElement, ListButtonProps>(
  (
    {
      editor: providedEditor,
      type,
      text,
      hideWhenUnavailable = false,
      onToggled,
      showShortcut = false,
      onClick,
      children,
      ...buttonProps
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
      shortcutKeys,
      Icon,
    } = useList({
      editor,
      type,
      hideWhenUnavailable,
      onToggled,
    });

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onClick?.(event, !isActive);
        if (event.defaultPrevented) return;
        handleToggle();
      },
      [handleToggle, onClick],
    );

    if (!isVisible) {
      return null;
    }

    return (
      <Button
        value={type}
        type="button"
        selected={isActive}
        role="button"
        tabIndex={-1}
        disabled={!canToggle}
        data-disabled={!canToggle}
        aria-label={label}
        tooltip={label}
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <Icon fontSize="small" />
            {text && <span className="tiptap-button-text">{text}</span>}
            {showShortcut && (
              <ListShortcutBadge type={type} shortcutKeys={shortcutKeys} />
            )}
          </>
        )}
      </Button>
    );
  },
);

ListButton.displayName = "ListButton";
