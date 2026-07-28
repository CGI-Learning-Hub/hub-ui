"use client";

import { Editor } from "@tiptap/react";

import { BlockquoteButton } from "../../ui/blockquote-button";
import { CodeBlockButton } from "../../ui/code-block-button";
import { HeadingMenu } from "../../ui/heading-menu";
import { LinkPopover } from "../../ui/link-popover";
import { ListButton } from "../../ui/list-button";
import { MarkButton } from "../../ui/mark-button";
import { TextAlignButton } from "../../ui/text-align-button";
import { UndoRedoButton } from "../../ui/undo-redo-button";
import { ToolbarGroup, ToolbarSeparator } from "../toolbar";

type BaseProps = React.HTMLAttributes<HTMLDivElement>;

interface FormattingControlsProps extends BaseProps {
  editor: Editor;
}

export const FormattingControls = ({ editor }: FormattingControlsProps) => {
  const extensionNames = editor.extensionManager.extensions.map((e) => e.name);
  const hasSuperscriptSubscript = extensionNames.some(
    (name) => name === "subscript" || name === "superscript",
  );

  return (
    <>
      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingMenu modal={false} levels={[1, 2, 3, 4]} />
        <ListButton type="bulletList" />
        <ListButton type="orderedList" />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        <LinkPopover />
      </ToolbarGroup>

      {hasSuperscriptSubscript ? (
        <>
          <ToolbarSeparator />
          <ToolbarGroup>
            <MarkButton type="superscript" />
            <MarkButton type="subscript" />
          </ToolbarGroup>
        </>
      ) : null}

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>
    </>
  );
};
FormattingControls.displayName = "FormattingControls";
