import { BlockquoteButton } from "../../ui/blockquote-button";
import { CodeBlockButton } from "../../ui/code-block-button";
import { HeadingMenu } from "../../ui/heading-menu";
import { LinkPopover } from "../../ui/link-popover";
import { ListButton } from "../../ui/list-button";
import { MarkButton } from "../../ui/mark-button";
import { TextAlignButton } from "../../ui/text-align-button";
import { TextColorPopover } from "../../ui/text-color-popover";
import { UndoRedoButton } from "../../ui/undo-redo-button";
import { ButtonDef } from "./types";

export const BUTTON_DEFS: ButtonDef[] = [
  {
    id: "undo",
    extensionName: "undoRedo",
    group: "history",
    Component: () => <UndoRedoButton action="undo" />,
  },
  {
    id: "redo",
    extensionName: "undoRedo",
    group: "history",
    Component: () => <UndoRedoButton action="redo" />,
  },
  {
    id: "heading",
    extensionName: "heading",
    group: "blocks",
    Component: () => <HeadingMenu modal={false} levels={[1, 2, 3, 4]} />,
  },
  {
    id: "bulletList",
    extensionName: "bulletList",
    group: "blocks",
    Component: () => <ListButton type="bulletList" />,
  },
  {
    id: "orderedList",
    extensionName: "orderedList",
    group: "blocks",
    Component: () => <ListButton type="orderedList" />,
  },
  {
    id: "blockquote",
    extensionName: "blockquote",
    group: "blocks",
    Component: BlockquoteButton,
  },
  {
    id: "codeBlock",
    extensionName: "codeBlock",
    group: "blocks",
    Component: CodeBlockButton,
  },
  {
    id: "textColor",
    extensionName: "textStyle",
    group: "marks",
    Component: TextColorPopover,
  },
  {
    id: "bold",
    extensionName: "bold",
    group: "marks",
    Component: () => <MarkButton type="bold" />,
  },
  {
    id: "italic",
    extensionName: "italic",
    group: "marks",
    Component: () => <MarkButton type="italic" />,
  },
  {
    id: "strike",
    extensionName: "strike",
    group: "marks",
    Component: () => <MarkButton type="strike" />,
  },
  {
    id: "code",
    extensionName: "code",
    group: "marks",
    Component: () => <MarkButton type="code" />,
  },
  {
    id: "underline",
    extensionName: "underline",
    group: "marks",
    Component: () => <MarkButton type="underline" />,
  },
  {
    id: "link",
    extensionName: "link",
    group: "marks",
    Component: LinkPopover,
  },
  {
    id: "superscript",
    extensionName: "superscript",
    group: "scripts",
    Component: () => <MarkButton type="superscript" />,
  },
  {
    id: "subscript",
    extensionName: "subscript",
    group: "scripts",
    Component: () => <MarkButton type="subscript" />,
  },
  {
    id: "alignLeft",
    extensionName: "textAlign",
    group: "textAlign",
    Component: () => <TextAlignButton align="left" />,
  },
  {
    id: "alignCenter",
    extensionName: "textAlign",
    group: "textAlign",
    Component: () => <TextAlignButton align="center" />,
  },
  {
    id: "alignRight",
    extensionName: "textAlign",
    group: "textAlign",
    Component: () => <TextAlignButton align="right" />,
  },
  {
    id: "alignJustify",
    extensionName: "textAlign",
    group: "textAlign",
    Component: () => <TextAlignButton align="justify" />,
  },
];

export const BUTTON_IDS = BUTTON_DEFS.map((def) => def.id);
