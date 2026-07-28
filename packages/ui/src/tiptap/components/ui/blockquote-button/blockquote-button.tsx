import { forwardRef, useCallback } from "react";
import { Badge } from "../../../..";
// --- Tiptap UI ---
import type { UseBlockquoteConfig } from "./use-blockquote";
import {
  BLOCKQUOTE_SHORTCUT_KEY,
  useBlockquote,
} from "./use-blockquote";
// --- Hooks ---
import { useTiptapEditor } from "../../../hooks/use-tiptap-editor";
// --- Lib ---
import { parseShortcutKeys } from "../../../lib/tiptap-utils";
// --- UI Primitives ---
import type { ButtonProps } from "../../ui-primitive/button";
import { Button } from "../../ui-primitive/button";

export interface BlockquoteButtonProps
  extends Omit<ButtonProps, "type" | "value">, UseBlockquoteConfig {
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

export function BlockquoteShortcutBadge({
  shortcutKeys = BLOCKQUOTE_SHORTCUT_KEY,
}: {
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

/**
 * Button component for toggling blockquote in a Tiptap editor.
 *
 * For custom button implementations, use the `useBlockquote` hook instead.
 */
export const BlockquoteButton = forwardRef<
  HTMLButtonElement,
  BlockquoteButtonProps
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
    } = useBlockquote({
      editor,
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
        value="blockquote"
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
              <BlockquoteShortcutBadge shortcutKeys={shortcutKeys} />
            )}
          </>
        )}
      </Button>
    );
  },
);

BlockquoteButton.displayName = "BlockquoteButton";
