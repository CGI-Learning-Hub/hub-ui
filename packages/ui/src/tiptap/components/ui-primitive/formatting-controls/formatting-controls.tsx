"use client";

import { Editor } from "@tiptap/react";
import { Fragment } from "react";

import { ToolbarGroup, ToolbarSeparator } from "../toolbar";
import { useFormattingItems } from "./hooks";
import { ButtonDef } from "./types";
import { groupBy } from "./utils";

type BaseProps = React.HTMLAttributes<HTMLDivElement>;

interface FormattingControlsProps extends BaseProps {
  editor: Editor;
  include?: ButtonDef["id"][];
}

export const FormattingControls = ({
  editor,
  include,
}: FormattingControlsProps) => {
  const items = useFormattingItems(editor);
  const visible = include
    ? items.filter((button) => include.includes(button.id))
    : items;
  const groups = groupBy(visible, (button) => button.group);

  return (
    <>
      {Object.entries(groups).map(([groupId, groupItems], index) => (
        <Fragment key={groupId}>
          {index > 0 ? <ToolbarSeparator /> : null}
          <ToolbarGroup>
            {groupItems.map((item) => (
              <item.Component key={item.id} />
            ))}
          </ToolbarGroup>
        </Fragment>
      ))}
    </>
  );
};
FormattingControls.displayName = "FormattingControls";
