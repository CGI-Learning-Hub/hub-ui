import type { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

// --- Hooks ---
import { useTiptapEditor } from "../../../hooks/use-tiptap-editor";
// --- Icons ---
import { HeadingIcon } from "../../icons/heading-icon";
// --- Tiptap UI ---
import {
  type Level,
  canToggle,
  headingIcons,
  isHeadingActive,
  shouldShowItem,
} from "../heading-menu-item";

/**
 * Configuration for the heading menu functionality
 */
export interface UseHeadingMenuConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null;
  /**
   * Available heading levels to show in the menu
   * @default [1, 2, 3, 4, 5, 6]
   */
  levels?: Level[];
  /**
   * Whether the menu should hide when headings are not available.
   * @default false
   */
  hideWhenUnavailable?: boolean;
}

/**
 * Gets the currently active heading level from the available levels
 */
export function getActiveHeadingLevel(
  editor: Editor | null,
  levels: Level[] = [1, 2, 3, 4, 5, 6],
): Level | undefined {
  if (!editor || !editor.isEditable) return undefined;
  return levels.find((level) => isHeadingActive(editor, level));
}

/**
 * Custom hook that provides heading menu functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage
 * function MyHeading() {
 *   const {
 *     isVisible,
 *     activeLevel,
 *     isAnyHeadingActive,
 *     canToggle,
 *     levels,
 *   } = useHeadingMenu()
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <Menu>
 *       // content
 *     </Menu>
 *   )
 * }
 *
 * // Advanced usage with configuration
 * function MyAdvancedHeading() {
 *   const {
 *     isVisible,
 *     activeLevel,
 *   } = useHeadingMenu({
 *     editor: myEditor,
 *     levels: [1, 2, 3],
 *     hideWhenUnavailable: true,
 *   })
 *
 *   // component implementation
 * }
 * ```
 */
export function useHeadingMenu(config?: UseHeadingMenuConfig) {
  const {
    editor: providedEditor,
    levels = [1, 2, 3, 4, 5, 6],
    hideWhenUnavailable = false,
  } = config || {};

  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState(true);

  const activeLevel = getActiveHeadingLevel(editor, levels);
  const isActive = isHeadingActive(editor);
  const canToggleState = canToggle(editor);

  useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      setIsVisible(
        shouldShowItem({ editor, hideWhenUnavailable, level: levels }),
      );
    };

    handleSelectionUpdate();

    editor.on("selectionUpdate", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable, levels]);

  return {
    isVisible,
    activeLevel,
    isActive,
    canToggle: canToggleState,
    levels,
    label: "Titre",
    Icon: activeLevel ? headingIcons[activeLevel] : HeadingIcon,
  };
}
