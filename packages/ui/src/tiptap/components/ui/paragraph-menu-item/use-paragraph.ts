"use client";

import { NodeSelection, TextSelection } from "@tiptap/pm/state";
import { type Editor } from "@tiptap/react";
import { useCallback, useEffect, useState } from "react";

// --- Hooks ---
import { useTiptapEditor } from "../../../hooks/use-tiptap-editor";
// --- Lib ---
import {
  findNodePosition,
  getSelectedBlockNodes,
  isNodeInSchema,
  isNodeTypeSelected,
  isValidPosition,
  selectionWithinConvertibleTypes,
} from "../../../lib/tiptap-utils";

/**
 * Configuration for the paragraph functionality
 */
export interface UseParagraphConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null;
  /**
   * Whether the button should hide when paragraph is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean;
  /**
   * Callback function called after a successful paragraph toggle.
   */
  onToggled?: () => void;
}

/**
 * Checks if paragraph can be toggled in the current editor state
 */
export function canToggle(
  editor: Editor | null,
  turnInto: boolean = true,
): boolean {
  if (!editor || !editor.isEditable) return false;
  if (
    !isNodeInSchema("paragraph", editor) ||
    isNodeTypeSelected(editor, ["image"])
  )
    return false;

  if (!turnInto) {
    return editor.can().setNode("paragraph");
  }

  // Ensure selection is in nodes we're allowed to convert
  if (
    !selectionWithinConvertibleTypes(editor, [
      "paragraph",
      "heading",
      "bulletList",
      "orderedList",
      "taskList",
      "blockquote",
      "codeBlock",
    ])
  )
    return false;

  // Either we can set paragraph directly on the selection,
  // or we can clear formatting/nodes to arrive at a paragraph.
  return editor.can().setNode("paragraph") || editor.can().clearNodes();
}

/**
 * Checks if paragraph is currently active
 */
export function isParagraphActive(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false;

  return editor.isActive("paragraph");
}

/**
 * Toggles paragraph in the editor
 */
export function toggleParagraph(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable || !canToggle(editor)) return false;

  try {
    const view = editor.view;
    let state = view.state;
    let tr = state.tr;

    const blocks = getSelectedBlockNodes(editor);

    // In case a selection contains multiple blocks, we only allow
    // toggling to node if there's exactly one block selected
    // we also dont block the canToggle since it will fall back to the bottom logic
    const isPossibleToTurnInto =
      selectionWithinConvertibleTypes(editor, [
        "paragraph",
        "heading",
        "bulletList",
        "orderedList",
        "taskList",
        "blockquote",
        "codeBlock",
      ]) && blocks.length === 1;

    // No selection, find the the cursor position
    if (
      (state.selection.empty || state.selection instanceof TextSelection) &&
      isPossibleToTurnInto
    ) {
      const pos = findNodePosition({
        editor,
        node: state.selection.$anchor.node(1),
      })?.pos;
      if (!isValidPosition(pos)) return false;

      tr = tr.setSelection(NodeSelection.create(state.doc, pos));
      view.dispatch(tr);
      state = view.state;
    }

    const selection = state.selection;
    let chain = editor.chain().focus();

    // Handle NodeSelection
    if (selection instanceof NodeSelection) {
      const firstChild = selection.node.firstChild?.firstChild;
      const lastChild = selection.node.lastChild?.lastChild;

      const from = firstChild
        ? selection.from + firstChild.nodeSize
        : selection.from + 1;

      const to = lastChild
        ? selection.to - lastChild.nodeSize
        : selection.to - 1;

      const resolvedFrom = state.doc.resolve(from);
      const resolvedTo = state.doc.resolve(to);

      chain = chain
        .setTextSelection(TextSelection.between(resolvedFrom, resolvedTo))
        .clearNodes();
    }

    chain.setNode("paragraph").run();

    editor.chain().focus().selectTextblockEnd().run();

    return true;
  } catch {
    return false;
  }
}

/**
 * Determines if the paragraph menu item should be shown
 */
export function shouldShowItem(props: {
  editor: Editor | null;
  hideWhenUnavailable: boolean;
}): boolean {
  const { editor, hideWhenUnavailable } = props;

  if (!editor) return false;

  if (!hideWhenUnavailable) {
    return true;
  }

  if (!editor.isEditable) return false;

  if (!isNodeInSchema("paragraph", editor)) return false;

  if (!editor.isActive("code")) {
    return canToggle(editor);
  }

  return true;
}

/**
 * Custom hook that provides paragraph functionality for Tiptap editor
 */
export function useParagraph(config: UseParagraphConfig) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onToggled,
  } = config;

  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const canToggleState = canToggle(editor);
  const isActive = isParagraphActive(editor);

  useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowItem({ editor, hideWhenUnavailable }));
    };

    handleSelectionUpdate();

    editor.on("selectionUpdate", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable]);

  const handleToggle = useCallback(() => {
    if (!editor) return false;

    const success = toggleParagraph(editor);
    if (success) {
      onToggled?.();
    }
    return success;
  }, [editor, onToggled]);

  return {
    isVisible,
    isActive,
    handleToggle,
    canToggle: canToggleState,
    label: "Paragraphe",
  };
}
