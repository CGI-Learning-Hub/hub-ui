"use client";

import { useCallback, useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";
// --- Icons ---
import FormatColorTextRoundedIcon from '@mui/icons-material/FormatColorTextRounded';
// --- Hooks ---
import { useTiptapEditor } from "../../../hooks/use-tiptap-editor";
// --- Lib ---
import { isMarkInSchema, isNodeTypeSelected } from "../../../lib/tiptap-utils";

/**
 * Configuration for the text color popover functionality
 */
export interface UseTextColorPopoverConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null;
  /**
   * Whether to hide the text color popover when not available.
   * @default false
   */
  hideWhenUnavailable?: boolean;
  /**
   * Callback function called when the text color is set.
   */
  onSetTextColor?: () => void;
}

/**
 * Configuration for the text style handler functionality
 */
export interface TextStyleHandlerProps {
  /**
   * The Tiptap editor instance.
   */
  editor: Editor | null;
  /**
   * Callback function called when the text style is set.
   */
  onSetTextStyle?: () => void;
}

/**
 * Checks if a text color can be set in the current editor state
 */
export function canSetTextColor(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false;

  // The third argument 'true' checks whether the current selection is inside an image caption, and prevents setting a text style there
  // If the selection is inside an image caption, we can't set a text style
  if (isNodeTypeSelected(editor, ["image"], true)) return false;
  try {
    return editor.can().setColor("red");
  } catch {
    return false;
  }
}

/**
 * Gets the currently active text color from the editor selection
 */
export function getActiveTextColor(editor: Editor | null): string | null {
  if (!editor || !editor.isEditable || !editor.isActive("textStyle")) return null;
  return editor.getAttributes("textStyle").color;
}

/**
 * Determines if the text color button should be shown
 */
export function shouldShowTextColorButton(props: {
  editor: Editor | null;
  hideWhenUnavailable: boolean;
}): boolean {
  const { editor, hideWhenUnavailable } = props;

  if (!editor || !editor.isEditable) return false;

  const textStyleInSchema = isMarkInSchema("textStyle", editor);

  // If hideWhenUnavailable is false, always show the button (even if disabled)
  if (!hideWhenUnavailable) {
    return true;
  }

  // hideWhenUnavailable is true: hide if text style is not in schema
  if (!textStyleInSchema) {
    return false;
  }

  // hideWhenUnavailable is true: hide if we can't set a text style (unless in code block)
  if (!editor.isActive("code")) {
    return canSetTextColor(editor);
  }

  return true;
}

/**
 * Custom hook for handling text style operations in a Tiptap editor
 */
export function useTextStyleHandler(props: TextStyleHandlerProps) {
  const { editor, onSetTextStyle } = props;

  const setTextColor = useCallback((color: string) => {
    if (!editor) return;

    editor
      .chain()
      .focus()
      .setColor(color)
      .run();

    onSetTextStyle?.();
  }, [editor, onSetTextStyle]);

  const removeTextColor = useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .unsetColor()
      .removeEmptyTextStyle()
      .run();
  }, [editor]);

  return {
    setTextColor,
    removeTextColor,
  };
}

/**
 * Main hook that provides text color popover functionality for Tiptap editor
 */
export function useTextColorPopover(config?: UseTextColorPopoverConfig) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onSetTextColor,
  } = config || {};

  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState(true);

  const activeColor = getActiveTextColor(editor);
  const isActive = activeColor !== null;
  const canSet = canSetTextColor(editor);

  const textColorHandler = useTextStyleHandler({
    editor,
    onSetTextStyle: onSetTextColor,
  });

  useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      setIsVisible(
        shouldShowTextColorButton({
          editor,
          hideWhenUnavailable,
        }),
      );
    };

    handleSelectionUpdate();

    editor.on("selectionUpdate", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable]);

  return {
    isVisible,
    canSet,
    activeColor,
    isActive,
    label: "Couleur",
    Icon: FormatColorTextRoundedIcon,
    ...textColorHandler,
  };
}
